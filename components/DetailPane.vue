<template>
  <div>
    <transition
      enter-active-class="transform transition ease-out duration-300"
      leave-active-class="transform transition ease-in duration-300"
      enter-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="isDetailsOpen"
        id="details"
        class="
          fixed
          top-20
          bottom-0
          right-0
          flex flex-col flex-wrap
          bg-white
          border-l border-gray-300
          z-40
          w-1/3
          md:shadow-sm
          p-4
        "
      >
        <t-button
          variant="plain"
          class="
            absolute
            top-10
            -left-3.5
            w-7
            h-7
            rounded-full
            bg-white
            border border-gray-300
            md:shadow-sm
            flex
            items-center
            justify-center
            active:border-gray-300
            transform
            text-gray-400
            hover:scale-110 hover:border-gray-400 hover:text-gray-500
          "
          @click="closePane"
        >
          <FontAwesomeIcon icon="times" />
        </t-button>
        <slot>
          <div class="flex flex-col">
            <div>
              <t-select
                :options="{
                  Article: 'Journal Article',
                  PhDThesis: 'PhD Thesis',
                }"
                class="text-gray-500 focus-within:text-black"
                variant="plain"
              >
                <template slot="arrow" slot-scope="{ className }">
                  <FontAwesomeIcon
                    icon="chevron-down"
                    size="xs"
                    :class="className"
                  />
                </template>
              </t-select>
            </div>
            <div class="z-10 grid">
              <!-- Auto-grow textarea, taken from https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/ -->
              <!-- prettier-ignore -->
              <div
                class="
                  whitespace-pre-wrap
                  text-xl
                  row-span-1
                  col-span-1 col-start-1
                  row-start-1
                  py-2
                  px-3
                  invisible
                "
              >{{ title + ' ' }}</div>
              <t-textarea
                v-model="title"
                variant="plain"
                class="
                  text-xl
                  resize-none
                  overflow-hidden
                  row-span-1
                  col-span-1 col-start-1
                  row-start-1
                "
              ></t-textarea>
            </div>
            <div>
              <Tags
                ref="myRef"
                v-model="authors"
                placeholder="Add author"
                :delimiters="null"
                :whitelist="authorSuggestions"
              />
            </div>
            <div>
              <editor-input v-model="date"></editor-input>
              <span class="text-gray-400">|</span>
              <editor-input v-model="journal"></editor-input>
            </div>
            <div>
              <span class="pl-3">
                Volume:
                <editor-input v-model="volume"></editor-input>
              </span>
              <span class="text-gray-400 pr-3">|</span>
              <span>
                Issue:
                <editor-input v-model="issue"></editor-input>
              </span>
              <span class="text-gray-400 pr-3">|</span>
              <span>
                pp.
                <editor-input v-model="pages"></editor-input>
              </span>
            </div>
          </div>
        </slot>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import Tags from './tagify.vue'
import { useUiStore } from './../store'
import EditorInput from './EditorInput.vue'

export default defineComponent({
  components: {
    Tags,
    EditorInput,
  },
  setup() {
    const ui = useUiStore()

    const authors = [{ value: 'Tobias Diez' }, { value: 'Gerd Rudolph' }]

    const authorSuggestions = [{ value: 'Linus' }]

    return {
      isDetailsOpen: computed(() => ui.isDetailsOpen),
      closePane: () => (ui.isDetailsOpen = false),
      title:
        'Clebsch-Lagrange variational principle and geometric constraint analysis of relativistic field theories',
      authors,
      authorSuggestions,
      date: '2019 / 12',
      journal: 'Journal of Mathematical Physics',
      volume: '300',
      issue: '3',
      pages: '567-589',
    }
  },
})
</script>
