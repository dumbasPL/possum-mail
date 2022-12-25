<script setup lang="ts">
import {inject} from 'vue';
import ButtonInput from '@/components/inputs/ButtonInput.vue';

const savingForm = inject<boolean>('savingForm');

withDefaults(defineProps<{
  type: 'submit' | 'reset' | 'button',
  icon?: string
  disabled?: boolean,
}>(), {
  type: 'button',
});

const emit = defineEmits<{
  (event: 'click', e: MouseEvent): void
}>();
</script>

<template>
  <ButtonInput :type="type" :icon="icon" :disabled="disabled || savingForm" @click="e => emit('click', e)"><slot></slot></ButtonInput>
</template>
