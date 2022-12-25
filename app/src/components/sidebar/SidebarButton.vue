<script setup lang="ts">
import {inject, ref, watch} from 'vue';
import type {RouteLocationRaw} from 'vue-router';
import ButtonOrLink from '../inputs/ButtonOrLink.vue';
import {labelsHiddenKey} from './injectionKeys';

const props = defineProps<{
  icon: string,
  href?: RouteLocationRaw,
  text?: string | null,
}>();

const emit = defineEmits<{
  (event: 'click', e: MouseEvent): void,
}>();

const labelsHidden = inject(labelsHiddenKey);

const srOnly = ref(labelsHidden?.value);
watch(() => labelsHidden?.value ?? false, val => {
  if (!val) {
    srOnly.value = val;
  }
});

</script>

<template>
  <ButtonOrLink :href="props.href" @click="(e: MouseEvent) => emit('click', e)" active-class="bg-slate-600 text-slate-200 highlight-white/5"
    class="block whitespace-nowrap rounded-md text-slate-400 text-left clear-both
      hover:bg-slate-500 hover:text-slate-200 transition-colors duration-150">
    <div class="inline-flex w-10 h-10 justify-center items-center float-left"
      v-tooltip.right="{content: text, disabled: !labelsHidden || !text}">
      <font-awesome-icon :icon="props.icon"/>
    </div>
    <div class="transition-opacity duration-300 overflow-hidden h-10 flex items-center"
      :class="{'opacity-0': labelsHidden, 'sr-only': srOnly}" @transitionend="(srOnly = labelsHidden ?? false)">
      {{text}}
    </div>
  </ButtonOrLink>
</template>
