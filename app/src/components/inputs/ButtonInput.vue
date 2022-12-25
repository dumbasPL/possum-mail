<script setup lang="ts">
import type {RouteLocationRaw} from 'vue-router';
import ButtonOrLink from './ButtonOrLink.vue';

withDefaults(defineProps<{
  type?: 'submit' | 'reset' | 'button',
  icon?: string
  disabled?: boolean,
  href?: RouteLocationRaw,
}>(), {
  type: 'button',
});

const emit = defineEmits<{
  (event: 'click', e: MouseEvent): void
}>();
</script>

<template>
  <ButtonOrLink :href="href" :type="type" @click="(e: MouseEvent) => emit('click', e)" :disabled="disabled"
    class="inline-flex items-center justify-center text-center bg-primary-500 highlight-white/10 transition-colors duration-150
      text-white rounded-md px-3 py-2 disabled:opacity-75 disabled:cursor-not-allowed hover:bg-primary-400">
    <slot></slot>
  </ButtonOrLink>
</template>
