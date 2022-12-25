<script setup lang="ts">
const props = defineProps<{
  class?: string,
}>();
</script>

<template>
  <div class="w-full flex justify-center">
    <div class="flex-1 max-w-sm flex flex-col gap-8" :class="props.class">
      <slot></slot>
    </div>
  </div>
</template>
