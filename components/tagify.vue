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

<script lang="ts">
import Tagify from '@yaireo/tagify'
import '@yaireo/tagify/dist/tagify.css'
import type { PropType } from 'vue'
export default defineComponent({
  name: 'TagsInput',
  props: {
    type: {
      type: String,
      default: 'input',
    },
    settings: {
      type: Object as PropType<
        Tagify.TagifyConstructorSettings<Tagify.TagData>
      >,
      default: () => ({}),
    },
    value: {
      type: Array as PropType<Tagify.TagData[]>, // e.g. [{"value":"cat"}, {"value":"dog"}]'
      default: () => [],
    },
    delimiters: {
      type: String,
      default: ',',
    },
    whitelist: {
      type: Array as PropType<Tagify.TagData[]>,
      default: () => [],
    },
    tagClass: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tagify: null as Tagify | null,
    }
  },
  watch: {
    value(newVal, _oldVal) {
      // Value modified externally, update tagify
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      this.tagify?.loadOriginalValues(newVal)
    },
  },
  mounted() {
    // Install tagify
    const tagifySettings: Tagify.TagifyConstructorSettings<Tagify.TagData> = {
      delimiters: this.delimiters,
      whitelist: this.whitelist,
      ...(this.settings ?? []),
    }
    if (this.tagClass) {
      if (tagifySettings.classNames) {
        tagifySettings.classNames.tag = 'tagify__tag ' + this.tagClass
      } else {
        // @ts-expect-error: Typing information seems to be incorrect, don't need to provide a complete classNames object
        tagifySettings.classNames = {
          tag: 'tagify__tag ' + this.tagClass,
        }
      }
    }

    this.tagify = new Tagify(
      this.$el as HTMLTextAreaElement | HTMLInputElement,
      tagifySettings
    )
  },
  unmounted() {
    this.tagify?.destroy()
  },
  methods: {
    onChange(event: { target: EventTarget | null }) {
      // Update value prop
      this.$emit(
        'input',
        (event.target as HTMLInputElement | null)?.value || []
      )
    },
  },
})
</script>

<style>
.tagify {
  --tags-border-color: transparent;
  --tag-bg: transparent;
  --tag-hover: #c7d2fe; /* bg-highlight-300 */
}
.tagify__tag {
  margin-left: 0.25rem;
  margin-right: 0.2rem;
  margin-top: auto;
  margin-bottom: auto;
}
</style>
