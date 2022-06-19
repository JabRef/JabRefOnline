<!-- Simle table, needed as long as variantjs doesn't provide one https://github.com/variantjs/vue/issues/26 -->
<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="header in headers"
          :key="header"
        >
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, index) in data"
        :key="index"
      >
        <td
          v-for="cell in row"
          :key="cell"
        >
          {{ cell }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts" setup>
interface Props {
  headers?: string[]
  data?: any[]
  variant?: string
}

const props = withDefaults(defineProps<Props>(), {
  headers: () => [],
  data: () => [],
  variant: '',
})
</script>
