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
    <slot name="header">
      <NavBar />
    </slot>
    <div class="md:pb-10">
      <slot />
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
</script>
