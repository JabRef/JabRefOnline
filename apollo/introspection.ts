
      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "ChangePasswordPayload": [
      "UserReturned",
      "ExpiredTokenProblem"
    ],
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
    ],
    "InputFieldValidationProblem": [],
    "SignupPayload": [
      "UserReturned",
      "InputValidationProblem"
    ]
  }
};
      export default result;
    