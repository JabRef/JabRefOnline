import { Story, Meta } from '@storybook/vue3'
import TTable from './components/ttable.vue'

export default {
  component: TTable,
  title: 't-table',
  args: {
    headers: ['Name', 'Email', 'Age', 'Sales'],
    data: [
      ['Alfonso Bribiesca', 'alfonso@vexilo.com', 20, '$9,999.00'],
      ['Saida Redondo', 'saida@gmail.com', 20, '$124.00'],
    ],
  },
} as Meta

const Template: Story = (args) => ({
  setup() {
    return { args }
  },
  template: '<t-table v-bind="args"></t-table>',
})

export const Default = Template.bind({})
export const Plain = Template.bind({})
Plain.args = {
  variant: 'plain',
  headers: ['Name', 'Email', 'Age', 'Sales'],
  data: [
    ['Alfonso Bribiesca', 'alfonso@vexilo.com', 20, '$9,999.00'],
    ['Saida Redondo', 'saida@gmail.com', 20, '$124.00'],
  ],
}
