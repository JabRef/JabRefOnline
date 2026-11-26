<template>
  <div class="flex flex-wrap">
    <SideBar />

    <div class="min-h-screen w-full pl-64 flex flex-col">
      <NavBar :show-user-profile="true">
        <div class="space-x-14">
          <span class="text-primary text-lg font-semibold">Library</span>
          <span class="text-dimmed text-lg font-semibold">Browse</span>
          <div class="inline">
            <span class="text-dimmed text-lg font-semibold">
              Subscriptions
            </span>
            <div class="inline-block align-top pl-0.5 -mt-1">
              <Icon
                name="ri:checkbox-blank-circle-fill"
                class="text-primary text-xs"
              />
            </div>
          </div>
        </div>
      </NavBar>
      <div class="relative h-full overflow-hidden">
        <div class="bg-muted grow p-6 h-full">
          <slot />
        </div>
        <DetailPane />
      </div>
    </div>
  </div>
</template>
