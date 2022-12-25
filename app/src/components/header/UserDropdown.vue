<script setup lang="ts">
import {useUserStore} from '@/stores/userStore';
import {useRouter} from 'vue-router';
import UserDropdownButton from './UserDropdownButton.vue';

const userStore = useUserStore();
const router = useRouter();

function logout() {
  userStore.logout();
  router.push({name: 'login'});
}

</script>

<template>
  <button class="relative group">
    <font-awesome-icon icon="fa-solid fa-user" class="mr-1.5" />
    {{userStore.user?.name}}
    <font-awesome-icon icon="fa-solid fa-chevron-down" class="ml-1.5" />

    <div class="absolute bg-slate-700 right-0 top-8 rounded-lg p-2 highlight-white/10 flex-col gap-1 hidden group-focus-within:flex">
      <UserDropdownButton icon="fa-solid fa-gear" :href="{name: 'currentUserSettings'}">{{$t('userDropdown.settings')}}</UserDropdownButton>
      <UserDropdownButton icon="fa-solid fa-arrow-right-from-bracket" @click="logout">{{$t('userDropdown.logout')}}</UserDropdownButton>
    </div>
  </button>
</template>
