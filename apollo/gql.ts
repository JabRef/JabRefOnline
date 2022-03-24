/* eslint-disable */
import * as graphql from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n      query Me {\n        me {\n          id\n        }\n      }\n    ": graphql.MeDocument,
    "\n            query CheckLoggedIn {\n              me {\n                id\n              }\n            }\n          ": graphql.CheckLoggedInDocument,
};

export function gql(source: "\n      query Me {\n        me {\n          id\n        }\n      }\n    "): (typeof documents)["\n      query Me {\n        me {\n          id\n        }\n      }\n    "];
export function gql(source: "\n            query CheckLoggedIn {\n              me {\n                id\n              }\n            }\n          "): (typeof documents)["\n            query CheckLoggedIn {\n              me {\n                id\n              }\n            }\n          "];

export function gql(source: string): unknown;
export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;