<script setup lang="ts">
import type {RouteLocationRaw} from 'vue-router';
import ButtonInput from './ButtonInput.vue';

const props = defineProps<{
  icon?: string,
  href?: RouteLocationRaw,
}>();

const emit = defineEmits<{
  (event: 'click', e: MouseEvent): void
}>();
</script>
<template>
  <ButtonInput :icon="icon" :href="props.href" class="!bg-green-600 hover:!bg-green-500" @click="e => emit('click', e)">
    <slot>{{$t('addNew')}}</slot>
  </ButtonInput>
</template>
