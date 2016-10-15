---
title: Resources
bg: lightgray
color: black
style: left
fa-icon: wrench
---

## JabRef-compatible text editors

JabRef can push entries, i.e. insert `\cite{key}` commands, to the following text editors:

- [Emacs](https://www.gnu.org/software/emacs/)
- [LaTeX Editor](http://www.latexeditor.org/)
- [LyX/Kile](http://www.lyx.org/)
- [TeXstudio](http://www.texstudio.org/)
- [Texmaker](http://www.xm1math.net/texmaker/)
- [Vim](http://www.vim.org/)
- [WinEdt](http://www.winedt.com/)

Additionally, JabRef can natively insert citations and format a bibliography in:

- [OpenOffice Writer](https://www.openoffice.org/)
- [LibreOffice Writer](https://www.libreoffice.org/)

See [OpenOffice/LibreOffice integration](https://help.jabref.org/en/OpenOfficeIntegration) for details.

## External tools

### JabFox

_by Tobias Diez_

JabFox is a Firefox add-on for users of the bibliographic reference manager JabRef. It automatically identifies and extracts bibliographic information on websites and sends them to JabRef in one click. A wide range of publisher sites, library catalogs and databases are supported.

[Download the Firefox addon](https://addons.mozilla.org/en-US/firefox/addon/jabfox/)

### WinEdt's JabRef launcher

_by Karl Koeller_

This WinEdt's package allows to launch the JabRef program from within WinEdt.

[Download the WinEdt's JabRef launcher](http://www.winedt.org/config/menus/JabRef.html)

### Export-Filter Editor

_by Felix Wilke_

Using this tool you can easily create a custom export filter for JabRef to build you own bibliography style.
It supports:

*   HTML Export Filter
*   RTF Export Filter
*   OpenOffice/ LibreOffice Style File
*   Saving the filter for later refinements

[Download the Export-Filter Editor](https://sourceforge.net/projects/efe/?source=dlp)

### PocketBib

_by Graham Dennis_

PocketBib is a BibTeX library reader for academics on the go. With PocketBib you can search, browse and read the papers in your BibTeX library, and sync them with BibDesk or JabRef on your computer.

Available for iPad, iPhone and iPod Touch.

[Download PocketBib](http://www.grahamdennis.me/pocketbib/)

### Bibtex4word

_by Mike Brookes_

Bibtex4Word is an add-in for Microsoft Word that allows the citation of references and the insertion of a bibliography into your document using your choice of formatting style. It is lightweight, transparent and does not mess up your documents.

[Download Bibtex4Word](http://www.ee.ic.ac.uk/hp/staff/dmb/perl/index.html)

### BibSync

_by Daniel Mendler_

BibSync is a tool to synchronize your paper database with a BibTeX file which might be most useful for Physicists and Mathematicians since it supports synchronization with DOI and arXiv.

[Download BibSync](https://github.com/minad/bibsync)

## Export filters

JabRef allows you to create custom export filters. This functionality and the installation procedure are described in the help file on [Custom export filters](http://help.jabref.org/en/CustomExports). Some users have created export filters that can be useful to many others. This page we provide links or direct downloads for some of these export filters.

*If you have created an export filter that you want to share with other users, [please notify us](http://discourse.jabref.org). We can provide a download from this page, or a link to your own page.*

### Mark Schenk's HTML export filters

Mark Schenk's HTML export filters provide HTML listings of your reference list. The exported HTML comes complete with scripts for quick filtering of the list.

_Note: some of Mark Schenk's filters are distributed with JabRef as standard export filters._

[Download Mark Schenk's HTML export filters](http://www.markschenk.com/tools/jabref/)

### Daniel Haertle's HTML export filter

Daniel Haertle's HTML export filter provides an HTML listing of your reference list. The output looks [like this](http://haertle.ch/publications/).

[Download Daniel Haertle's HTML export filter](http://haertle.ch/programs/jabref/)

### Truong X. Nghiem's HTML export filter
Truong X. Nghiem's HTML export filter provides an HTML listing of your reference list that does not contain a header nor a body. Its purpose is to be included in other HTML files or in text-to-html source files (e.g. Jemdoc). The output looks [like this](http://txn.name/publications.html).

[Download Truong X. Nghiem's HTML export filter](http://txn.name/publist.html)

### Marten Kooiker's RTF export filters

Marten Kooiker has put together a number of export filters outputting RTF references formatted for specific journals.

[Download Marten Kooiker's RTF export filters (v1.0a)](https://github.com/JabRef/htdocs/raw/master/exportfilters/Marten_Kooiker_export_filters_v1.0a.zip)

### Edward Elgar export filters

Christian Bartolomaeus has made an export filter matching the author guidelines of Edward Elgar. The export filter requires definition of two name formatters - please read the included README file.

[Download Edward Elgar export filters](https://github.com/JabRef/htdocs/raw/master/exportfilters/Edward_Elgar_export_filters_v1.0.zip)

### International Journal of Greenhouse Gas (IJoGGC) export filter

This filter is a modified version of Edwared Elgar's export filters. It formats the exported .rtf file into the format required by lots of Elsevier Journals. You just have to follow the next few steps:

[Download the International Journal of Greenhouse Gas (IJoGGC) export filter](https://github.com/JabRef/htdocs/raw/master/exportfilters/Exportfilter_IJoGGC_v1.0.zip)

### APA export filter

Russell Almond's APA export filter provides an export filter that is close to the American Pychological Association (APA) guidelines. It exports the references in Rich Text Format (rtf).

[Download Russell Almond's APA export filter](http://ralmond.net/APAish/)

### CSV export filter with Mendeley tags
Cynthia D'Angelo's CSV export filter with Mendeley tags provides an export filter that allows for exporting Mendely tags. It exports the refencence in csv format (i.e. spreadsheet- compatible).

[Dowload Cynthia D'Angelo's CSV export filter with Mendeley tags](https://cynthiadangelo.com/2012/10/22/exporting-mendeley-tags/)

## JabRef journal abbreviation lists

JabRef can help you refactor your reference list by automatically abbreviating or unabbreviating journal names, as explained in [the dedicated help file](http://help.jabref.org/en/JournalAbbreviations).

While JabRef comes with a build-in list of journals, additional lists are available:

* [General](https://raw.githubusercontent.com/JabRef/reference-abbreviations/master/journals/journal_abbreviations_general.txt)
* [American Mathematical Society](https://raw.githubusercontent.com/JabRef/reference-abbreviations/master/journals/journal_abbreviations_ams.txt) by Tzu-Hao Wei.
* [Astronomy](https://github.com/timstaley/jabref-astro-abbreviations/blob/master/MNRAS_abbreviations.txt) by Tim Staley. _Note: Please contribute using [github](https://github.com/timstaley/jabref-astro-abbreviations)._
* [Economics](https://raw.github.com/jrnold/jabref-econ-journal-abbrevs/master/aea-abbrevs.txt) by Jeff Arnold (as as posted on the AEA website).
* [Entrez](https://raw.githubusercontent.com/JabRef/reference-abbreviations/master/journals/journal_abbreviations_entrez.txt) by Emmanuel Charpentier. _Note: provides Medline (dotless) abbr. only._
* [Geology and Physics](https://raw.githubusercontent.com/JabRef/reference-abbreviations/master/journals/journal_abbreviations_geology_physics.txt) by an [anonymous user](https://sourceforge.net/p/jabref/patches/164/).
* [IEEE](https://raw.githubusercontent.com/JabRef/reference-abbreviations/master/journals/journal_abbreviations_ieee.txt) by Thomas Arildsen and “eyliu”.
* [Index Medicus](https://raw.githubusercontent.com/JabRef/reference-abbreviations/master/journals/journal_abbreviations_medicus.txt) by Guy Tsafnat. _Note: provides Medline (dotless) abbr. only._
* [ISI Web of Science](https://figshare.com/articles/Journal_abbreviations_from_Web_of_Science/3207787) by Alistair Auffret.
* [Life Science](https://raw.githubusercontent.com/JabRef/reference-abbreviations/master/journals/journal_abbreviations_lifescience.txt) by Zé Roberto Ribeiro.
* [Mechanical and biomechanical](https://raw.githubusercontent.com/JabRef/reference-abbreviations/master/journals/journal_abbreviations_mechanical.txt) by an [anonymous user](https://sourceforge.net/p/jabref/patches/151/).
* [Meteorology](https://raw.githubusercontent.com/JabRef/reference-abbreviations/master/journals/journal_abbreviations_meteorology.txt) by Thijs Heus.
* [Sociology](https://raw.githubusercontent.com/JabRef/reference-abbreviations/master/journals/journal_abbreviations_sociology.txt) by Ronggui Huang.


## Plugins

Until version 2.11 JabRef offered a plugin framework. Support for that has been removed. See [issue #152](https://github.com/JabRef/jabref/issues/152) for the current status of integration of the plugins into JabRef.

## Entry fetchers

Until version 2.11 JabRef offered a plugin framework. Support for that has been removed. See [issue #152](https://github.com/JabRef/jabref/issues/152) for the current status of integration of the plugins into JabRef.
