import { Story, Meta } from '@storybook/vue'
import { TButton } from 'vue-tailwind/dist/components'

export default {
  component: TButton,
  title: 't-nuxtlink',
  args: {
    label: 'nuxtlink',
  },
} as Meta

const Template: Story = (args) => ({
  setup() {
    return { args }
  },
  template: '<t-nuxtlinkd>{{args.label}}</t-nuxtlinkd>',
})
export const Default = Template.bind({})
