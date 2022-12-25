<script setup lang="ts">
import {onErrorCaptured, ref, watch} from 'vue';
import {useRoute} from 'vue-router';

const errorMessage = ref<Error>();
const route = useRoute();

onErrorCaptured(error => {
  console.error(error);
  errorMessage.value = error;
  return false;
});

watch(route, () => {
  errorMessage.value = undefined;
});
</script>

<template>
  <div v-if="errorMessage" class="bg-red-900 border-2 border-red-700 rounded-xl p-3 text-slate-200 flex">
    <div class="text-4xl mr-2">
      <font-awesome-icon icon="fa-solid fa-bug"/>
    </div>
    <div>
      <div class="text-xl mb-1 font-semibold leading-none">
        {{$t('errorMessage.unexpectedError', {defaultValue: 'Unexpected error'})}}
      </div>
      <pre v-if="!errorMessage.stack?.startsWith('Error: ' + errorMessage.message) ?? false">Error: {{errorMessage.message}}</pre>
      <pre>{{errorMessage.stack ?? errorMessage.message}}</pre>
    </div>
  </div>
  <slot v-else></slot>
</template>
