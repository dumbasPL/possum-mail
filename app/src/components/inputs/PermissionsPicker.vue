<script setup lang="ts">
import {permissionValues, permissions} from '@/util/permissions';
import {useTranslation} from 'i18next-vue';
import {computed, inject} from 'vue';
import MultiselectInput from './MultiselectInput.vue';

const {t} = useTranslation();

const savingForm = inject<boolean>('savingForm');

const props = withDefaults(defineProps<{
  modelValue?: number,
  label?: string | null,
  icon?: string,
  disabled?: boolean,
}>(), {
  modelValue: 0,
});

const emit = defineEmits<{
  (event: 'update:modelValue', value: typeof props.modelValue): void
}>();

const value = computed({
  get() {
    return permissionValues.filter(val => (props.modelValue & val) == val);
  },
  set(value) {
    emit('update:modelValue', value.reduce((perms, perm) => perms | +perm, 0));
  },
});

const permissionsTranslated = computed(() => {
  return Object.fromEntries(Object.entries(permissions).map(([k, v]) => [k, t(`permissions.${v}`)]));
});

</script>

<template>
  <label class="block w-full mb-2">
    <span v-if="props.label" class="first-letter:uppercase block">{{props.label}}</span>
    <div class="group relative" :class="{'mt-1': props.label}">
      <font-awesome-icon v-if="icon" :icon="icon" :class="{'group-focus-within:text-primary-400': !props.disabled && !savingForm}"
        class="absolute left-3 top-1/2 -mt-2 text-base z-[1] pointer-events-none"/>
      <MultiselectInput v-model="value" mode="tags" :class="{'has-icon': icon}"
        :options="permissionsTranslated" :disabled="props.disabled || savingForm" v-bind="$attrs"/>
    </div>
  </label>
</template>
