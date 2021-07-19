
      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "Document": [
      "Article",
      "InProceedings",
      "PhdThesis",
      "Unknown"
    ],
    "Entity": [
      "Person",
      "Organization"
    ],
    "Group": [
      "AutomaticKeywordGroup",
      "AutomaticPersonsGroup",
      "ExplicitGroup",
      "LastNameGroup",
      "RegexKeywordGroup",
      "SearchGroup",
      "TexGroup",
      "WordKeywordGroup"
    ]
  }
};
      export default result;
    