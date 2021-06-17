import Vue from 'vue'
import VueTailwind from 'vue-tailwind'
import {
  TInput,
  TCheckbox,
  TButton,
  TInputGroup,
  TAlert,
  TDropdown,
  TTag,
  TSelect,
  TTextarea,
} from 'vue-tailwind/dist/components'

const settings = {
  't-input': {
    component: TInput,
    props: {
      fixedClasses:
        'block w-full transition duration-100 ease-in-out border rounded shadow-sm focus:ring-2 focus:ring-highlight-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
      classes:
        'text-black sm:text-sm placeholder-gray-400 bg-white border-gray-300 focus:border-highlight-500',
      variants: {
        error:
          'sm:text-sm border-error-300 bg-error-50 placeholder-error-200 text-error-900',
        success:
          'sm:text-sm border-success-300 bg-success-50 placeholder-gray-400 text-success-900',
        plain:
          'shadow-none placeholder-gray-400 bg-white border-transparent focus:bg-white focus:border-highlight-500 hover:bg-gray-50 hover:border-gray-300',
      },
    },
  },
  't-textarea': {
    component: TTextarea,
    props: {
      fixedClasses:
        'block w-full px-3 py-2 transition duration-100 ease-in-out border rounded shadow-sm focus:ring-2 focus:ring-highlight-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
      classes:
        'text-black placeholder-gray-400 bg-white border-gray-300 focus:border-highlight-500 ',
      variants: {
        plain:
          'shadow-none placeholder-gray-400 bg-white border-transparent focus:bg-white focus:border-highlight-500 hover:bg-gray-50 hover:border-gray-300',
      },
    },
  },
  't-checkbox': {
    component: TCheckbox,
    props: {
      fixedClasses:
        'transition duration-100 ease-in-out rounded shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-highlight-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed',
      classes: 'text-primary-500 border-gray-300 ',
      variants: {
        error: 'text-error-500 border-error-300',
        success: 'text-success-500 border-success-300',
      },
    },
  },
  't-button': {
    component: TButton,
    props: {
      fixedClasses:
        'block transition duration-100 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none',
      classes:
        'px-4 py-2 focus:border-highlight focus:ring-2 focus:ring-highlight-500 focus:ring-opacity-50 text-white bg-primary-500 border border-transparent shadow-sm rounded hover:bg-highlight-600',
      variants: {
        secondary:
          'px-4 py-2 focus:border-highlight focus:ring-2 focus:ring-highlight-500 focus:ring-opacity-50 text-gray-800 bg-white border border-gray-300 shadow-sm hover:text-gray-600',
        error:
          'px-4 py-2 focus:border-highlight-500 focus:ring-2 focus:ring-highlight-500 focus:ring-opacity-50 text-white bg-error-500 border border-transparent rounded shadow-sm hover:bg-error-600',
        success:
          'px-4 py-2 focus:border-highlight-500 focus:ring-2 focus:ring-highlight-500 focus:ring-opacity-50 text-white bg-success-500 border border-transparent rounded shadow-sm hover:bg-green-600',
        link: 'text-primary-500 underline hover:text-highlight-600',
        linkplain: 'hover:text-highlight-600',
      },
    },
  },
  't-input-group': {
    component: TInputGroup,
    props: {
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
          label: 'text-error-500',
          feedback: 'text-error-500',
        },
        success: {
          label: 'text-success-500',
          feedback: 'text-success-500',
        },
        important: {
          label: 'font-semibold',
        },
      },
    },
  },
  't-alert': {
    component: TAlert,
    props: {
      fixedClasses: {
        wrapper: 'relative flex items-center p-4 border-l-4  rounded shadow-sm',
        body: 'flex-grow',
        close:
          'absolute relative flex items-center justify-center ml-4 flex-shrink-0 w-6 h-6 transition duration-100 ease-in-out rounded  focus:ring-2 focus:ring-highlight-500 focus:outline-none focus:ring-opacity-50',
        closeIcon: 'fill-current h-4 w-4',
      },
      classes: {
        wrapper: 'bg-primary-50 border-primary-500',
        body: 'text-primary-700',
        close: 'text-primary-500 hover:bg-highlight-200',
      },
      variants: {
        error: {
          wrapper: 'bg-error-50 border-error-500',
          body: 'text-error-700',
          close: 'text-error-500 hover:bg-error-200',
        },
        success: {
          wrapper: 'bg-success-50 border-success-500',
          body: 'text-success-700',
          close: 'text-success-500 hover:bg-success-200',
        },
      },
    },
  },
  't-nuxtlink': {
    // TButton has builtin support for NuxtLink, so we just reuse it
    component: TButton,
    props: {
      tagName: 'a',
      classes: 'text-primary-500 hover:text-highlight-600',
    },
  },
  't-dropdown': {
    component: TDropdown,
    props: {
      fixedClasses: {
        button:
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
        button: 'bg-primary-500 hover:bg-highlight-600',
        dropdown: 'bg-white origin-top-left left-0',
      },
      variants: {
        left: {
          dropdown: 'bg-white origin-top-right right-0',
        },
      },
    },
  },
  't-tag': {
    component: TTag,
    props: {
      fixedClasses: '',
      classes: '',
      variants: {
        badge: 'inline-flex items-center px-2 rounded-lg',
      },
    },
  },
  't-select': {
    component: TSelect,
    props: {
      wrapped: true,
      fixedClasses: {
        wrapper: 'relative inline-block text-left',
        input:
          'bg-none block w-full py-2 pl-3 pr-6 transition duration-100 ease-in-out border rounded shadow-sm focus:ring-2 focus:ring-highlight-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed sm:text-sm',
        arrowWrapper:
          'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2',
        arrow: 'fill-current h-4 w-4',
      },
      classes: {
        wrapper: '',
        input:
          'text-black placeholder-gray-400 bg-white border-gray-300 focus:border-highlight-500',
        arrowWrapper: 'text-gray-700',
        arrow: '',
      },
      variants: {
        plain: {
          input:
            'shadow-none placeholder-gray-400 bg-white border-transparent focus:bg-white focus:border-highlight-500 hover:bg-gray-50 hover:border-gray-300 cursor-pointer',
          arrowWrapper: 'text-current',
        },
      },
    },
  },
}

Vue.use(VueTailwind, settings)
