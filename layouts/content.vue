<template>
  <div>
    <SchemaOrgOrganization
      name="JabRef e.V."
      logo="https://www.jabref.org/img/JabRef-icon-256.png"
    />
    <SchemaOrgSoftwareApp
      name="JabRef"
      operating-system="Windows, OS X, Linux"
      application-category="EducationalApplication"
      application-sub-category="Reference manager"
      download-url="https://downloads.jabref.org/"
      feature-list="https://www.jabref.org/#features"
      screenshot="https://www.jabref.org/assets/jabref-mainscreen.png"
      :offers="{ price: '0', priceCurrency: 'EUR' }"
    />
    <SchemaOrgProduct
      name="JabRef"
      description="JabRef is a free reference manager that helps you to discover, collect,
        organize and cite your scholarly literature and research in an efficient
        way."
      image="https://www.jabref.org/assets/jabref-mainscreen.png"
      application-sub-category="Reference manager"
      download-url="https://downloads.jabref.org/"
      feature-list="https://www.jabref.org/#features"
      screenshot="https://www.jabref.org/assets/jabref-mainscreen.png"
      :offers="{ price: '0', priceCurrency: 'EUR' }"
    />
    <n-layout :position="position">
      <header>
        <n-layout-header
          :position="position"
          class="z-50"
        >
          <slot name="header">
            <NavBar />
          </slot>
        </n-layout-header>
      </header>
      <div class="md:mt-20 md:pb-10">
        <slot />
      </div>
    </n-layout>
  </div>
</template>
<script setup lang="ts">
useHead({
  meta: [
    {
      property: 'og:image',
      content: 'https://www.jabref.org/assets/jabref-mainscreen.png',
    },
  ],
})

let position = ref<'static' | 'absolute'>('static')
onMounted(() => {
  // TODO: This doesn't seem to work all the time (on initial load the static class is still applied), is SSR in layouts broken?
  position = computed(() => (isSmallDisplay.value ? 'static' : 'absolute'))
})
// Only on client-side
if (import.meta.client) {
  // Make sure that the content is scrolled and not the unscrollable window
  // (vue-router for example uses window.scrollTo)
  // Taken from https://github.com/vuejs/vue-router/issues/1187#issuecomment-893964727
  const offset = 80
  const contentElementSelector = '.n-layout-scroll-container'
  Object.defineProperty(window, 'pageXOffset', {
    get() {
      return document.querySelector(contentElementSelector)?.scrollLeft ?? 0
    },
  })
  Object.defineProperty(window, 'pageYOffset', {
    get() {
      return document.querySelector(contentElementSelector)?.scrollTop ?? 0
    },
  })
  const windowScrollTo = window.scrollTo
  Object.defineProperty(window, 'scrollTo', {
    value: (option: { top: number; left: number }) => {
      const els = document.querySelectorAll(contentElementSelector)
      const el = els[els.length - 1]
      if (el.scrollHeight > el.clientHeight) {
        // element can be scrolled
        el.scrollTo(option.left, el.scrollTop + option.top - offset)
      } else {
        windowScrollTo.call(window, option.left, option.top)
      }
    },
  })
}
</script>
