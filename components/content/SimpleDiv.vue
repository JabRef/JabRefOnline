<template>
  <div>
    <ContentSlot
      :use="$slots.default"
      unwrap="p"
    />
  </div>
</template>
