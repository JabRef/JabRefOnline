import {
  TAlert,
  TButton,
  TCheckbox,
  TDropdown,
  TInput,
  TInputGroup,
  TSelect,
  TTag,
  TTextarea,
  variantJS,
  VariantJSConfiguration,
} from '@variantjs/vue'
import TTable from '~/components/TTable.vue'

const settings: VariantJSConfiguration = {
  TInput: {
    fixedClasses:
      'transition duration-100 ease-in-out border rounded shadow-sm focus:ring-2 focus:ring-highlight-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed py-2 px-3',
    classes:
      'block w-full text-black sm:text-sm placeholder-gray-400 bg-white border-gray-300 focus:border-highlight-500',
    variants: {
      error: {
        classes:
          'block w-full sm:text-sm border-error-300 bg-error-50 placeholder-error-200 text-error-900',
      },
      success: {
        classes:
          'block w-full sm:text-sm border-success-300 bg-success-50 placeholder-gray-400 text-success-900',
      },
      plain: {
        classes:
          'shadow-none placeholder-gray-400 bg-transparent border-transparent focus:bg-white focus:border-highlight-500 hover:bg-gray-50 hover:border-gray-300',
      },
    },
  },
  TTextarea: {
    fixedClasses:
      'block w-full px-3 py-2 transition duration-100 ease-in-out border rounded shadow-sm focus:ring-2 focus:ring-highlight-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
    classes:
      'text-black placeholder-gray-400 bg-white border-gray-300 focus:border-highlight-500 ',
    variants: {
      plain: {
        classes:
          'shadow-none placeholder-gray-400 bg-transparent border-transparent focus:bg-white focus:border-highlight-500 hover:bg-gray-50 hover:border-gray-300',
      },
    },
  },
  TCheckbox: {
    fixedClasses:
      'transition duration-100 ease-in-out rounded shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-highlight-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed',
    classes: 'text-primary-500 border-gray-300 ',
    variants: {
      error: {
        classes: 'text-error-500 border-error-300',
      },
      success: {
        classes: 'text-success-500 border-success-300',
      },
    },
  },
  TButton: {
    fixedClasses:
      'block transition duration-100 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none',
    classes:
      'px-4 py-2 focus:border-highlight focus:ring-2 focus:ring-highlight-500 focus:ring-opacity-50 text-white bg-primary-500 border border-transparent shadow-sm rounded hover:bg-highlight-600',
    variants: {
      secondary: {
        classes:
          'px-4 py-2 focus:border-highlight focus:ring-2 focus:ring-highlight-500 focus:ring-opacity-50 text-gray-800 bg-white border border-gray-300 shadow-sm hover:text-gray-600',
      },
      error: {
        classes:
          'px-4 py-2 focus:border-highlight-500 focus:ring-2 focus:ring-highlight-500 focus:ring-opacity-50 text-white bg-error-500 border border-transparent rounded shadow-sm hover:bg-error-600',
      },
      success: {
        classes:
          'px-4 py-2 focus:border-highlight-500 focus:ring-2 focus:ring-highlight-500 focus:ring-opacity-50 text-white bg-success-500 border border-transparent rounded shadow-sm hover:bg-green-600',
      },
      link: {
        classes: 'text-primary-500 underline hover:text-highlight-600',
      },
      linkplain: {
        classes: 'hover:text-highlight-600',
      },
    },
  },
  TInputGroup: {
    fixedClasses: {
      wrapper: '',
      label: 'block text-sm text-gray-700',
      body: 'mt-1',
      feedback: ' text-sm text-sm mt-1',
      description: 'text-gray-400 text-sm',
    },
    classes: {
      wrapper: '',
      label: '',
      body: '',
      feedback: 'text-gray-400',
      description: 'text-gray-400',
    },
    variants: {
      error: {
        classes: {
          label: 'text-error-500',
          feedback: 'text-error-500',
        },
      },
      success: {
        classes: {
          label: 'text-success-500',
          feedback: 'text-success-500',
        },
      },
      important: {
        classes: {
          label: 'font-semibold',
          feedback: 'text-gray-800',
        },
      },
    },
  },
  TAlert: {
    fixedClasses: {
      wrapper: 'relative flex items-center p-4 border-l-4  rounded shadow-sm',
      body: 'grow',
      close:
        'absolute relative flex items-center justify-center ml-4 shrink-0 w-6 h-6 transition duration-100 ease-in-out rounded focus:ring-2 focus:ring-highlight-500 focus:outline-none focus:ring-opacity-50',
      closeIcon: 'fill-current h-4 w-4',
    },
    classes: {
      wrapper: 'bg-primary-50 border-primary-500',
      body: 'text-primary-700',
      close: 'text-primary-500 hover:bg-highlight-200',
    },
    variants: {
      error: {
        classes: {
          wrapper: 'bg-error-50 border-error-500',
          body: 'text-error-700',
          close: 'text-error-500 hover:bg-error-200',
        },
      },
      success: {
        classes: {
          wrapper: 'bg-success-50 border-success-500',
          body: 'text-success-700',
          close: 'text-success-500 hover:bg-success-200',
        },
      },
    },
  },
  TDropdown: {
    fixedClasses: {
      trigger:
        'flex items-center text-white block px-4 py-2 transition duration-100 ease-in-out border border-transparent rounded shadow-sm focus:border-highlight-500 focus:ring-2 focus:ring-highlight-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
      wrapper: 'inline-flex flex-col',
      dropdownWrapper: 'relative z-10',
      dropdown: 'absolute rounded shadow mt-1',
      enterActiveClass:
        'transition ease-out duration-100 transform opacity-0 scale-95',
      enterToClass: 'transform opacity-100 scale-100',
      leaveClass: 'transition ease-in transform opacity-100 scale-100',
      leaveToClass: 'transform opacity-0 scale-95 duration-75',
    },
    classes: {
      trigger: 'bg-primary-500 hover:bg-highlight-600',
      dropdown: 'bg-white origin-top-left left-0',
    },
    variants: {
      left: {
        classes: {
          dropdown: 'bg-white origin-top-right right-0',
        },
      },
    },
  },
  TTag: {
    fixedClasses: '',
    classes: '',
    variants: {
      badge: {
        classes: 'inline-flex items-center px-2 rounded-lg',
      },
    },
  },
  TSelect: {
    fixedClasses:
      'bg-none block w-full py-2 pl-2 pr-6 transition duration-100 ease-in-out border rounded shadow-sm focus:ring-2 focus:ring-highlight-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
    classes:
      'text-black placeholder-gray-400 bg-white border-gray-300 focus:border-highlight-500 sm:text-sm',
    variants: {
      plain: {
        classes:
          'shadow-none placeholder-gray-400 bg-white border-transparent focus:bg-white focus:border-highlight-500 hover:bg-gray-50 hover:border-gray-300 cursor-pointer sm:text-sm',
      },
      plaincaps: {
        classes:
          'text-current shadow-none placeholder-gray-400 bg-white border-transparent focus:bg-white focus:border-highlight-500 hover:bg-gray-50 hover:border-gray-300 cursor-pointer uppercase text-gray-600 tracking-wider focus-within:text-black sm:text-xs',
      },
    },
  },
  TTable: {
    classes: {
      table:
        'min-w-full divide-y divide-gray-100 shadow-sm border-gray-200 border',
      thead: '',
      theadTr: '',
      theadTh: 'px-3 py-2 font-semibold text-left bg-gray-100 border-b',
      tbody: 'bg-white divide-y divide-gray-100',
      tr: '',
      td: 'px-3 py-2 whitespace-no-wrap',
      tfoot: '',
      tfootTr: '',
      tfootTd: '',
    },
    variants: {
      plain: {
        classes: {
          table: '',
          td: 'px-3 py-1 whitespace-no-wrap',
          tbody: 'bg-transparent',
        },
      },
    },
  },
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(variantJS, settings)
  nuxtApp.vueApp.component('t-input', TInput)
  nuxtApp.vueApp.component('t-checkbox', TCheckbox)
  nuxtApp.vueApp.component('t-button', TButton)
  nuxtApp.vueApp.component('t-input-group', TInputGroup)
  nuxtApp.vueApp.component('t-alert', TAlert)
  nuxtApp.vueApp.component('t-dropdown', TDropdown)
  nuxtApp.vueApp.component('t-tag', TTag)
  nuxtApp.vueApp.component('t-select', TSelect)
  nuxtApp.vueApp.component('t-textarea', TTextarea)
  nuxtApp.vueApp.component('t-table', TTable)
})
