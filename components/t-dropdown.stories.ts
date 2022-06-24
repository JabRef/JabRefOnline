import { Story, Meta } from '@storybook/vue3'
import { TDropdown } from '@variantjs/vue'

export default {
  component: TDropdown,
  title: 't-dropdown',
  args: {
    text: 'Dropdown',
  },
} as Meta

const Template: Story = (args) => ({
  setup() {
    return { args }
  },
  template: `<t-dropdown v-bind="args">
      <div class="py-1 rounded-md shadow-xs">
        <a
          href="#"
          class="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
          role="menuitem"
        >
          Your Profile
        </a>
        <a
          href="#"
          class="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
          role="menuitem"
        >
          Settings
        </a>
        <a
          href="#"
          class="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
          role="menuitem"
        >
          Sign out
        </a>
      </div>
    </t-dropdown>`,
})
export const Default = Template.bind({})
