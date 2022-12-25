<script setup lang="ts">
defineProps<{
  text: string
}>();
</script>

<template>
  <div class="bg-primary-500 text-white text-sm font-semibold py-0.5 px-2 rounded whitespace-nowrap">{{text}}</div>
</template>
