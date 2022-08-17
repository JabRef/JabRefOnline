<template>
  <div class="flex flex-wrap">
    <div class="min-h-screen w-full flex flex-col">
      <header>
        <slot name="header">
          <NavBar />
        </slot>
      </header>
      <main class="relative h-full overflow-hidden">
        <div class="grow py-6 h-full">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
