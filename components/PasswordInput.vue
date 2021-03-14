<template>
  <div>
    <input
      ref="input"
      :class="[classes]"
      :type="showHiddenPassword ? 'password' : 'text'"
      x-model="password"
      class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-md sm:text-sm border border-gray-300 placeholder-gray-400"
      @input="handleInput"
    />
    <div
      class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
    >
      <FontAwesomeIcon
        class="text-gray-500"
        :icon="showHiddenPassword ? 'eye' : 'eye-slash'"
        :title="showHiddenPassword ? 'Show Password' : 'Hide Password'"
        @click="showHiddenPassword = !showHiddenPassword"
      />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      type: String,
      default: '',
    },
    classes: {
      type: [Object, Array, String],
      default: '',
    },
  },
  data() {
    return {
      showHiddenPassword: false,
    }
  },
  methods: {
    handleInput(event: HTMLInputEvent): void {
      this.$emit('input', event.target.value)
    },
  },
})
</script>
