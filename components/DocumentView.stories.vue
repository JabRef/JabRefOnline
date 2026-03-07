<script setup lang="ts">
import DocumentView from './DocumentView.vue'

const mockArticle = {
  __typename: 'JournalArticle',
  id: '1',
  title: 'A Comprehensive Study on Reference Management',
  keywords: ['BibTeX', 'Reference Management', 'Open Source'],
  abstract:
    'This paper presents a comprehensive study on modern reference management systems, with a focus on open-source solutions. We explore the challenges faced by researchers in organizing their literature and propose innovative solutions to improve workflow efficiency.',
  authors: [
    {
      __typename: 'Person',
      id: 'author1',
      family: 'Smith',
    },
    {
      __typename: 'Person',
      id: 'author2',
      family: 'Johnson',
    },
  ],
  in: {
    id: 'issue1',
    journal: {
      id: 'journal1',
      name: 'Journal of Software Engineering',
    },
  },
}

const mockThesis = {
  __typename: 'Thesis',
  id: '2',
  title: 'Advanced Algorithms for Bibliography Management',
  keywords: ['Algorithms', 'Bibliography'],
  abstract:
    'This thesis explores advanced algorithms for efficient bibliography management in large-scale research projects.',
  authors: [
    {
      __typename: 'Person',
      id: 'author3',
      family: 'Williams',
    },
  ],
  institution: {
    id: 'inst1',
    name: 'University of Technology',
  },
}
</script>

<template>
  <Stories
    title="DocumentView"
    :component="DocumentView"
  >
    <Story title="Journal Article">
      <!-- @vue-expect-error: typing of the fragment is hard -->
      <DocumentView :source="mockArticle" />
    </Story>
    <Story title="PhD Thesis">
      <!-- @vue-expect-error: typing of the fragment is hard -->
      <DocumentView :source="mockThesis" />
    </Story>
    <Story title="Without Abstract">
      <!-- @vue-expect-error: typing of the fragment is hard -->
      <DocumentView
        :source="{
          ...mockArticle,
          abstract: null,
        }"
      />
    </Story>
  </Stories>
</template>
