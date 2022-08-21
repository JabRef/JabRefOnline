import { Meta, Story } from '@storybook/vue3'
import JabRefLogo from './JabrefLogo.vue'

export default {
  title: 'JabRef Logo',
  component: JabRefLogo,
} as Meta

export const Default: Story = () => ({
  components: { JabRefLogo },
  template: '<JabRefLogo />',
})
