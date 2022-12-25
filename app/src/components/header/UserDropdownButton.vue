<script setup lang="ts">
import type {RouteLocationRaw} from 'vue-router';
import ButtonOrLink from '../inputs/ButtonOrLink.vue';


const props = defineProps<{
  icon?: string,
  href?: RouteLocationRaw,
}>();

const emit = defineEmits<{
  (event: 'click', e: MouseEvent): void,
}>();


</script>

<template>
  <ButtonOrLink :href="props.href" @click="(e: MouseEvent) => emit('click', e)"
    class="block whitespace-nowrap py-2 px-3 rounded-md text-slate-200 text-left
      hover:bg-slate-500 hover:text-white transition-colors duration-150">
    <font-awesome-icon v-if="props.icon" :icon="props.icon" class="mr-2"/>
    <span v-else class="h-4 aspect-[18/16] mr-2 inline-block"><!-- icon placeholder --></span>
    <slot></slot>
  </ButtonOrLink>
</template>
