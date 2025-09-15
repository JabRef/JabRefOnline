import type { Meta, StoryObj } from '@storybook/vue3'
import JabRefLogo from './JabrefLogo.vue'

const meta: Meta<typeof JabRefLogo> = {
  title: 'Components/JabRef Logo',
  component: JabRefLogo,
  parameters: {
    docs: {
      description: {
        component: 'The official JabRef logo component.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Standard: Story = {
  render: (args) => ({
    components: { JabRefLogo },
    setup() {
      return { args }
    },
    template: '<JabRefLogo v-bind="args" />',
  }),
  args: {},
}