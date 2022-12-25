<script setup lang="ts">
import {useTranslation} from 'i18next-vue';
import languages from '@/config/languages.json';

const {i18next} = useTranslation();

function changeLang(lang: string) {
  i18next.changeLanguage(lang);
}

</script>

<template>
  <span class="text-sm font-semibold">
    <a v-for="(name, lang) in languages" :key="lang"  @click.prevent="changeLang(lang)"
      class="px-1 py-2 my-2" :href="(i18next.resolvedLanguage == lang) ? undefined : '#'"
      :class="i18next.resolvedLanguage == lang ? 'cursor-default' : 'text-primary-500 hover:underline'">
      {{name}}
    </a>
  </span>
</template>
