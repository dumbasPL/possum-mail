<script setup lang="ts">
import {computed, inject} from 'vue';

const savingForm = inject<boolean>('savingForm');

const props = withDefaults(defineProps<{
  modelValue?: string,
  label?: string | null,
  name?: string | null,
  placeholder?: string | null,
  type?: 'text' | 'email' | 'url' | 'password' | 'number' | 'search' | 'tel',
  icon?: string,
  autocomplete?: string | null,
  disabled?: boolean,
  required?: boolean,
  readonly?: boolean,
}>(), {
  type: 'text',
});

const emit = defineEmits<{
  (event: 'update:modelValue', value: typeof props.modelValue): void
}>();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

</script>

<template>
  <label class="block w-full mb-2">
    <span v-if="props.label" class="first-letter:uppercase block">{{props.label}}</span>
    <div class="group relative" :class="{'mt-1': props.label}">
      <font-awesome-icon v-if="icon" :icon="icon" class="absolute left-3 top-1/2 -mt-2 text-base group-focus-within:text-primary-400 pointer-events-none"/>
      <input v-model="value" :name="(name ?? undefined)" :type="props.type" :placeholder="(placeholder ?? undefined)" :required="required" :readonly="readonly"
        :autocomplete="(autocomplete ?? undefined)" v-bind="$attrs" :disabled="props.disabled || savingForm" :class="icon ? 'pl-9' : 'pl-3'"
        class="block w-full rounded-md bg-slate-700 highlight-white/5 border-transparent group-focus-within:outline
        autofill:!bg-slate-700 autofill:!bg-none outline-primary-500 outline-2 placeholder:text-slate-500 py-2
          disabled:cursor-not-allowed disabled:opacity-75 read-only:cursor-not-allowed" >
    </div>
  </label>
</template>
