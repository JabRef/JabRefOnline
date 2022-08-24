<template>
  <div>
    <Markdown
      :use="$slots.default"
      unwrap="p"
    />
  </div>
</template>
