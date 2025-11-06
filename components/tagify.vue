<!-- eslint-disable vue/multi-word-component-names -->
<template v-once>
  <textarea
    v-if="type === 'textarea'"
    @change="onChange"
  />
  <input
    v-else
    @change="onChange"
  />
</template>

<script setup lang="ts">
import Tagify from '@yaireo/tagify'
import '@yaireo/tagify/dist/tagify.css'

const props = withDefaults(
  defineProps<{
    type?: string
    settings?: Tagify.TagifySettings
    value?: Tagify.TagData[]
    delimiters?: string
    whitelist?: Tagify.TagData[]
    tagClass?: string
  }>(),
  {
    type: 'input',
    settings: () => ({}),
    value: () => [],
    delimiters: ',',
    whitelist: () => [],
    tagClass: '',
  },
)

const emit = defineEmits<{
  input: [value: string | Tagify.TagData[]]
}>()

const tagify = ref<Tagify | null>(null)

watch(
  () => props.value,
  (newVal) => {
    // Value modified externally, update tagify
    if (newVal) {
      // @ts-expect-error: problem in tagify types
      tagify.value?.loadOriginalValues(newVal)
    }
  },
)

onMounted(() => {
  // Install tagify
  const tagifySettings: Tagify.TagifySettings = {
    delimiters: props.delimiters,
    whitelist: props.whitelist,
    ...props.settings,
  }
  if (props.tagClass) {
    if (tagifySettings.classNames) {
      tagifySettings.classNames.tag = 'tagify__tag ' + props.tagClass
    } else {
      tagifySettings.classNames = {
        tag: 'tagify__tag ' + props.tagClass,
      }
    }
  }

  // Get the actual DOM element (textarea or input) from the component root
  const instance = getCurrentInstance()
  const element = instance?.proxy?.$el as HTMLTextAreaElement | HTMLInputElement
  if (element) {
    tagify.value = new Tagify(element, tagifySettings)
  }
})

onUnmounted(() => {
  tagify.value?.destroy()
})

function onChange(event: { target: EventTarget | null }) {
  // Update value prop
  emit('input', (event.target as HTMLInputElement | null)?.value ?? [])
}
</script>

<style>
.tagify {
  --tags-border-color: transparent;
  --tag-bg: transparent;
  --tag-hover: #afb8d3; /* bg-primary-200 */
}
.tagify__tag {
  margin-left: 0.25rem;
  margin-right: 0.2rem;
  margin-top: auto;
  margin-bottom: auto;
}
</style>
