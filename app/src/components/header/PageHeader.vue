<script setup lang="ts">
import UserDropdown from './UserDropdown.vue';
import config from '@/config/index.json';
import IconButton from '../inputs/IconButton.vue';
import {computed} from 'vue';

const props = withDefaults(defineProps<{
  modelValue: boolean | null,
}>(), {
  modelValue: null,
});

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>();

const sidebarExists = computed(() => typeof props.modelValue == 'boolean');

function toggleSidebar() {
  emit('update:modelValue', !props.modelValue);
}

</script>

<template>
  <header class="sticky top-0 z-40 bg-primary-900 text-white flex justify-between items-center">
    <IconButton v-if="sidebarExists" @click="toggleSidebar" icon="fa-solid fa-bars"
      class="inline-block h-full w-14" :class="{'text-white': modelValue}"/>
    <h1 class="text-xl block flex-grow text-left py-2.5" :class="{'pl-4': !sidebarExists}">
      <RouterLink :to="{name: 'home'}">{{config.name}}</RouterLink>
    </h1>
    <UserDropdown class="px-4 py-2.5" />
  </header>
</template>
