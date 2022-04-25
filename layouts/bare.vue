<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="w-full space-y-8 -mt-20">
      <div>
        <slot name="header"></slot>
      </div>
      <div
        class="shadow-xl sm:rounded-md sm:overflow-hidden container mx-auto flex sm:flex-nowrap flex-wrap max-w-4xl bg-white"
      >
        <div
          class="w-5/12 overflow-hidden hidden md:flex px-5 pt-4 pb-14 items-center justify-start relative bg-primary-50"
        >
          <slot name="side"></slot>
          <div
            class="flex text-lg items-center md:justify-start justify-center absolute bottom-5"
          >
            <jabref-logo class="h-6 mr-3" /> JabRef
          </div>
        </div>
        <div class="w-full md:w-6/12 md:mx-auto md:py-8 mt-8 md:mt-0 px-5 py-4">
          <div class="px-4 py-5 space-y-6 sm:p-6">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
