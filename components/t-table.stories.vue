<script setup lang="ts">
import TTable from '~/components/TTable.vue'
</script>

<template>
  <Stories
    title="t-table"
    :component="TTable"
  >
    <Story title="Default">
      <t-table
        :headers="['Name', 'Email', 'Age', 'Sales']"
        :data="[
          ['Alfonso Bribiesca', 'alfonso@vexilo.com', 20, '$9,999.00'],
          ['Saida Redondo', 'saida@gmail.com', 20, '$124.00'],
        ]"
      />
    </Story>
    <Story title="Plain">
      <t-table
        variant="plain"
        :headers="['Name', 'Email', 'Age', 'Sales']"
        :data="[
          ['Alfonso Bribiesca', 'alfonso@vexilo.com', 20, '$9,999.00'],
          ['Saida Redondo', 'saida@gmail.com', 20, '$124.00'],
        ]"
      />
    </Story>
  </Stories>
</template>
