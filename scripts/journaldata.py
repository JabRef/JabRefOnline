"""
This script downloads data for multiple years from the Scimago Journal Rank website
(https://www.scimagojr.com/journalrank.php), parses the CSV files, and builds a consolidated
dataset over all the years, in JSON format.
The downloaded data includes various metrics for academic journals such as SJR,
h-index, doc counts, citation counts, etc.

Usage:
- Add
    ```
    generator pyclient {
        provider = "prisma-client-py"
        recursive_type_depth = 5
    }
    ```
    to the `schema.prisma` file, and run `pnpm generate` to generate the Prisma client.

- Update the `current_year` variable to the latest year of data available.
- Set the environment variable `DATABASE_URL` to the postgres database url (using a .env file is recommended).
- If you want to use the Azure database, add your IP address to the Azure exception list under `jabrefdb | Networking`.
- Run this script with `download` argument to downloads data from the specified start year up to the current year.
- Run this script with `db` (or `json`) argument to dump the consolidated dataset in the database (or `scimagojr_combined_data.json`, respectively).
"""


import asyncio
import csv
import json
import os
import sys
import urllib.request
from pathlib import Path

from prisma import Prisma
from prisma.types import JournalCitationInfoYearlyCreateWithoutRelationsInput
from tqdm import tqdm

# current_year should be the latest year of data available at https://www.scimagojr.com/journalrank.php
current_year = 2022
start_year = 1999
data_directory = Path('scripts/journal-data')


class JournalInfoYearly:
    def __init__(
        self,
        sjr: float,
        hIndex: int,
        totalDocs: int,
        totalDocs3Years: int,
        totalRefs: int,
        totalCites3Years: int,
        citableDocs3Years: int,
        citesPerDoc2Years: float,
        refPerDoc: float,
    ):
        self.sjr = sjr
        self.hIndex = hIndex
        self.totalDocs = totalDocs
        self.totalDocs3Years = totalDocs3Years
        self.totalRefs = totalRefs
        self.totalCites3Years = totalCites3Years
        self.citableDocs3Years = citableDocs3Years
        self.citesPerDoc2Years = citesPerDoc2Years
        self.refPerDoc = refPerDoc


class JournalInfo:
    def __init__(
        self,
        source_id: int,
        issn: str,
        title: str,
        type: str,
        country: str,
        region: str,
        publisher: str,
        coverage: str,
        categories: str,
        areas: str,
    ):
        self.source_id = source_id
        self.issn = issn
        self.title = title
        self.type = type
        self.country = country
        self.region = region
        self.publisher = publisher
        self.coverage = coverage
        self.categories = categories
        self.areas = areas
        self.yearly: dict[int, JournalInfoYearly] = {}


def journal_url(year: int):
    """Get url to download info for the given year"""
    return f'https://www.scimagojr.com/journalrank.php?year={year}&out=xls'


def parse_float(value: str):
    """Parse float from string, replacing comma with dot"""
    try:
        float_val = float(value.replace(',', '.'))
        return float_val
    except ValueError:
        return 0.0


def parse_int(value: str):
    """Parse int from string"""
    try:
        int_val = int(value)
        return int_val
    except ValueError:
        return 0


def get_data_filepath(year: int):
    """Get filename for the given year"""
    return data_directory / f'scimagojr-journal-{year}.csv'


def download_all_data():
    """Download data for all years"""

    # create data directory if it doesn't exist
    if not os.path.exists(data_directory):
        os.makedirs(data_directory)

    for year in range(start_year, current_year + 1):
        # download file for given year
        print(f'Downloading data for {year}')
        url = journal_url(year)
        filepath = get_data_filepath(year)
        urllib.request.urlretrieve(url, filepath)


def combine_data():
    """Iterate over files and return the consolidated dataset"""
    journals: dict[int, JournalInfo] = {}
    for year in tqdm(range(start_year, current_year + 1), desc='Processing data'):
        filepath = get_data_filepath(year)
        with open(filepath, mode='r', encoding='utf-8') as csv_file:
            csv_reader = csv.DictReader(csv_file, delimiter=';')
            for row in csv_reader:
                # Columns present in the csv:
                # 'Rank', 'Sourceid', 'Title', 'Type', 'Issn', 'SJR', 'SJR Best Quartile', 'H index',
                # 'Total Docs. (2020)', 'Total Docs. (3years)', 'Total Refs.', 'Total Cites (3years)',
                # 'Citable Docs. (3years)', 'Cites / Doc. (2years)', 'Ref. / Doc.', 'Country', 'Region',
                # 'Publisher', 'Coverage', 'Categories', 'Areas'

                sourceId = parse_int(row['Sourceid'])
                issn = row['Issn']
                if issn == '-':
                    issn = ''
                hIndex = parse_int(row['H index'])
                sjr = parse_float(row['SJR'])
                totalDocs = parse_int(row[f'Total Docs. ({year})'])
                totalDocs3Years = parse_int(row['Total Docs. (3years)'])
                totalRefs = parse_int(row['Total Refs.'])
                totalCites3Years = parse_int(row['Total Cites (3years)'])
                citableDocs3Years = parse_int(row['Citable Docs. (3years)'])
                citesPerDoc2Years = parse_float(row['Cites / Doc. (2years)'])
                refPerDoc = parse_float(row['Ref. / Doc.'])

                if sourceId not in journals:
                    # populate non-varying fields
                    journals[sourceId] = JournalInfo(
                        source_id=sourceId,
                        issn=issn,
                        title=row['Title'],
                        type=row['Type'],
                        country=row['Country'],
                        region=row['Region'],
                        publisher=row['Publisher'],
                        coverage=row['Coverage'],
                        categories=row['Categories'],
                        areas=row['Areas'],
                    )
                # populate yearly varying fields
                info = journals[sourceId]
                info.yearly[year] = JournalInfoYearly(
                    sjr=sjr,
                    hIndex=hIndex,
                    totalDocs=totalDocs,
                    totalDocs3Years=totalDocs3Years,
                    totalRefs=totalRefs,
                    totalCites3Years=totalCites3Years,
                    citableDocs3Years=citableDocs3Years,
                    citesPerDoc2Years=citesPerDoc2Years,
                    refPerDoc=refPerDoc,
                )

    print(f'Number of journals collected: {len(journals)}')
    return journals


def dump_to_json(journals: dict[int, JournalInfo]):
    # write to json file
    print('Writing to json')
    with open(
        data_directory / 'scimagojr_combined_data.json', 'w', encoding='utf-8'
    ) as fp:
        json.dump(journals, fp, default=vars)


async def dump_into_database(journals: dict[int, JournalInfo]):
    """Save data from json file to postgres database"""
    db = Prisma()
    await db.connect()

    # delete all existing yearly data (because its easier than updating)
    await db.journalcitationinfoyearly.delete_many()

    for journal in tqdm(journals.values(), desc='Saving to database'):
        citation_info: list[JournalCitationInfoYearlyCreateWithoutRelationsInput] = [
            {
                'year': year,
                'docsThisYear': info.totalDocs,
                'docsPrevious3Years': info.totalDocs3Years,
                'citableDocsPrevious3Years': info.citableDocs3Years,
                'citesOutgoing': info.totalCites3Years,
                'citesOutgoingPerDoc': info.citesPerDoc2Years,
                'citesIncomingByRecentlyPublished': info.totalRefs,
                'citesIncomingPerDocByRecentlyPublished': info.refPerDoc,
                'sjrIndex': info.sjr,
            }
            for year, info in journal.yearly.items()
        ]

        await db.journal.upsert(
            where={'scimagoId': journal.source_id},
            data={
                'create': {
                    'scimagoId': journal.source_id,
                    'isCustom': False,
                    'name': journal.title,
                    'issn': journal.issn.split(','),
                    'country': journal.country,
                    'publisher': journal.publisher,
                    'areas': journal.areas.split(','),
                    'categories': journal.categories.split(','),
                    'hIndex': next(
                        iter(journal.yearly.values())
                    ).hIndex,  # they are constant
                    'citationInfo': {'create': citation_info},
                },
                'update': {
                    'scimagoId': journal.source_id,
                    'isCustom': False,
                    'name': journal.title,
                    'issn': journal.issn.split(','),
                    'country': journal.country,
                    'publisher': journal.publisher,
                    'areas': journal.areas.split(','),
                    'categories': journal.categories.split(','),
                    'hIndex': next(
                        iter(journal.yearly.values())
                    ).hIndex,  # they are constant
                    'citationInfo': {'create': citation_info},
                },
            },
        )

    await db.disconnect()


def find_duplicate_issn():
    """Find journals with duplicate issn"""
    journals = combine_data()
    issn_count: dict[str, list[str]] = {}
    for journal in journals.values():
        for issn in journal.issn.split(','):
            if issn == '':
                continue
            journal_list = issn_count.get(issn, [])
            journal_list.append(journal.title)
            issn_count[issn] = journal_list

    for issn, titles in issn_count.items():
        if len(titles) > 1:
            print(issn, titles)


def main(argv: list[str]):
    """Main function"""
    if len(argv) == 1:
        print("No arguments provided")
    elif argv[1] == "download":
        download_all_data()
    elif argv[1] == "json":
        dump_to_json(combine_data())
    elif argv[1] == "db":
        data = combine_data()
        asyncio.run(dump_into_database(data))
    elif argv[1] == "duplicates":
        find_duplicate_issn()
    else:
        print("Invalid argument provided")


if __name__ == "__main__":
    main(sys.argv)
