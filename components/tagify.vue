<template v-once>
  <textarea v-if="type === 'textarea'" :value="value" @change="onChange" />
  <input v-else :value="value" @change="onChange" />
</template>

<script lang="ts">
import Tagify from '@yaireo/tagify'
import '@yaireo/tagify/dist/tagify.css'
import { defineComponent, PropType } from '@nuxtjs/composition-api'

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
      this.tagify?.loadOriginalValues(newVal)
    },
  },
  mounted() {
    // Install tagify
    const tagifySettings: Tagify.TagifyConstructorSettings<Tagify.TagData> = {
      delimiters: this.delimiters,
      whitelist: this.whitelist,
      ...this.settings,
    }
    if (this.tagClass) {
      if (tagifySettings.classNames) {
        tagifySettings.classNames.tag = 'tagify__tag ' + this.tagClass
      } else {
        // @ts-ignore: Typing information seems to be incorrect, don't need to provide a complete classNames object
        tagifySettings.classNames = {
          tag: 'tagify__tag ' + this.tagClass,
        }
      }
    }

    this.tagify = new Tagify(
      this.$el as HTMLTextAreaElement | HTMLInputElement,
      tagifySettings
    )
    // Using current data as initial tags
    this.tagify.removeAllTags()
    this.tagify.addTags(this.value)
  },
  methods: {
    onChange(event: { target: HTMLInputElement | null }) {
      // Update value prop
      this.$emit('input', event.target?.value || [])
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
</style>
