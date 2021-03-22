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
} from 'vue-tailwind/dist/components'

const settings = {
  't-input': {
    component: TInput,
    props: {
      fixedClasses:
        'block w-full sm:text-sm transition duration-100 ease-in-out border rounded shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
      classes:
        'text-black placeholder-gray-400 bg-white border-gray-300 focus:border-blue-500 ',
      variants: {
        danger: 'border-red-300 bg-red-50 placeholder-red-200 text-red-900',
        success:
          'border-green-300 bg-green-50 placeholder-gray-400 text-green-900',
      },
    },
  },
  't-checkbox': {
    component: TCheckbox,
    props: {
      fixedClasses:
        'transition duration-100 ease-in-out rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed',
      classes: 'text-blue-500 border-gray-300 ',
      variants: {
        error: 'text-red-500 border-red-300',
        success: 'text-green-500 border-green-300',
      },
    },
  },
  't-button': {
    component: TButton,
    props: {
      fixedClasses:
        'block transition duration-100 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none',
      classes:
        'px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white bg-blue-500 border border-transparent shadow-sm rounded hover:bg-blue-600',
      variants: {
        secondary:
          'px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-gray-800 bg-white border border-gray-300 shadow-sm hover:text-gray-600',
        error:
          'px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white bg-red-500 border border-transparent rounded shadow-sm hover:bg-red-600',
        success:
          'px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white bg-green-500 border border-transparent rounded shadow-sm hover:bg-green-600',
        link: 'text-blue-500 underline hover:text-blue-600',
        linkplain: 'hover:text-blue-600',
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
        danger: {
          label: 'text-red-500',
          feedback: 'text-red-500',
        },
        success: {
          label: 'text-green-500',
          feedback: 'text-green-500',
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
          'absolute relative flex items-center justify-center ml-4 flex-shrink-0 w-6 h-6 transition duration-100 ease-in-out rounded  focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
        closeIcon: 'fill-current h-4 w-4',
      },
      classes: {
        wrapper: 'bg-blue-50 border-blue-500',
        body: 'text-blue-700',
        close: 'text-blue-500 hover:bg-blue-200',
      },
      variants: {
        error: {
          wrapper: 'bg-red-50 border-red-500',
          body: 'text-red-700',
          close: 'text-red-500 hover:bg-red-200',
        },
        success: {
          wrapper: 'bg-green-50 border-green-500',
          body: 'text-green-700',
          close: 'text-green-500 hover:bg-green-200',
        },
      },
    },
  },
  't-nuxtlink': {
    // TButton has builtin support for NuxtLink, so we just reuse it
    component: TButton,
    props: {
      tagName: 'a',
      classes: 'text-blue-500 hover:text-blue-600',
    },
  },
  't-dropdown': {
    component: TDropdown,
    props: {
      fixedClasses: {
        button:
          'flex items-center text-white block px-4 py-2 transition duration-100 ease-in-out border border-transparent rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
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
        button: 'bg-blue-500 hover:bg-blue-600',
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
}

Vue.use(VueTailwind, settings)
