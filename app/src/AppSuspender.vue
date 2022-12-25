<script setup lang="ts">
import App from './App.vue';
import PingPreloader from './components/util/PingPreloader.vue';
</script>

<template>
  <Suspense timeout="200">
    <template #default>
      <App />
    </template>
    <template #fallback>
      <PingPreloader />
    </template>
  </Suspense>
</template>
