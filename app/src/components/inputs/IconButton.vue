<script setup lang="ts">
import type {RouteLocationRaw} from 'vue-router';
import ButtonOrLink from './ButtonOrLink.vue';

defineProps<{
  href?: RouteLocationRaw
  icon: string,
}>();

const emit = defineEmits<{
  (event: 'click', e: MouseEvent): void
}>();
</script>

<template>
  <ButtonOrLink :href="href" @click="e => emit('click', e)"
    class="text-xl text-slate-400 hover:text-slate-200 transition-colors duration-150">
    <font-awesome-icon :icon="icon" />
  </ButtonOrLink>
</template>
