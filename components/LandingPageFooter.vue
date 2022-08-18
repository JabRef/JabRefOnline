<template>
  <footer class="pt-12">
    <div
      class="container mx-auto sm:px-4 py-4 md:py-8 border-t border-gray-200 flex flex-wrap max-w-screen-lg"
    >
      <div class="md:w-1/5 pr-4 pl-4 md:mx-1/6">
        <JabrefLogo class="max-w-full h-auto" />
      </div>
      <div class="md:w-1/5 pr-4 pl-4 md:mx-1/6">
        <ul class="flex flex-wrap list-none pl-0 mb-0 flex-col">
          <li class="py-2 px-4">
            <strong class="text-gray-700">Install</strong>
          </li>
          <li class="py-1">
            <t-nuxtlink
              class="px-4 no-underline text-sm text-gray-800 hover:text-highlight-800"
              href="https://downloads.jabref.org/"
            >
              Desktop apps
            </t-nuxtlink>
          </li>
          <li class="py-1">
            <t-nuxtlink
              class="px-4 no-underline text-sm text-gray-800 hover:text-highlight-800"
              href="https://docs.jabref.org/collect/jabref-browser-extension"
            >
              Browser extensions
            </t-nuxtlink>
          </li>
          <li class="py-1">
            <t-nuxtlink
              class="px-4 no-underline text-sm text-gray-800 hover:text-highlight-800"
              href="https://builds.jabref.org/main/"
            >
              Development build
            </t-nuxtlink>
          </li>
          <li class="py-1">
            <t-nuxtlink
              class="px-4 no-underline text-sm text-gray-800 hover:text-highlight-800"
              href="https://github.com/JabRef/jabref/blob/main/CHANGELOG.md"
            >
              Change Log
            </t-nuxtlink>
          </li>
        </ul>
      </div>
      <div class="md:w-1/5 pr-4 pl-4">
        <ul class="flex flex-wrap list-none pl-0 mb-0 flex-col">
          <li class="py-2 px-4">
            <strong class="text-gray-700">Links</strong>
          </li>
          <li class="py-1">
            <t-nuxtlink
              class="px-4 no-underline text-sm text-gray-800 hover:text-highlight-800"
              href="https://docs.jabref.org/advanced/resources"
            >
              Resources
            </t-nuxtlink>
          </li>
          <li class="py-1">
            <t-nuxtlink
              class="px-4 no-underline text-sm text-gray-800 hover:text-highlight-800"
              href="http://java.by-comparison.com/"
            >
              Java by Comparison
            </t-nuxtlink>
          </li>
          <li class="py-1">
            <t-nuxtlink
              class="px-4 no-underline text-sm text-gray-800 hover:text-highlight-800"
              @click="showLegalNotices  = true"
            >
              Legal Notices 
            </t-nuxtlink>
          </li>
          <li class="py-1">
            <t-nuxtlink
              class="px-4 no-underline text-sm text-gray-800 hover:text-highlight-800"
              @click="showPrivacyPolicy = true"
            >
              Privacy Policy
            </t-nuxtlink>
          </li>
        </ul>
      </div>
      <div class="md:w-1/5 pr-4 pl-4">
        <ul class="flex flex-wrap list-none pl-0 mb-0 flex-col">
          <li class="py-2 px-4">
            <strong class="text-gray-700">Contribute</strong>
          </li>
          <li class="py-1">
            <t-nuxtlink
              class="px-4 no-underline text-sm text-gray-800 hover:text-highlight-800"
              href="https://github.com/JabRef/jabref/wiki/Donations"
            >
              Donation
            </t-nuxtlink>
          </li>
          <li class="py-1">
            <t-nuxtlink
              class="px-4 no-underline text-sm text-gray-800 hover:text-highlight-800"
              href="https://docs.jabref.org/faqcontributing/how-to-translate-the-ui"
            >
              Translation
            </t-nuxtlink>
          </li>
          <li class="py-1">
            <t-nuxtlink
              class="px-4 no-underline text-sm text-gray-800 hover:text-highlight-800"
              href="https://github.com/JabRef/jabref"
            >
              GitHub
            </t-nuxtlink>
          </li>
          <li class="py-1">
            <t-nuxtlink
              class="px-4 no-underline text-sm text-gray-800 hover:text-highlight-800"
              href="https://devdocs.jabref.org/"
            >
              Developer Docs
            </t-nuxtlink>
          </li>
        </ul>
      </div>

      <div class="md:w-1/5 pr-4 pl-4">
        <ul class="flex flex-wrap list-none pl-0 mb-0 flex-col">
          <li class="py-2 px-4">
            <strong class="text-gray-700">Help & Contact</strong>
          </li>
          <li class="py-1">
            <t-nuxtlink
              class="px-4 no-underline text-sm text-gray-800 hover:text-highlight-800"
              href="https://docs.jabref.org/"
            >
              Documentation
            </t-nuxtlink>
          </li>
          <li class="py-1">
            <t-nuxtlink
              class="px-4 no-underline text-sm text-gray-800 hover:text-highlight-800"
              href="http://discourse.jabref.org/"
              >Forum</t-nuxtlink
            >
          </li>
          <li class="py-1">
            <t-nuxtlink
              class="px-4 no-underline text-sm text-gray-800 hover:text-highlight-800"
              href="https://twitter.com/JabRef_org"
            >
              Twitter
            </t-nuxtlink>
          </li>
          <li class="py-1">
            <t-nuxtlink
              class="px-4 no-underline text-sm text-gray-800 hover:text-highlight-800"
              href="https://github.com/JabRef/jabref/issues"
            >
              Report an issue
            </t-nuxtlink>
          </li>
        </ul>
      </div>
    </div>
    <Modal
      v-model="showLegalNotices"
      header="Impressum"
    >
      <ContentRenderer
        :value="legalNotices"
        class="prose overflow-auto max-h-96"
      />
    </Modal>
    <Modal
      v-model="showPrivacyPolicy"
      header="Datenschutzerklärung"
    >
      <ContentRenderer
        :value="privacyPolicy"
        class="prose overflow-auto max-h-96"
      />
    </Modal>
  </footer>
</template>
<script setup lang="ts">
import { ParsedContent } from '@nuxt/content/dist/runtime/types';

const showLegalNotices  = ref(false)
let legalNotices  = ref<ParsedContent | null>(null)
const showPrivacyPolicy = ref(false)
let privacyPolicy = ref<ParsedContent | null>(null)

watch(showLegalNotices , async (shouldShowLegalNotices ) => {
  if (shouldShowLegalNotices ) {
    legalNotices.value = await queryContent('/legalnotices').findOne()
  }
})
watch(showPrivacyPolicy, async (shouldShowPrivacyPolicy) => {
  if (shouldShowPrivacyPolicy) {
    privacyPolicy.value = await queryContent('/privacypolicy').findOne()
  }
})

</script>
