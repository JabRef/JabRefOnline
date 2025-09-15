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
    <div class="flex flex-col min-h-screen">
      <header class="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <slot name="header">
          <NavBar />
        </slot>
      </header>
      <main class="flex-1 pt-20 md:pt-20 md:pb-10">
        <slot />
      </main>
    </div>
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

// Only on client-side
if (import.meta.client) {
  // Simple scroll behavior for the main content area
  const offset = 80
  const windowScrollTo = window.scrollTo
  Object.defineProperty(window, 'scrollTo', {
    value: (option: { top: number; left: number }) => {
      const mainElement = document.querySelector('main')
      if (mainElement && mainElement.scrollHeight > mainElement.clientHeight) {
        // element can be scrolled
        mainElement.scrollTo(option.left, mainElement.scrollTop + option.top - offset)
      } else {
        windowScrollTo.call(window, option.left, option.top)
      }
    },
  })
}
</script>
