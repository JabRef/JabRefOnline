import type { Meta, StoryFn } from '@storybook/vue3'

export default {
  title: 'UI/UTable',
  component: 'UTable',
  argTypes: {
    loading: {
      control: 'boolean'
    },
    empty: {
      control: 'boolean'
    }
  }
} as Meta

const Template: StoryFn = (args) => ({
  setup() {
    return { args }
  },
  template: '<UTable v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
  columns: [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'age', label: 'Age' },
    { key: 'sales', label: 'Sales' }
  ],
  rows: [
    { name: 'Alfonso Bribiesca', email: 'alfonso@vexilo.com', age: 20, sales: '$9,999.00' },
    { name: 'Saida Redondo', email: 'saida@gmail.com', age: 22, sales: '$124.00' },
    { name: 'John Doe', email: 'john@example.com', age: 25, sales: '$1,500.00' }
  ]
}

export const WithActions = () => ({
  setup() {
    const columns = [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'actions', label: 'Actions' }
    ]
    
    const rows = [
      { id: 1, name: 'Alfonso Bribiesca', email: 'alfonso@vexilo.com' },
      { id: 2, name: 'Saida Redondo', email: 'saida@gmail.com' },
      { id: 3, name: 'John Doe', email: 'john@example.com' }
    ]
    
    const actions = [
      [{
        label: 'Edit',
        icon: 'heroicons:pencil-square-20-solid',
        click: (row: any) => console.log('Edit', row)
      }],
      [{
        label: 'Delete',
        icon: 'heroicons:trash-20-solid',
        click: (row: any) => console.log('Delete', row)
      }]
    ]
    
    return { columns, rows, actions }
  },
  template: `
    <UTable 
      :columns="columns" 
      :rows="rows"
    >
      <template #actions-data="{ row }">
        <UDropdown :items="actions">
          <UButton variant="ghost" icon="heroicons:ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
  `
})

export const Selectable = () => ({
  setup() {
    const columns = [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' }
    ]
    
    const rows = [
      { id: 1, name: 'Alfonso Bribiesca', email: 'alfonso@vexilo.com', role: 'Admin' },
      { id: 2, name: 'Saida Redondo', email: 'saida@gmail.com', role: 'User' },
      { id: 3, name: 'John Doe', email: 'john@example.com', role: 'User' }
    ]
    
    return { columns, rows }
  },
  template: `
    <UTable 
      :columns="columns" 
      :rows="rows"
      :model-value="[]"
    />
  `
})

export const Loading = Template.bind({})
Loading.args = {
  columns: [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' }
  ],
  loading: true
}

export const Empty = Template.bind({})
Empty.args = {
  columns: [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' }
  ],
  rows: []
}

export const Sortable = () => ({
  setup() {
    const columns = [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'email', label: 'Email', sortable: true },
      { key: 'age', label: 'Age', sortable: true },
      { key: 'sales', label: 'Sales', sortable: true }
    ]
    
    const rows = [
      { name: 'Alfonso Bribiesca', email: 'alfonso@vexilo.com', age: 20, sales: 9999 },
      { name: 'Saida Redondo', email: 'saida@gmail.com', age: 22, sales: 124 },
      { name: 'John Doe', email: 'john@example.com', age: 25, sales: 1500 }
    ]
    
    return { columns, rows }
  },
  template: `
    <UTable 
      :columns="columns" 
      :rows="rows"
      sort-mode="manual"
    />
  `
})