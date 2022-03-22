<template>
  <div class="flex flex-wrap">
    <SideBar />

    <div class="min-h-screen w-full pl-64 flex flex-col">
      <NavBar />
      <div class="relative h-full overflow-hidden">
        <div class="bg-gray-50 grow p-6 h-full">
          <Nuxt />
        </div>
        <DetailPane />
      </div>
    </div>
  </div>
</template>
