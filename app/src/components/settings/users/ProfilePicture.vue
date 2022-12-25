<script setup lang="ts">

const props = defineProps<{
  name: string,
}>();

</script>

<template>
  <div class="bg-blue-500 text-white w-16 h-16 rounded-full text-center text-4xl leading-[4rem] select-none">
    {{props.name[0].toUpperCase()}}
  </div>
</template>
