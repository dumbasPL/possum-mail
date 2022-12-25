<script setup lang="ts">
import {RouterLink, type RouteLocationRaw} from 'vue-router';

defineProps<{
  href?: RouteLocationRaw,
}>();

const emit = defineEmits<{
  (event: 'click', e: MouseEvent): void
}>();
</script>

<template>
  <component :is="href ? RouterLink : 'button'" :to="href" @click="(e: MouseEvent) => emit('click', e)">
    <slot></slot>
  </component>
</template>
