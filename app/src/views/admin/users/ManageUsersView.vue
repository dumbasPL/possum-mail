<script setup lang="ts">
import {useUsersApi} from '@/api';
import AddButton from '@/components/inputs/AddButton.vue';
import UserCard from '@/components/settings/users/UserCard.vue';

const usersApi = useUsersApi();

const {data: users} = await usersApi.listUsers();

</script>

<template>
  <div class="w-full flex justify-between items-end mb-3">
    <h1 class="block text-xl text-slate-200 font-bold">{{$t('admin.manageUsers.title')}}</h1>
    <div>
      <AddButton :href="{name: 'manageUsersAddNew'}">{{$t('admin.manageUsers.newUser')}}</AddButton>
    </div>
  </div>

  <div class="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
    <UserCard v-for="user in users" :key="user.id" :user="user" />
  </div>
</template>
