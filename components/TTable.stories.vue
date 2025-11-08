<script setup lang="ts">
import TTable from './TTable.vue'
</script>

<template>
  <Stories
    title="TTable"
    :component="TTable"
  >
    <Story title="Default">
      <TTable
        :headers="['Name', 'Value']"
        :data="[
          { name: 'DOI', value: '10.1000/example' },
          { name: 'ArXiv', value: '1812.04695' },
          { name: 'MathSciNet', value: 'MR3997558' },
        ]"
      />
    </Story>
    <Story title="Plain Variant">
      <TTable
        :headers="['Name', 'Value']"
        :data="[
          { name: 'DOI', value: '10.1000/example' },
          { name: 'ArXiv', value: '1812.04695' },
        ]"
        variant="plain"
      />
    </Story>
    <Story title="Empty Table">
      <TTable
        :headers="['Column 1', 'Column 2', 'Column 3']"
        :data="[]"
      />
    </Story>
  </Stories>
</template>
