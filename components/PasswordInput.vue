<template>
  <div class="relative">
    <t-input
      ref="input"
      v-model="password"
      :class="[classes]"
      :type="showHiddenPassword ? 'password' : 'text'"
      x-model="password"
    />
    <div
      class="
        absolute
        inset-y-0
        right-0
        pr-3
        flex
        items-center
        text-sm
        leading-5
      "
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
import { computed, defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
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
  setup(props, { emit }) {
    const showHiddenPassword = ref(true)

    const password = computed({
      get: () => props.value,
      set: (value): void => emit('input', value),
    })

    return {
      password,
      showHiddenPassword,
    }
  },
})
</script>
