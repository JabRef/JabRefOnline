<template>
  <!-- Auto-grow text-input, idea taken from https://css-tricks.com/auto-growing-inputs-textareas/ -->
  <span class="inline-block relative">
    <t-input
      :value="value"
      variant="plain"
      class="absolute w-full left-0 py-1"
      @input="update"
    ></t-input>
    <span
      class="inline-block px-3 py-1 text-base invisible border"
      aria-hidden="true"
      >{{ value }}</span
    >
  </span>
</template>

<script>
export default {
  props: ['value'],
  methods: {
    update(newValue) {
      this.$emit('input', newValue)
    },
  },
}
</script>
