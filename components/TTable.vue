<!-- Simle table, needed as long as variantjs doesn't provide one https://github.com/variantjs/vue/issues/26 -->
<template>
  <table :class="tableClass">
    <thead>
      <tr>
        <th
          v-for="header in headers"
          :key="header"
          :class="headerClass"
          >
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody :class="tbodyClass">
      <tr
        v-for="(row, index) in data"
        :key="index"
        >
        <td
          v-for="cell in row"
          :key="cell"
          :class="tdClass"
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

let tableClass =
  'min-w-full divide-y divide-gray-100 shadow-sm border-gray-200 border'
const headerClass = 'px-3 py-2 font-semibold text-left bg-gray-100 border-b'
let tbodyClass = 'bg-white divide-y divide-gray-100'
let tdClass = 'px-3 py-2 whitespace-no-wrap'
if (props.variant === 'plain') {
  tableClass = ''
  tbodyClass = 'bg-transparent'
  tdClass = 'px-3 py-1 whitespace-no-wrap'
}
</script>
