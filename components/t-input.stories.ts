import TInput from 'vue-tailwind/dist/t-input'

import { defineMeta, defineStory } from '~/utils/storybook'

export default defineMeta({
  component: TInput,
  title: 't-input',
  args: {
    value: 'Input text',
  },
})

export const Default = defineStory({})
export const Error = defineStory({
  ...Default,
  args: {
    variant: 'error',
  },
})
export const Success = defineStory({
  ...Default,
  args: {
    variant: 'success',
  },
})
export const Plain = defineStory({
  ...Default,
  args: {
    variant: 'plain',
  },
})
