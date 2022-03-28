import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from '@vue/composition-api';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  EmailAddress: any;
};

export type AddEntityInput = {
  organization?: InputMaybe<AddOrganizationInput>;
  person?: InputMaybe<AddPersonInput>;
};

export type AddJournalArticleInput = {
  abstract?: InputMaybe<Scalars['String']>;
  added?: InputMaybe<Scalars['DateTime']>;
  annotators?: InputMaybe<Array<AddEntityInput>>;
  authors?: InputMaybe<Array<AddEntityInput>>;
  citationKeys?: InputMaybe<Array<Scalars['String']>>;
  commentators?: InputMaybe<Array<AddEntityInput>>;
  doi?: InputMaybe<Scalars['String']>;
  electronicId?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<AddJournalIssueInput>;
  keywords?: InputMaybe<Array<Scalars['String']>>;
  languages?: InputMaybe<Array<Scalars['String']>>;
  lastModified?: InputMaybe<Scalars['DateTime']>;
  note?: InputMaybe<Scalars['String']>;
  pageEnd?: InputMaybe<Scalars['String']>;
  pageStart?: InputMaybe<Scalars['String']>;
  publicationState?: InputMaybe<Scalars['String']>;
  published?: InputMaybe<Scalars['Date']>;
  subtitle?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  titleAddon?: InputMaybe<Scalars['String']>;
  translated?: InputMaybe<AddTranslatedInput>;
};

export type AddJournalInput = {
  issn?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  subtitle?: InputMaybe<Scalars['String']>;
  titleAddon?: InputMaybe<Scalars['String']>;
};

export type AddJournalIssueInput = {
  journal: AddJournalInput;
  name?: InputMaybe<Scalars['String']>;
  number?: InputMaybe<Scalars['String']>;
  series?: InputMaybe<Scalars['String']>;
  subtitle?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  titleAddon?: InputMaybe<Scalars['String']>;
  volume?: InputMaybe<Scalars['String']>;
};

export type AddOrganizationInput = {
  name: Scalars['String'];
};

export type AddPersonInput = {
  name: Scalars['String'];
};

export type AddProceedingsArticleInput = {
  abstract?: InputMaybe<Scalars['String']>;
  added?: InputMaybe<Scalars['DateTime']>;
  authors?: InputMaybe<Array<AddEntityInput>>;
  chapter?: InputMaybe<Scalars['String']>;
  citationKeys?: InputMaybe<Array<Scalars['String']>>;
  doi?: InputMaybe<Scalars['String']>;
  electronicId?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Scalars['String']>;
  keywords?: InputMaybe<Array<Scalars['String']>>;
  languages?: InputMaybe<Array<Scalars['String']>>;
  lastModified?: InputMaybe<Scalars['DateTime']>;
  note?: InputMaybe<Scalars['String']>;
  pageEnd?: InputMaybe<Scalars['String']>;
  pageStart?: InputMaybe<Scalars['String']>;
  publicationState?: InputMaybe<Scalars['String']>;
  subtitle?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  titleAddon?: InputMaybe<Scalars['String']>;
};

export type AddThesisInput = {
  abstract?: InputMaybe<Scalars['String']>;
  added?: InputMaybe<Scalars['DateTime']>;
  authors?: InputMaybe<Array<AddEntityInput>>;
  citationKeys?: InputMaybe<Array<Scalars['String']>>;
  degreeType?: InputMaybe<Scalars['String']>;
  doi?: InputMaybe<Scalars['String']>;
  institution?: InputMaybe<Scalars['String']>;
  keywords?: InputMaybe<Array<Scalars['String']>>;
  languages?: InputMaybe<Array<Scalars['String']>>;
  lastModified?: InputMaybe<Scalars['DateTime']>;
  note?: InputMaybe<Scalars['String']>;
  pageTotal?: InputMaybe<Scalars['String']>;
  publicationState?: InputMaybe<Scalars['String']>;
  subtitle?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  titleAddon?: InputMaybe<Scalars['String']>;
};

export type AddTranslatedInput = {
  originalLanguages?: InputMaybe<Array<Scalars['String']>>;
  translators?: InputMaybe<Array<AddEntityInput>>;
};

/** Input for creating a new user document. */
export type AddUserDocumentInput = {
  journalArticle?: InputMaybe<AddJournalArticleInput>;
  proceedingsArticle?: InputMaybe<AddProceedingsArticleInput>;
  thesis?: InputMaybe<AddThesisInput>;
};

/** An article is a usually self-contained nonfiction prose. */
export type Article = {
  abstract?: Maybe<Scalars['String']>;
  added?: Maybe<Scalars['DateTime']>;
  authors: Array<Entity>;
  citationKeys: Array<Scalars['String']>;
  doi?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  keywords: Array<Scalars['String']>;
  languages: Array<Scalars['String']>;
  lastModified?: Maybe<Scalars['DateTime']>;
  note?: Maybe<Scalars['String']>;
  publicationState?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  titleAddon?: Maybe<Scalars['String']>;
};

/** A group that automatically generates subgroups based on keywords contained in documents. */
export type AutomaticKeywordGroup = Group & {
  __typename?: 'AutomaticKeywordGroup';
  children: Array<Group>;
  color?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  displayName: Scalars['String'];
  documents: Array<Document>;
  field: Scalars['String'];
  hierarchyType?: Maybe<GroupHierarchyType>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isExpanded?: Maybe<Scalars['Boolean']>;
  keywordDelimiter: Scalars['String'];
  keywordHierarchicalDelimiter: Scalars['String'];
  name: Scalars['String'];
  parent?: Maybe<Group>;
};

export type AutomaticKeywordGroupDetails = {
  field: Scalars['String'];
  keywordDelimiter: Scalars['String'];
  keywordHierarchicalDelimiter: Scalars['String'];
};

export type AutomaticPersonsGroup = Group & {
  __typename?: 'AutomaticPersonsGroup';
  children: Array<Group>;
  color?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  displayName: Scalars['String'];
  documents: Array<Document>;
  field: Scalars['String'];
  hierarchyType?: Maybe<GroupHierarchyType>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isExpanded?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  parent?: Maybe<Group>;
};

export type AutomaticPersonsGroupDetails = {
  field: Scalars['String'];
};

export type Booklike = {
  /**
   * The International Standard Book Number of the document.
   *
   * Biblatex: isbn
   */
  isbn?: Maybe<Scalars['String']>;
  /**
   * The total number of pages of the document.
   *
   * Biblatex: pagetotal
   */
  pageTotal?: Maybe<Scalars['String']>;
  /** The publisher of the document. */
  publishers?: Maybe<Array<Maybe<Publisher>>>;
};

export type ChangePasswordPayload = InputValidationProblem | TokenProblem | UserReturned;

/**
 * The different types of documents are mostly compatible with the types listed in the following sources. If known, the mapping is indicated in the comment of each type.
 *   - Biblatex http://mirrors.ibiblio.org/CTAN/macros/latex/contrib/biblatex/doc/biblatex.pdf
 *   - CSL https://github.com/citation-style-language/schema/blob/master/schemas/styles/csl-types.rnc (and outdated https://docs.citationstyles.org/en/stable/specification.html?highlight=entry-dictionary#appendix-iii-types)
 *   - ORCID https://info.orcid.org/documentation/integration-and-api-faq/#easy-faq-2682
 *   - CERIF https://cerif.eurocris.org/vocab/html/OutputTypes.html
 *
 * The fields for each type are mostly compatible with the fields in the following sources. If known, the mapping is indicated in the comment of each field.
 *   - Biblatex: https://github.com/plk/biblatex/blob/dev/tex/latex/biblatex/blx-dm.def
 *   - CSL: https://github.com/citation-style-language/schema/blob/master/schemas/input/csl-data.json
 *   - ORCID: https://github.com/ORCID/orcid-model
 *
 * The mapping was based on the following sources:
 *   - https://github.com/retorquere/zotero-better-bibtex/blob/master/translators/Better%20BibLaTeX.ts
 *   - https://github.com/fiduswriter/biblatex-csl-converter/blob/main/src/const.ts
 */
export type Document = {
  /**
   * A short description that summarizes the document.
   *
   * Biblatex: abstract
   */
  abstract?: Maybe<Scalars['String']>;
  /**
   * The date when the document was added to the library.
   *
   * Biblatex: no standard field
   */
  added?: Maybe<Scalars['DateTime']>;
  /**
   * The authors of this document.
   *
   * Biblatex: author
   */
  authors: Array<Entity>;
  /**
   * The keys by which the document can be cited.
   * The first key is the preferred one, the others are aliases to aid users who change their citation keys but have legacy documents which use older keys for the same entry.
   *
   * Biblatex: citekey (primary) and ids (secondary)
   */
  citationKeys: Array<Scalars['String']>;
  /**
   * The Digital Object Identifier of the document.
   *
   * Biblatex: doi
   */
  doi?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Keywords or tags used to describe the content. */
  keywords: Array<Scalars['String']>;
  /**
   * The languages of the article.
   * TODO: Introduce type for languages.
   *
   * Biblatex: language
   */
  languages: Array<Scalars['String']>;
  /**
   * The date when the metadata of the document was modified last.
   *
   * Biblatex: no standard field
   */
  lastModified?: Maybe<Scalars['DateTime']>;
  /**
   * Miscellaneous bibliographic data which does not fit into any other field.
   * Publication facts such as “Reprint of the edition London 1831” are typical candidates.
   *
   * Biblatex: note
   */
  note?: Maybe<Scalars['String']>;
  /**
   * The publication state of the article.
   * TODO: Introduce type for publication states.
   *
   * Biblatex: pubstate
   */
  publicationState?: Maybe<Scalars['String']>;
  /**
   * The subtitle of the document.
   *
   * Biblatex: subtitle
   */
  subtitle?: Maybe<Scalars['String']>;
  /**
   * The title of the document.
   *
   * Biblatex: title
   */
  title?: Maybe<Scalars['String']>;
  /**
   * An annex to the title of the document.
   *
   * Biblatex: titleaddon
   */
  titleAddon?: Maybe<Scalars['String']>;
};

/** Ways in which to filter a list of documents. */
export type DocumentFilters = {
  /** Only include documents that belong to the group with this ID. */
  groupId?: InputMaybe<Scalars['ID']>;
  /** Only include documents that match the given search string. */
  query?: InputMaybe<Scalars['String']>;
};

export type DocumentMultiVolume = {
  /**
   * The total number of volumes of a multi-volume document.
   *
   * Biblatex: volumes
   */
  totalVolumes?: Maybe<Scalars['String']>;
};

export type Entity = Organization | Person;

/** A conference, a symposium, or some other event. */
export type Event = {
  __typename?: 'Event';
  /**
   * The date when the event ended.
   *
   * Biblatex: eventendday, eventendhour, eventendminute, eventendmonth, eventendsecond, eventendtimezone, eventendyear, eventendyeardivision
   */
  endDate?: Maybe<Scalars['DateTime']>;
  /** The unique identifier of the event. */
  id: Scalars['ID'];
  /**
   * The locations where the event happened.
   *
   * Biblatex: venue
   */
  locations: Array<Scalars['String']>;
  /**
   * The organizations that sponsored the event.
   *
   * Biblatex: organization
   */
  sponsors: Array<Scalars['String']>;
  /**
   * The date when the event started.
   *
   * Biblatex: eventday,eventhour, eventminute, eventmonth, eventsecond, eventtimezone, eventyear, eventyeardivision
   */
  startDate?: Maybe<Scalars['DateTime']>;
  /**
   * The title of the event.
   *
   * Biblatex: eventtitle
   */
  title: Scalars['String'];
  /**
   * An annex to the title. Can be used for known event acronyms, for example.
   *
   * Biblatex: eventtitleaddon
   */
  titleAddon?: Maybe<Scalars['String']>;
};

export type ExplicitGroup = Group & {
  __typename?: 'ExplicitGroup';
  children: Array<Group>;
  color?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  displayName: Scalars['String'];
  documents: Array<Document>;
  hierarchyType?: Maybe<GroupHierarchyType>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isExpanded?: Maybe<Scalars['Boolean']>;
  keywordDelimiter: Scalars['String'];
  name: Scalars['String'];
  parent?: Maybe<Group>;
};

export type ExplicitGroupDetails = {
  documentIds: Array<Scalars['ID']>;
  keywordDelimiter: Scalars['String'];
};

export type ForgotPasswordPayload = {
  __typename?: 'ForgotPasswordPayload';
  result: Scalars['Boolean'];
};

export type Group = {
  children: Array<Group>;
  color?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  displayName: Scalars['String'];
  documents: Array<Document>;
  hierarchyType?: Maybe<GroupHierarchyType>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isExpanded?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  parent?: Maybe<Group>;
};

export enum GroupHierarchyType {
  /** The group's content is independent of its hierarchical position. */
  Independent = 'INDEPENDENT',
  /** The group's content is the intersection of its own content with its supergroups' content. */
  Intersection = 'INTERSECTION',
  /** The group's content is the union of its own content with its subgroups' content. */
  Union = 'UNION'
}

export type GroupInput = {
  automaticKeywordGroup?: InputMaybe<AutomaticKeywordGroupDetails>;
  automaticPersonsGroup?: InputMaybe<AutomaticPersonsGroupDetails>;
  children: Array<GroupInput>;
  color?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  explicitGroup?: InputMaybe<ExplicitGroupDetails>;
  hierarchyType?: InputMaybe<GroupHierarchyType>;
  icon?: InputMaybe<Scalars['String']>;
  isExpanded?: InputMaybe<Scalars['Boolean']>;
  lastNameGroup?: InputMaybe<LastNameGroupDetails>;
  name: Scalars['String'];
  parentId?: InputMaybe<Scalars['ID']>;
  regexKeywordGroup?: InputMaybe<RegexKeywordGroupDetails>;
  searchGroup?: InputMaybe<SearchGroupDetails>;
  texGroup?: InputMaybe<TexGroupDetails>;
  wordKeywordGroup?: InputMaybe<WordKeywordGroupDetails>;
};

export type GroupUpdate = {
  automaticKeywordGroup?: InputMaybe<AutomaticKeywordGroupDetails>;
  automaticPersonsGroup?: InputMaybe<AutomaticPersonsGroupDetails>;
  children: Array<GroupUpdate>;
  color?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  explicitGroup?: InputMaybe<ExplicitGroupDetails>;
  hierarchyType?: InputMaybe<GroupHierarchyType>;
  icon?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  lastNameGroup?: InputMaybe<LastNameGroupDetails>;
  name?: InputMaybe<Scalars['String']>;
  parentId?: InputMaybe<Scalars['ID']>;
  regexKeywordGroup?: InputMaybe<RegexKeywordGroupDetails>;
  searchGroup?: InputMaybe<SearchGroupDetails>;
  texGroup?: InputMaybe<TexGroupDetails>;
  wordKeywordGroup?: InputMaybe<WordKeywordGroupDetails>;
};

export type HasBooklikeParent = {
  /** A chapter or section or any other unit in the parent document. */
  chapter?: Maybe<Scalars['String']>;
  electronicId?: Maybe<Scalars['String']>;
  in?: Maybe<Document>;
  pageEnd?: Maybe<Scalars['String']>;
  pageStart?: Maybe<Scalars['String']>;
};

export type HasMultiVolumeParent = {
  /** The multi-volume document of which this document is part of. */
  in?: Maybe<DocumentMultiVolume>;
  /**
   * The number of a partial volume.
   * It may be used when a logical volume consists of two or more physical ones.
   * In this case the number of the logical volume goes in the volume field and the number of the part of that volume in the part field.
   *
   * Biblatex: part
   */
  part?: Maybe<Scalars['String']>;
  /**
   * The volume of a multi-volume proceedings.
   *
   * Biblatex: volume
   */
  volume?: Maybe<Scalars['String']>;
};

export type HasParent = {
  /**
   * The electronic identifier which should be used for journals deviating from the classic pagination scheme of printed journals by only enumerating articles and not pages.
   *
   * Biblatex: eid
   */
  electronicId?: Maybe<Scalars['String']>;
  /** The parent document in which the document has been published. */
  in?: Maybe<Node>;
  /**
   * The page on which the article ends; for example '138' or 'xvi'.
   *
   * Biblatex: page
   */
  pageEnd?: Maybe<Scalars['String']>;
  /**
   * The page on which the article starts; for example '135' or 'xiii'.
   * For articles in electronic journals with a non-classical pagination setup the electricId may be more suitable.
   *
   * Biblatex: page
   */
  pageStart?: Maybe<Scalars['String']>;
};

export type InputFieldValidationProblem = {
  __typename?: 'InputFieldValidationProblem';
  message: Scalars['String'];
  path: Scalars['String'];
};

export type InputValidationProblem = {
  __typename?: 'InputValidationProblem';
  problems: Array<Maybe<InputFieldValidationProblem>>;
};

/** A university or some other institution. */
export type Institution = {
  __typename?: 'Institution';
  /** The unique identifier of the institution. */
  id: Scalars['ID'];
  /**
   * The locations of the institution.
   *
   * Biblatex: location (or address)
   */
  locations: Array<Scalars['String']>;
  /**
   * The name of the university or institution.
   *
   * Biblatex: institution
   */
  name: Scalars['String'];
};

export type Journal = {
  __typename?: 'Journal';
  id: Scalars['ID'];
  /**
   * The International Standard Serial Number of a journal.
   *
   * Biblatex: issn
   */
  issn?: Maybe<Scalars['String']>;
  /**
   * The name of the journal.
   *
   * Biblatex: journaltitle
   */
  name: Scalars['String'];
  /**
   * The subtitle of a journal.
   *
   * Biblatex: journalsubtitle
   */
  subtitle?: Maybe<Scalars['String']>;
  /**
   * An annex to the name of the journal.
   * This may be useful in case a journal has been renamed or if the journal name isn't unique.
   *
   * Biblatex: journaltitleaddon
   */
  titleAddon?: Maybe<Scalars['String']>;
};

/**
 * An article published in a journal disseminates the results of original research and scholarship.
 * It is usually peer-reviewed and published under a separate title in a journal issue or periodical containing other works of the same form.
 *
 * Biblatex: article
 * CSL: article-journal or article
 * ORCID: journal-article
 * CERIF: JournalArticle
 *
 * TODO:
 * - Decide if "editor" should be added (it is supported by biblatex). What's the purpose, and does it refer to an editor of the article or an editor of the journal?
 * - Decide if "version" should be added (it is supported by biblatex, but the definition says "The revision number of a piece of software, a manual, etc." which is not very specific).
 */
export type JournalArticle = Article & Document & HasParent & Node & Translatable & {
  __typename?: 'JournalArticle';
  abstract?: Maybe<Scalars['String']>;
  added?: Maybe<Scalars['DateTime']>;
  /**
   * The authors of annotations to the article.
   *
   * Biblatex: annotator
   */
  annotators: Array<Entity>;
  authors: Array<Entity>;
  citationKeys: Array<Scalars['String']>;
  /**
   * The authors of a commentary to the work.
   * Note that this field is intended for commented editions which have a commentator in addition to the author. If the work is a stand-alone commentary, the commentator should be given in the author.
   *
   * Biblatex: commentator
   */
  commentators: Array<Entity>;
  doi?: Maybe<Scalars['String']>;
  electronicId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** The issue of the journal in which the article has been published. */
  in?: Maybe<JournalIssue>;
  keywords: Array<Scalars['String']>;
  languages: Array<Scalars['String']>;
  lastModified?: Maybe<Scalars['DateTime']>;
  note?: Maybe<Scalars['String']>;
  pageEnd?: Maybe<Scalars['String']>;
  pageStart?: Maybe<Scalars['String']>;
  publicationState?: Maybe<Scalars['String']>;
  /**
   * The publication date.
   *
   * Biblatex: date (or month + year)
   */
  published?: Maybe<Scalars['Date']>;
  subtitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  titleAddon?: Maybe<Scalars['String']>;
  translated?: Maybe<Translated>;
};

/** An issue of a journal. */
export type JournalIssue = Node & {
  __typename?: 'JournalIssue';
  id: Scalars['ID'];
  /** The journal in which the article has been published. */
  journal?: Maybe<Journal>;
  /**
   * This field is intended for journals whose individual issues are identified by a designation such as Lent, Michaelmas, Summer or Spring rather than the month or a number.
   * Usually the issue name is displayed in front of the year and not the volume.
   *
   * Biblatex: issue
   */
  name?: Maybe<Scalars['String']>;
  /**
   * The number of the issue.
   *
   * Normally this field will be an integer or an integer range, but it may also be a short designator that is not entirely numeric such as “S1”, “Suppl. 2”, “3es”.
   * Usually, the number is displayed close to the volume, e.g. 10.2 (volume: 10, number: 2).
   *
   * Biblatex: number
   */
  number?: Maybe<Scalars['String']>;
  /**
   * The name or number of a journal series.
   * Usually, after the journal has restarted publication with a new numbering.
   *
   * Biblatex: series
   */
  series?: Maybe<Scalars['String']>;
  /**
   * The subtitle of a specific issue of a journal.
   *
   * Biblatex: issuesubtitle
   */
  subtitle?: Maybe<Scalars['String']>;
  /**
   * The title of a specific issue of a journal.
   *
   * Biblatex: issuetitle
   */
  title?: Maybe<Scalars['String']>;
  /**
   * An annex to the title of the specific issue of a journal.
   * This may be useful when a special issue of a journal has a title that doesn't make it clear that it is a special issue and one wants to emphasize that.
   *
   * Biblatex: issuetitleaddon
   */
  titleAddon?: Maybe<Scalars['String']>;
  /**
   * The volume of the journal this issue is part of.
   *
   * Biblatex: volume
   */
  volume?: Maybe<Scalars['String']>;
};

export type LastNameGroup = Group & {
  __typename?: 'LastNameGroup';
  authorLastName: Scalars['String'];
  children: Array<Group>;
  color?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  displayName: Scalars['String'];
  documents: Array<Document>;
  field: Scalars['String'];
  hierarchyType?: Maybe<GroupHierarchyType>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isExpanded?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  parent?: Maybe<Group>;
};

export type LastNameGroupDetails = {
  authorLastName: Scalars['String'];
  field: Scalars['String'];
};

export type LoginPayload = InputValidationProblem | UserReturned;

export type LogoutPayload = {
  __typename?: 'LogoutPayload';
  result: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  addUserDocument?: Maybe<Document>;
  changePassword?: Maybe<ChangePasswordPayload>;
  createGroup?: Maybe<Group>;
  forgotPassword?: Maybe<ForgotPasswordPayload>;
  login?: Maybe<LoginPayload>;
  logout?: Maybe<LogoutPayload>;
  signup?: Maybe<SignupPayload>;
  updateGroup?: Maybe<Group>;
  updateUserDocument?: Maybe<Document>;
};


export type MutationAddUserDocumentArgs = {
  input: AddUserDocumentInput;
};


export type MutationChangePasswordArgs = {
  id: Scalars['ID'];
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateGroupArgs = {
  group: GroupInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['EmailAddress'];
};


export type MutationLoginArgs = {
  email: Scalars['EmailAddress'];
  password: Scalars['String'];
};


export type MutationSignupArgs = {
  email: Scalars['EmailAddress'];
  password: Scalars['String'];
};


export type MutationUpdateGroupArgs = {
  group: GroupUpdate;
};


export type MutationUpdateUserDocumentArgs = {
  input: UpdateUserDocumentInput;
};

/** An object with an identifier that is unique across all objects in the graph. */
export type Node = {
  /** The ID of the node. */
  id: Scalars['ID'];
};

export type Organization = {
  __typename?: 'Organization';
  id: Scalars['ID'];
  name: Scalars['String'];
};

/**
 * A fallback type for works which do not fit into any other category.
 *
 * Biblatex: value of "type" field, or "misc" if not present
 * CSL: article
 * ORCID: other
 * CERIF: Other
 *
 * TODO:
 * - Add editor with roles.
 */
export type Other = Document & Node & {
  __typename?: 'Other';
  abstract?: Maybe<Scalars['String']>;
  added?: Maybe<Scalars['DateTime']>;
  authors: Array<Entity>;
  citationKeys: Array<Scalars['String']>;
  doi?: Maybe<Scalars['String']>;
  /**
   * A publication notice.
   *
   * Biblatex: howpublished
   */
  howPublished?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  keywords: Array<Scalars['String']>;
  languages: Array<Scalars['String']>;
  lastModified?: Maybe<Scalars['DateTime']>;
  note?: Maybe<Scalars['String']>;
  publicationState?: Maybe<Scalars['String']>;
  /** The publishers of this document. */
  publishers?: Maybe<Array<Maybe<Publisher>>>;
  subtitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  titleAddon?: Maybe<Scalars['String']>;
  /**
   * The type of this document.
   *
   * Biblatex: entry type
   */
  type?: Maybe<Scalars['String']>;
};

/** Information about the next page and end cursor for pagination. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items?. */
  hasNextPage: Scalars['Boolean'];
};

export type PartOfSeries = {
  /**
   * The number of the document in a series.
   * Document in a publication series are usually numbered and the number or volume of a document in a series is given in this field.
   *
   * Biblatex: number
   */
  number?: Maybe<Scalars['String']>;
  /**
   * The name of a publication series, such as “Studies in ...”.
   *
   * Biblatex: series
   */
  series?: Maybe<Scalars['String']>;
};

export type Person = {
  __typename?: 'Person';
  id: Scalars['ID'];
  name: Scalars['String'];
};

/**
 * A collection of articles, published abstracts or posters gathered from a conference.
 * This may be a single volume in a multi-volume proceedings or a publication consisting only of a single volume.
 *
 * Biblatex: proceedings
 * CSL: book
 * ORCID: book
 * CERIF: Conference Proceedings
 *
 * TODO:
 *   - Decide what to do with biblatex fields "chapter, eid, pages" that are used to limit the citation to a specific part of the proceedings (right?). They are not really metadata of the proceedings, but only of the citation.
 *   - Add editors with their roles.
 */
export type Proceedings = Booklike & Document & HasMultiVolumeParent & Node & PartOfSeries & {
  __typename?: 'Proceedings';
  abstract?: Maybe<Scalars['String']>;
  added?: Maybe<Scalars['DateTime']>;
  authors: Array<Entity>;
  citationKeys: Array<Scalars['String']>;
  /** The conference of the proceedings. */
  conference?: Maybe<Event>;
  doi?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** The multi-volume proceedings of which this proceedings is part of. */
  in?: Maybe<ProceedingsMultiVolume>;
  isbn?: Maybe<Scalars['String']>;
  keywords: Array<Scalars['String']>;
  languages: Array<Scalars['String']>;
  lastModified?: Maybe<Scalars['DateTime']>;
  note?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
  pageTotal?: Maybe<Scalars['String']>;
  part?: Maybe<Scalars['String']>;
  publicationState?: Maybe<Scalars['String']>;
  publishers: Array<Publisher>;
  series?: Maybe<Scalars['String']>;
  /**
   * The subtitle of the document.
   *
   * Biblatex: subtitle (or booksubtitle in a ProceedingsArticle)
   */
  subtitle?: Maybe<Scalars['String']>;
  /**
   * The title of the document.
   *
   * Biblatex: title (or booktitle in a ProceedingsArticle)
   */
  title?: Maybe<Scalars['String']>;
  /**
   * An annex to the title of the document.
   *
   * Biblatex: titleaddon (or booktitleaddon in a ProceedingsArticle)
   */
  titleAddon?: Maybe<Scalars['String']>;
  volume?: Maybe<Scalars['String']>;
};

/**
 * An article that has been presented at a conference and published in a proceedings (not in scholarly journals).
 *
 * Biblatex: inproceedings (or conference)
 * CSL: paper-conference
 * ORCID: conference-paper
 * CERIF: Conference Proceedings Article
 */
export type ProceedingsArticle = Article & Document & HasBooklikeParent & HasParent & Node & {
  __typename?: 'ProceedingsArticle';
  abstract?: Maybe<Scalars['String']>;
  added?: Maybe<Scalars['DateTime']>;
  authors: Array<Entity>;
  chapter?: Maybe<Scalars['String']>;
  citationKeys: Array<Scalars['String']>;
  doi?: Maybe<Scalars['String']>;
  electronicId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** The proceedings in which the article has been published. */
  in?: Maybe<Proceedings>;
  keywords: Array<Scalars['String']>;
  languages: Array<Scalars['String']>;
  lastModified?: Maybe<Scalars['DateTime']>;
  note?: Maybe<Scalars['String']>;
  pageEnd?: Maybe<Scalars['String']>;
  pageStart?: Maybe<Scalars['String']>;
  publicationState?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  titleAddon?: Maybe<Scalars['String']>;
};

/**
 * A multi-volume conference proceedings.
 *
 * Biblatex: mvproceedings
 * CSL: book
 * ORCID: book
 * CERIF: Conference Proceedings
 *
 * TODO:
 *   - Decide what to do with biblatex fields "chapter, eid, pages" that are used to limit the citation to a specific part of the proceedings (right?). They are not really metadata of the proceedings, but only of the citation.
 *   - Add editors with their roles.
 */
export type ProceedingsMultiVolume = Booklike & DocumentMultiVolume & PartOfSeries & {
  __typename?: 'ProceedingsMultiVolume';
  abstract?: Maybe<Scalars['String']>;
  authors: Array<Entity>;
  /** The conference of the proceedings. */
  conference?: Maybe<Event>;
  doi?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isbn?: Maybe<Scalars['String']>;
  keywords: Array<Scalars['String']>;
  languages: Array<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
  pageTotal?: Maybe<Scalars['String']>;
  publicationState?: Maybe<Scalars['String']>;
  publishers: Array<Publisher>;
  series?: Maybe<Scalars['String']>;
  /**
   * The subtitle of the document.
   *
   * Biblatex: subtitle (or mainsubtitle in a ProceedingsArticle or Proceedings)
   */
  subtitle?: Maybe<Scalars['String']>;
  /**
   * The title of the document.
   *
   * Biblatex: title (or maintitle in a ProceedingsArticle or Proceedings)
   */
  title?: Maybe<Scalars['String']>;
  /**
   * An annex to the title of the document.
   *
   * Biblatex: titleaddon (or maintitleaddon in a ProceedingsArticle or Proceedings)
   */
  titleAddon?: Maybe<Scalars['String']>;
  totalVolumes?: Maybe<Scalars['String']>;
};

export type Publisher = {
  __typename?: 'Publisher';
  /** The unique identifier of the publisher. */
  id: Scalars['ID'];
  /**
   * The locations of the publisher.
   *
   * Biblatex: location
   */
  locations: Array<Scalars['String']>;
  /**
   * The name of the publisher.
   *
   * Biblatex: publisher, or organization for Other
   */
  name?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  /** Get the group by id. */
  group?: Maybe<Group>;
  /** Get the current user. */
  me?: Maybe<User>;
  /** Get user by id. */
  user?: Maybe<User>;
  userDocument?: Maybe<Document>;
};


export type QueryGroupArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUserDocumentArgs = {
  id: Scalars['ID'];
};

export type RegexKeywordGroup = Group & {
  __typename?: 'RegexKeywordGroup';
  caseSensitive: Scalars['Boolean'];
  children: Array<Group>;
  color?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  displayName: Scalars['String'];
  documents: Array<Document>;
  field: Scalars['String'];
  hierarchyType?: Maybe<GroupHierarchyType>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isExpanded?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  parent?: Maybe<Group>;
  searchExpression: Scalars['String'];
};

export type RegexKeywordGroupDetails = {
  caseSensitive: Scalars['Boolean'];
  field: Scalars['String'];
  searchExpression: Scalars['String'];
};

export type SearchGroup = Group & {
  __typename?: 'SearchGroup';
  caseSensitive: Scalars['Boolean'];
  children: Array<Group>;
  color?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  displayName: Scalars['String'];
  documents: Array<Document>;
  hierarchyType?: Maybe<GroupHierarchyType>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isExpanded?: Maybe<Scalars['Boolean']>;
  isRegEx: Scalars['Boolean'];
  name: Scalars['String'];
  parent?: Maybe<Group>;
  searchExpression: Scalars['String'];
};

export type SearchGroupDetails = {
  caseSensitive: Scalars['Boolean'];
  isRegEx: Scalars['Boolean'];
  searchExpression: Scalars['String'];
};

export type SignupPayload = InputValidationProblem | UserReturned;

export type TexGroup = Group & {
  __typename?: 'TexGroup';
  children: Array<Group>;
  color?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  displayName: Scalars['String'];
  documents: Array<Document>;
  hierarchyType?: Maybe<GroupHierarchyType>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isExpanded?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  parent?: Maybe<Group>;
  paths: Array<TexGroupDevicePathPair>;
};

export type TexGroupDetails = {
  paths: Array<TexGroupDevicePathPairInput>;
};

export type TexGroupDevicePathPair = {
  __typename?: 'TexGroupDevicePathPair';
  deviceName: Scalars['String'];
  filePath: Scalars['String'];
};

export type TexGroupDevicePathPairInput = {
  deviceName: Scalars['String'];
  filePath: Scalars['String'];
};

/**
 * A dissertation/thesis is written for an educational institution that leads to the acquirement of a degree.
 *
 * Biblatex: thesis (or phdthesis or mastersthesis)
 * CSL: thesis
 * ORCID: dissertation or dissertation-thesis
 * CERIF: PhD Thesis or Doctoral Thesis
 *
 * TODO: Decide what to do with biblatex fields "chapter, eid, pages" that are used to limit the reference to a specific part of the thesis. They are not really metadata of the thesis, but only of the citation.
 */
export type Thesis = Document & Node & {
  __typename?: 'Thesis';
  abstract?: Maybe<Scalars['String']>;
  added?: Maybe<Scalars['DateTime']>;
  authors: Array<Entity>;
  citationKeys: Array<Scalars['String']>;
  /**
   * The type of the degree obtained by the author.
   *
   * Biblatex: type
   */
  degreeType?: Maybe<Scalars['String']>;
  doi?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** The university or some other institution where the thesis has been written at. */
  institution?: Maybe<Institution>;
  keywords: Array<Scalars['String']>;
  languages: Array<Scalars['String']>;
  lastModified?: Maybe<Scalars['DateTime']>;
  note?: Maybe<Scalars['String']>;
  /**
   * The total number of pages of the thesis.
   *
   * Biblatex: pagetotal
   */
  pageTotal?: Maybe<Scalars['String']>;
  publicationState?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  titleAddon?: Maybe<Scalars['String']>;
};

export type TokenProblem = {
  __typename?: 'TokenProblem';
  message: Scalars['String'];
};

/** A document that can be translated. */
export type Translatable = {
  /** Contains information if the document has been translated. */
  translated?: Maybe<Translated>;
};

/** Information about a translation of a document. */
export type Translated = {
  __typename?: 'Translated';
  /**
   * The languages of the original document.
   * TODO: Introduce type for languages.
   *
   * Biblatex: origlanguage
   */
  originalLanguages: Array<Scalars['String']>;
  /**
   * The translators of the document.
   *
   * Biblatex: translator
   */
  translators: Array<Entity>;
};

export type UpdateUserDocumentInput = {
  id: Scalars['ID'];
  journalArticle?: InputMaybe<AddJournalArticleInput>;
  proceedingsArticle?: InputMaybe<AddProceedingsArticleInput>;
  thesis?: InputMaybe<AddThesisInput>;
};

export type User = {
  __typename?: 'User';
  /** A list of documents that belong to the user. */
  documents: UserDocumentsConnection;
  email: Scalars['EmailAddress'];
  groups: Array<Group>;
  id: Scalars['ID'];
};


export type UserDocumentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  filterBy?: InputMaybe<DocumentFilters>;
  first?: InputMaybe<Scalars['Int']>;
};

/** A connection model between user and documents. */
export type UserDocumentsConnection = {
  __typename?: 'UserDocumentsConnection';
  /** A list of edges. */
  edges: Array<UserDocumentsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge connecting the user to a document node */
export type UserDocumentsEdge = {
  __typename?: 'UserDocumentsEdge';
  /** A node containing a document */
  node?: Maybe<Document>;
};

export type UserReturned = {
  __typename?: 'UserReturned';
  user: User;
};

export type WordKeywordGroup = Group & {
  __typename?: 'WordKeywordGroup';
  caseSensitive: Scalars['Boolean'];
  children: Array<Group>;
  color?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  displayName: Scalars['String'];
  documents: Array<Document>;
  field: Scalars['String'];
  hierarchyType?: Maybe<GroupHierarchyType>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isExpanded?: Maybe<Scalars['Boolean']>;
  keywordDelimiter: Scalars['String'];
  name: Scalars['String'];
  onlySplitWordsAtDelimiter: Scalars['Boolean'];
  parent?: Maybe<Group>;
  searchExpression: Scalars['String'];
};

export type WordKeywordGroupDetails = {
  caseSensitive: Scalars['Boolean'];
  field: Scalars['String'];
  keywordDelimiter: Scalars['String'];
  onlySplitWordsAtDelimiter: Scalars['Boolean'];
  searchExpression: Scalars['String'];
};

type DocumentDetails_JournalArticle_Fragment = { __typename?: 'JournalArticle', published?: any | null, pageStart?: string | null, pageEnd?: string | null, id: string, title?: string | null, keywords: Array<string>, abstract?: string | null, doi?: string | null, in?: { __typename?: 'JournalIssue', volume?: string | null, number?: string | null, journal?: { __typename?: 'Journal', id: string, name: string } | null } | null, authors: Array<{ __typename?: 'Organization', id: string, name: string } | { __typename?: 'Person', id: string, name: string }> };

type DocumentDetails_Other_Fragment = { __typename?: 'Other', id: string, title?: string | null, keywords: Array<string>, abstract?: string | null, doi?: string | null, authors: Array<{ __typename?: 'Organization', id: string, name: string } | { __typename?: 'Person', id: string, name: string }> };

type DocumentDetails_Proceedings_Fragment = { __typename?: 'Proceedings', id: string, title?: string | null, keywords: Array<string>, abstract?: string | null, doi?: string | null, authors: Array<{ __typename?: 'Organization', id: string, name: string } | { __typename?: 'Person', id: string, name: string }> };

type DocumentDetails_ProceedingsArticle_Fragment = { __typename?: 'ProceedingsArticle', id: string, title?: string | null, keywords: Array<string>, abstract?: string | null, doi?: string | null, in?: { __typename?: 'Proceedings', title?: string | null } | null, authors: Array<{ __typename?: 'Organization', id: string, name: string } | { __typename?: 'Person', id: string, name: string }> };

type DocumentDetails_Thesis_Fragment = { __typename?: 'Thesis', id: string, title?: string | null, keywords: Array<string>, abstract?: string | null, doi?: string | null, institution?: { __typename?: 'Institution', id: string, name: string } | null, authors: Array<{ __typename?: 'Organization', id: string, name: string } | { __typename?: 'Person', id: string, name: string }> };

export type DocumentDetailsFragment = DocumentDetails_JournalArticle_Fragment | DocumentDetails_Other_Fragment | DocumentDetails_Proceedings_Fragment | DocumentDetails_ProceedingsArticle_Fragment | DocumentDetails_Thesis_Fragment;

type DocumentForView_JournalArticle_Fragment = { __typename?: 'JournalArticle', id: string, title?: string | null, keywords: Array<string>, abstract?: string | null, in?: { __typename?: 'JournalIssue', journal?: { __typename?: 'Journal', id: string, name: string } | null } | null, authors: Array<{ __typename?: 'Organization', id: string, name: string } | { __typename?: 'Person', id: string, name: string }> };

type DocumentForView_Other_Fragment = { __typename?: 'Other', id: string, title?: string | null, keywords: Array<string>, abstract?: string | null, authors: Array<{ __typename?: 'Organization', id: string, name: string } | { __typename?: 'Person', id: string, name: string }> };

type DocumentForView_Proceedings_Fragment = { __typename?: 'Proceedings', id: string, title?: string | null, keywords: Array<string>, abstract?: string | null, authors: Array<{ __typename?: 'Organization', id: string, name: string } | { __typename?: 'Person', id: string, name: string }> };

type DocumentForView_ProceedingsArticle_Fragment = { __typename?: 'ProceedingsArticle', id: string, title?: string | null, keywords: Array<string>, abstract?: string | null, in?: { __typename?: 'Proceedings', title?: string | null } | null, authors: Array<{ __typename?: 'Organization', id: string, name: string } | { __typename?: 'Person', id: string, name: string }> };

type DocumentForView_Thesis_Fragment = { __typename?: 'Thesis', id: string, title?: string | null, keywords: Array<string>, abstract?: string | null, institution?: { __typename?: 'Institution', id: string, name: string } | null, authors: Array<{ __typename?: 'Organization', id: string, name: string } | { __typename?: 'Person', id: string, name: string }> };

export type DocumentForViewFragment = DocumentForView_JournalArticle_Fragment | DocumentForView_Other_Fragment | DocumentForView_Proceedings_Fragment | DocumentForView_ProceedingsArticle_Fragment | DocumentForView_Thesis_Fragment;

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  id: Scalars['ID'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword?: { __typename?: 'InputValidationProblem', problems: Array<{ __typename?: 'InputFieldValidationProblem', path: string, message: string } | null> } | { __typename?: 'TokenProblem', message: string } | { __typename?: 'UserReturned', user: { __typename?: 'User', id: string } } | null };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['EmailAddress'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword?: { __typename?: 'ForgotPasswordPayload', result: boolean } | null };

export type LoginMutationVariables = Exact<{
  email: Scalars['EmailAddress'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'InputValidationProblem', problems: Array<{ __typename?: 'InputFieldValidationProblem', path: string, message: string } | null> } | { __typename?: 'UserReturned', user: { __typename?: 'User', id: string } } | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: { __typename?: 'LogoutPayload', result: boolean } | null };

export type SignupMutationVariables = Exact<{
  email: Scalars['EmailAddress'];
  password: Scalars['String'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup?: { __typename?: 'InputValidationProblem', problems: Array<{ __typename?: 'InputFieldValidationProblem', path: string, message: string } | null> } | { __typename?: 'UserReturned', user: { __typename?: 'User', id: string } } | null };

export type DocumentDetailsQueryVariables = Exact<{
  documentId: Scalars['ID'];
}>;


export type DocumentDetailsQuery = { __typename?: 'Query', userDocument?: { __typename?: 'JournalArticle', published?: any | null, pageStart?: string | null, pageEnd?: string | null, id: string, title?: string | null, keywords: Array<string>, abstract?: string | null, doi?: string | null, in?: { __typename?: 'JournalIssue', volume?: string | null, number?: string | null, journal?: { __typename?: 'Journal', id: string, name: string } | null } | null, authors: Array<{ __typename?: 'Organization', id: string, name: string } | { __typename?: 'Person', id: string, name: string }> } | { __typename?: 'Other', id: string, title?: string | null, keywords: Array<string>, abstract?: string | null, doi?: string | null, authors: Array<{ __typename?: 'Organization', id: string, name: string } | { __typename?: 'Person', id: string, name: string }> } | { __typename?: 'Proceedings', id: string, title?: string | null, keywords: Array<string>, abstract?: string | null, doi?: string | null, authors: Array<{ __typename?: 'Organization', id: string, name: string } | { __typename?: 'Person', id: string, name: string }> } | { __typename?: 'ProceedingsArticle', id: string, title?: string | null, keywords: Array<string>, abstract?: string | null, doi?: string | null, in?: { __typename?: 'Proceedings', title?: string | null } | null, authors: Array<{ __typename?: 'Organization', id: string, name: string } | { __typename?: 'Person', id: string, name: string }> } | { __typename?: 'Thesis', id: string, title?: string | null, keywords: Array<string>, abstract?: string | null, doi?: string | null, institution?: { __typename?: 'Institution', id: string, name: string } | null, authors: Array<{ __typename?: 'Organization', id: string, name: string } | { __typename?: 'Person', id: string, name: string }> } | null };

export type DocumentsQueryVariables = Exact<{
  groupId?: InputMaybe<Scalars['ID']>;
  query?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
}>;


export type DocumentsQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, documents: { __typename?: 'UserDocumentsConnection', edges: Array<{ __typename?: 'UserDocumentsEdge', node?: { __typename?: 'JournalArticle', id: string, title?: string | null, keywords: Array<string>, abstract?: string | null, in?: { __typename?: 'JournalIssue', journal?: { __typename?: 'Journal', id: string, name: string } | null } | null, authors: Array<{ __typename?: 'Organization', id: string, name: string } | { __typename?: 'Person', id: string, name: string }> } | { __typename?: 'Other', id: string, title?: string | null, keywords: Array<string>, abstract?: string | null, authors: Array<{ __typename?: 'Organization', id: string, name: string } | { __typename?: 'Person', id: string, name: string }> } | { __typename?: 'Proceedings', id: string, title?: string | null, keywords: Array<string>, abstract?: string | null, authors: Array<{ __typename?: 'Organization', id: string, name: string } | { __typename?: 'Person', id: string, name: string }> } | { __typename?: 'ProceedingsArticle', id: string, title?: string | null, keywords: Array<string>, abstract?: string | null, in?: { __typename?: 'Proceedings', title?: string | null } | null, authors: Array<{ __typename?: 'Organization', id: string, name: string } | { __typename?: 'Person', id: string, name: string }> } | { __typename?: 'Thesis', id: string, title?: string | null, keywords: Array<string>, abstract?: string | null, institution?: { __typename?: 'Institution', id: string, name: string } | null, authors: Array<{ __typename?: 'Organization', id: string, name: string } | { __typename?: 'Person', id: string, name: string }> } | null }>, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean } } } | null };

export type GroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GroupsQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, groups: Array<{ __typename?: 'AutomaticKeywordGroup', id: string, name: string, icon?: string | null, children: Array<{ __typename?: 'AutomaticKeywordGroup', id: string, name: string, icon?: string | null } | { __typename?: 'AutomaticPersonsGroup', id: string, name: string, icon?: string | null } | { __typename?: 'ExplicitGroup', id: string, name: string, icon?: string | null } | { __typename?: 'LastNameGroup', id: string, name: string, icon?: string | null } | { __typename?: 'RegexKeywordGroup', id: string, name: string, icon?: string | null } | { __typename?: 'SearchGroup', id: string, name: string, icon?: string | null } | { __typename?: 'TexGroup', id: string, name: string, icon?: string | null } | { __typename?: 'WordKeywordGroup', id: string, name: string, icon?: string | null }> } | { __typename?: 'AutomaticPersonsGroup', id: string, name: string, icon?: string | null, children: Array<{ __typename?: 'AutomaticKeywordGroup', id: string, name: string, icon?: string | null } | { __typename?: 'AutomaticPersonsGroup', id: string, name: string, icon?: string | null } | { __typename?: 'ExplicitGroup', id: string, name: string, icon?: string | null } | { __typename?: 'LastNameGroup', id: string, name: string, icon?: string | null } | { __typename?: 'RegexKeywordGroup', id: string, name: string, icon?: string | null } | { __typename?: 'SearchGroup', id: string, name: string, icon?: string | null } | { __typename?: 'TexGroup', id: string, name: string, icon?: string | null } | { __typename?: 'WordKeywordGroup', id: string, name: string, icon?: string | null }> } | { __typename?: 'ExplicitGroup', id: string, name: string, icon?: string | null, children: Array<{ __typename?: 'AutomaticKeywordGroup', id: string, name: string, icon?: string | null } | { __typename?: 'AutomaticPersonsGroup', id: string, name: string, icon?: string | null } | { __typename?: 'ExplicitGroup', id: string, name: string, icon?: string | null } | { __typename?: 'LastNameGroup', id: string, name: string, icon?: string | null } | { __typename?: 'RegexKeywordGroup', id: string, name: string, icon?: string | null } | { __typename?: 'SearchGroup', id: string, name: string, icon?: string | null } | { __typename?: 'TexGroup', id: string, name: string, icon?: string | null } | { __typename?: 'WordKeywordGroup', id: string, name: string, icon?: string | null }> } | { __typename?: 'LastNameGroup', id: string, name: string, icon?: string | null, children: Array<{ __typename?: 'AutomaticKeywordGroup', id: string, name: string, icon?: string | null } | { __typename?: 'AutomaticPersonsGroup', id: string, name: string, icon?: string | null } | { __typename?: 'ExplicitGroup', id: string, name: string, icon?: string | null } | { __typename?: 'LastNameGroup', id: string, name: string, icon?: string | null } | { __typename?: 'RegexKeywordGroup', id: string, name: string, icon?: string | null } | { __typename?: 'SearchGroup', id: string, name: string, icon?: string | null } | { __typename?: 'TexGroup', id: string, name: string, icon?: string | null } | { __typename?: 'WordKeywordGroup', id: string, name: string, icon?: string | null }> } | { __typename?: 'RegexKeywordGroup', id: string, name: string, icon?: string | null, children: Array<{ __typename?: 'AutomaticKeywordGroup', id: string, name: string, icon?: string | null } | { __typename?: 'AutomaticPersonsGroup', id: string, name: string, icon?: string | null } | { __typename?: 'ExplicitGroup', id: string, name: string, icon?: string | null } | { __typename?: 'LastNameGroup', id: string, name: string, icon?: string | null } | { __typename?: 'RegexKeywordGroup', id: string, name: string, icon?: string | null } | { __typename?: 'SearchGroup', id: string, name: string, icon?: string | null } | { __typename?: 'TexGroup', id: string, name: string, icon?: string | null } | { __typename?: 'WordKeywordGroup', id: string, name: string, icon?: string | null }> } | { __typename?: 'SearchGroup', id: string, name: string, icon?: string | null, children: Array<{ __typename?: 'AutomaticKeywordGroup', id: string, name: string, icon?: string | null } | { __typename?: 'AutomaticPersonsGroup', id: string, name: string, icon?: string | null } | { __typename?: 'ExplicitGroup', id: string, name: string, icon?: string | null } | { __typename?: 'LastNameGroup', id: string, name: string, icon?: string | null } | { __typename?: 'RegexKeywordGroup', id: string, name: string, icon?: string | null } | { __typename?: 'SearchGroup', id: string, name: string, icon?: string | null } | { __typename?: 'TexGroup', id: string, name: string, icon?: string | null } | { __typename?: 'WordKeywordGroup', id: string, name: string, icon?: string | null }> } | { __typename?: 'TexGroup', id: string, name: string, icon?: string | null, children: Array<{ __typename?: 'AutomaticKeywordGroup', id: string, name: string, icon?: string | null } | { __typename?: 'AutomaticPersonsGroup', id: string, name: string, icon?: string | null } | { __typename?: 'ExplicitGroup', id: string, name: string, icon?: string | null } | { __typename?: 'LastNameGroup', id: string, name: string, icon?: string | null } | { __typename?: 'RegexKeywordGroup', id: string, name: string, icon?: string | null } | { __typename?: 'SearchGroup', id: string, name: string, icon?: string | null } | { __typename?: 'TexGroup', id: string, name: string, icon?: string | null } | { __typename?: 'WordKeywordGroup', id: string, name: string, icon?: string | null }> } | { __typename?: 'WordKeywordGroup', id: string, name: string, icon?: string | null, children: Array<{ __typename?: 'AutomaticKeywordGroup', id: string, name: string, icon?: string | null } | { __typename?: 'AutomaticPersonsGroup', id: string, name: string, icon?: string | null } | { __typename?: 'ExplicitGroup', id: string, name: string, icon?: string | null } | { __typename?: 'LastNameGroup', id: string, name: string, icon?: string | null } | { __typename?: 'RegexKeywordGroup', id: string, name: string, icon?: string | null } | { __typename?: 'SearchGroup', id: string, name: string, icon?: string | null } | { __typename?: 'TexGroup', id: string, name: string, icon?: string | null } | { __typename?: 'WordKeywordGroup', id: string, name: string, icon?: string | null }> }> } | null };

export const DocumentDetailsFragmentDoc = gql`fragment DocumentDetails on Document {
  id
  title
  keywords
  abstract
  doi
  authors {
    ... on Person {
      id
      name
    }
    ... on Organization {
      id
      name
    }
  }
  ... on JournalArticle {
    in {
      volume
      number
      journal {
        id
        name
      }
    }
    published
    pageStart
    pageEnd
  }
  ... on ProceedingsArticle {
    in {
      title
    }
  }
  ... on Thesis {
    institution {
      id
      name
    }
  }
}
`;
export const DocumentForViewFragmentDoc = gql`fragment DocumentForView on Document {
  id
  title
  keywords
  abstract
  authors {
    ... on Person {
      id
      name
    }
    ... on Organization {
      id
      name
    }
  }
  ... on JournalArticle {
    in {
      journal {
        id
        name
      }
    }
  }
  ... on ProceedingsArticle {
    in {
      title
    }
  }
  ... on Thesis {
    institution {
      id
      name
    }
  }
}
`;
export const ChangePasswordDocument = gql`mutation ChangePassword($token: String!, $id: ID!, $newPassword: String!) {
  changePassword(token: $token, id: $id, newPassword: $newPassword) {
    ... on UserReturned {
      user {
        id
      }
    }
    ... on InputValidationProblem {
      problems {
        path
        message
      }
    }
    ... on TokenProblem {
      message
    }
  }
}
`;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useChangePasswordMutation({
 *   variables: {
 *     token: // value for 'token'
 *     id: // value for 'id'
 *     newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(options: VueApolloComposable.UseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>>) {
  return VueApolloComposable.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
}
export type ChangePasswordMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ForgotPasswordDocument = gql`mutation ForgotPassword($email: EmailAddress!) {
  forgotPassword(email: $email) {
    result
  }
}
`;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useForgotPasswordMutation({
 *   variables: {
 *     email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(options: VueApolloComposable.UseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>>) {
  return VueApolloComposable.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
}
export type ForgotPasswordMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`mutation Login($email: EmailAddress!, $password: String!) {
  login(email: $email, password: $password) {
    ... on UserReturned {
      user {
        id
      }
    }
    ... on InputValidationProblem {
      problems {
        path
        message
      }
    }
  }
}
`;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLoginMutation({
 *   variables: {
 *     email: // value for 'email'
 *     password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(options: VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables>>) {
  return VueApolloComposable.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`mutation Logout {
  logout {
    result
  }
}
`;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLogoutMutation();
 */
export function useLogoutMutation(options: VueApolloComposable.UseMutationOptions<LogoutMutation, LogoutMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LogoutMutation, LogoutMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
}
export type LogoutMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LogoutMutation, LogoutMutationVariables>;
export const SignupDocument = gql`mutation Signup($email: EmailAddress!, $password: String!) {
  signup(email: $email, password: $password) {
    ... on UserReturned {
      user {
        id
      }
    }
    ... on InputValidationProblem {
      problems {
        path
        message
      }
    }
  }
}
`;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSignupMutation({
 *   variables: {
 *     email: // value for 'email'
 *     password: // value for 'password'
 *   },
 * });
 */
export function useSignupMutation(options: VueApolloComposable.UseMutationOptions<SignupMutation, SignupMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<SignupMutation, SignupMutationVariables>>) {
  return VueApolloComposable.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
}
export type SignupMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<SignupMutation, SignupMutationVariables>;
export const DocumentDetailsDocument = gql`query DocumentDetails($documentId: ID!) {
  userDocument(id: $documentId) {
    ...DocumentDetails
  }
}
${DocumentDetailsFragmentDoc}`;

/**
 * __useDocumentDetailsQuery__
 *
 * To run a query within a Vue component, call `useDocumentDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDocumentDetailsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useDocumentDetailsQuery({
 *   documentId: // value for 'documentId'
 * });
 */
export function useDocumentDetailsQuery(variables: DocumentDetailsQueryVariables | VueCompositionApi.Ref<DocumentDetailsQueryVariables> | ReactiveFunction<DocumentDetailsQueryVariables>, options: VueApolloComposable.UseQueryOptions<DocumentDetailsQuery, DocumentDetailsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<DocumentDetailsQuery, DocumentDetailsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<DocumentDetailsQuery, DocumentDetailsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<DocumentDetailsQuery, DocumentDetailsQueryVariables>(DocumentDetailsDocument, variables, options);
}
export function useDocumentDetailsLazyQuery(variables: DocumentDetailsQueryVariables | VueCompositionApi.Ref<DocumentDetailsQueryVariables> | ReactiveFunction<DocumentDetailsQueryVariables>, options: VueApolloComposable.UseQueryOptions<DocumentDetailsQuery, DocumentDetailsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<DocumentDetailsQuery, DocumentDetailsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<DocumentDetailsQuery, DocumentDetailsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<DocumentDetailsQuery, DocumentDetailsQueryVariables>(DocumentDetailsDocument, variables, options);
}
export type DocumentDetailsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<DocumentDetailsQuery, DocumentDetailsQueryVariables>;
export const DocumentsDocument = gql`query Documents($groupId: ID, $query: String, $first: Int, $after: String) {
  me {
    id
    documents(
      filterBy: { groupId: $groupId, query: $query }
      first: $first
      after: $after
    ) {
      edges {
        node {
          ...DocumentForView
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}
${DocumentForViewFragmentDoc}`;

/**
 * __useDocumentsQuery__
 *
 * To run a query within a Vue component, call `useDocumentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDocumentsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useDocumentsQuery({
 *   groupId: // value for 'groupId'
 *   query: // value for 'query'
 *   first: // value for 'first'
 *   after: // value for 'after'
 * });
 */
export function useDocumentsQuery(variables: DocumentsQueryVariables | VueCompositionApi.Ref<DocumentsQueryVariables> | ReactiveFunction<DocumentsQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<DocumentsQuery, DocumentsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<DocumentsQuery, DocumentsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<DocumentsQuery, DocumentsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<DocumentsQuery, DocumentsQueryVariables>(DocumentsDocument, variables, options);
}
export function useDocumentsLazyQuery(variables: DocumentsQueryVariables | VueCompositionApi.Ref<DocumentsQueryVariables> | ReactiveFunction<DocumentsQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<DocumentsQuery, DocumentsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<DocumentsQuery, DocumentsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<DocumentsQuery, DocumentsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<DocumentsQuery, DocumentsQueryVariables>(DocumentsDocument, variables, options);
}
export type DocumentsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<DocumentsQuery, DocumentsQueryVariables>;
export const GroupsDocument = gql`query Groups {
  me {
    id
    groups {
      id
      name
      icon
      children {
        id
        name
        icon
      }
    }
  }
}
`;

/**
 * __useGroupsQuery__
 *
 * To run a query within a Vue component, call `useGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGroupsQuery();
 */
export function useGroupsQuery(options: VueApolloComposable.UseQueryOptions<GroupsQuery, GroupsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GroupsQuery, GroupsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GroupsQuery, GroupsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GroupsQuery, GroupsQueryVariables>(GroupsDocument, {}, options);
}
export function useGroupsLazyQuery(options: VueApolloComposable.UseQueryOptions<GroupsQuery, GroupsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GroupsQuery, GroupsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GroupsQuery, GroupsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GroupsQuery, GroupsQueryVariables>(GroupsDocument, {}, options);
}
export type GroupsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GroupsQuery, GroupsQueryVariables>;
