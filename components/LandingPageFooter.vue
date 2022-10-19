<template>
  <footer class="md:pb-4 md:pt-8">
    <div
      class="container mx-auto pr-4 pl-8 md:pl-4 py-6 border-t border-gray-200 flex flex-col md:flex-row flex-wrap max-w-screen-lg"
    >
      <div class="w-4/12 md:w-1/5 md:mx-1/6">
        <JabrefLogo class="max-w-full max-h-44 h-auto md:p-3" />
      </div>
      <div class="md:w-1/5 md:mx-1/6 md:px-4">
        <ul class="flex flex-wrap list-none pl-0 mb-0 flex-col">
          <li class="py-2">
            <strong class="text-gray-700">Install</strong>
          </li>
          <li class="py-1">
            <t-nuxtlink
              class="no-underline text-sm text-gray-800 hover:text-primary-800"
              href="download"
            >
              Desktop apps
            </t-nuxtlink>
          </li>
          <li class="py-1">
            <t-nuxtlink
              class="no-underline text-sm text-gray-800 hover:text-primary-800"
              href="https://docs.jabref.org/collect/jabref-browser-extension"
            >
              Browser extensions
            </t-nuxtlink>
          </li>
          <li class="py-1">
            <t-nuxtlink
              class="no-underline text-sm text-gray-800 hover:text-primary-800"
              href="https://builds.jabref.org/main/"
            >
              Development build
            </t-nuxtlink>
          </li>
          <li class="py-1">
            <t-nuxtlink
              class="no-underline text-sm text-gray-800 hover:text-primary-800"
              href="https://github.com/JabRef/jabref/blob/main/CHANGELOG.md"
            >
              Change Log
            </t-nuxtlink>
          </li>
        </ul>
      </div>
      <div class="md:w-1/5 md:px-4">
        <ul class="flex flex-wrap list-none pl-0 mb-0 flex-col">
          <li class="py-2">
            <strong class="text-gray-700">Links</strong>
          </li>
          <li class="py-1">
            <t-nuxtlink
              class="no-underline text-sm text-gray-800 hover:text-primary-800"
              href="https://docs.jabref.org/advanced/resources"
            >
              Resources
            </t-nuxtlink>
          </li>
          <li class="py-1">
            <t-nuxtlink
              class="no-underline text-sm text-gray-800 hover:text-primary-800"
              href="http://java.by-comparison.com/"
            >
              Java by Comparison
            </t-nuxtlink>
          </li>
          <li class="py-1">
            <t-nuxtlink
              class="no-underline text-sm text-gray-800 hover:text-primary-800"
              @click="showLegalNotices = true"
            >
              Legal Notices
            </t-nuxtlink>
          </li>
          <li class="py-1">
            <t-nuxtlink
              class="no-underline text-sm text-gray-800 hover:text-primary-800"
              @click="showPrivacyPolicy = true"
            >
              Privacy Policy
            </t-nuxtlink>
          </li>
        </ul>
      </div>
      <div class="md:w-1/5 md:px-4">
        <ul class="flex flex-wrap list-none pl-0 mb-0 flex-col">
          <li class="py-2">
            <strong class="text-gray-700">Contribute</strong>
          </li>
          <li class="py-1">
            <t-nuxtlink
              class="no-underline text-sm text-gray-800 hover:text-primary-800"
              href="https://github.com/JabRef/jabref/wiki/Donations"
            >
              Donation
            </t-nuxtlink>
          </li>
          <li class="py-1">
            <t-nuxtlink
              class="no-underline text-sm text-gray-800 hover:text-primary-800"
              href="https://docs.jabref.org/faqcontributing/how-to-translate-the-ui"
            >
              Translation
            </t-nuxtlink>
          </li>
          <li class="py-1">
            <t-nuxtlink
              class="no-underline text-sm text-gray-800 hover:text-primary-800"
              href="https://github.com/JabRef/jabref"
            >
              GitHub
            </t-nuxtlink>
          </li>
          <li class="py-1">
            <t-nuxtlink
              class="no-underline text-sm text-gray-800 hover:text-primary-800"
              href="https://devdocs.jabref.org/"
            >
              Developer Docs
            </t-nuxtlink>
          </li>
        </ul>
      </div>

      <div class="md:w-1/5 md:px-4">
        <ul class="flex flex-wrap list-none pl-0 mb-0 flex-col">
          <li class="py-2">
            <strong class="text-gray-700">Help & Contact</strong>
          </li>
          <li class="py-1">
            <t-nuxtlink
              class="no-underline text-sm text-gray-800 hover:text-primary-800"
              href="https://docs.jabref.org/"
            >
              Documentation
            </t-nuxtlink>
          </li>
          <li class="py-1">
            <t-nuxtlink
              class="no-underline text-sm text-gray-800 hover:text-primary-800"
              href="http://discourse.jabref.org/"
              >Forum</t-nuxtlink
            >
          </li>
          <li class="py-1">
            <t-nuxtlink
              class="no-underline text-sm text-gray-800 hover:text-primary-800"
              href="https://twitter.com/JabRef_org"
            >
              Twitter
            </t-nuxtlink>
          </li>
          <li class="py-1">
            <t-nuxtlink
              class="no-underline text-sm text-gray-800 hover:text-primary-800"
              href="https://github.com/JabRef/jabref/issues"
            >
              Report an issue
            </t-nuxtlink>
          </li>
        </ul>
      </div>
    </div>
    <ModalDialog
      v-model="showLegalNotices"
      header="Impressum"
    >
      <ContentRenderer
        v-if="legalNotices"
        :value="legalNotices"
        class="prose overflow-auto max-h-96"
      />
    </ModalDialog>
    <ModalDialog
      v-model="showPrivacyPolicy"
      header="Datenschutzerklärung"
    >
      <ContentRenderer
        v-if="privacyPolicy"
        :value="privacyPolicy"
        class="prose overflow-auto max-h-96"
      />
    </ModalDialog>
  </footer>
</template>
<script setup lang="ts">
import { ParsedContent } from '@nuxt/content/dist/runtime/types'

const showLegalNotices = ref(false)
const legalNotices = ref<ParsedContent | null>(null)
const showPrivacyPolicy = ref(false)
const privacyPolicy = ref<ParsedContent | null>(null)

watch(showLegalNotices, async (shouldShowLegalNotices) => {
  if (shouldShowLegalNotices) {
    legalNotices.value = await queryContent('/legalnotices').findOne()
  }
})
watch(showPrivacyPolicy, async (shouldShowPrivacyPolicy) => {
  if (shouldShowPrivacyPolicy) {
    privacyPolicy.value = await queryContent('/privacypolicy').findOne()
  }
})
</script>
