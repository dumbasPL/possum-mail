<script setup lang="ts">
import languages from '@/config/languages.json';
import {useTranslation} from 'i18next-vue';
import {computed} from 'vue';
import MultiselectInput from './MultiselectInput.vue';

const {i18next} = useTranslation();

const props = defineProps<{
  label?: string | null,
}>();

const value = computed({
  get() {
    return i18next.resolvedLanguage;
  },
  set(value) {
    if (value) {
      i18next.changeLanguage(value);
    }
  },
});

</script>

<template>
  <label class="block w-full mb-2">
    <span v-if="props.label" class="first-letter:uppercase block">{{props.label}}</span>
    <div class="group relative" :class="{'mt-1': props.label}">
      <font-awesome-icon icon="fa-solid fa-globe" class="absolute left-3 top-1/2 -mt-2
        text-base z-[1] pointer-events-none group-focus-within:text-primary-400"/>
      <MultiselectInput v-model="value" mode="single" class="has-icon"
        :options="languages" :canDeselect="false" :canClear="false"/>
    </div>
  </label>
</template>
