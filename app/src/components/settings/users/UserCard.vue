<script setup lang="ts">
import TagBadge from '@/components/util/TagBadge.vue';
import ProfilePicture from './ProfilePicture.vue';
import IconButton from '@/components/inputs/IconButton.vue';
import type {UserDto} from 'api-client';
import {computed} from 'vue';
import {decodePermissions} from '@/util/permissions';

const props = defineProps<{
  user: UserDto,
}>();

const permissions = computed(() => decodePermissions(props.user.permissions));

</script>

<template>
  <div class="bg-slate-600 rounded-3xl p-5 flex highlight-white/10">
    <ProfilePicture :name="user.name" class="flex-shrink-0" />
    <div class="ml-4 flex-grow">
      <div class="text-slate-200 text-2xl">{{user.name}}</div>
      <div class="flex gap-1">
        <TagBadge v-for="perm in permissions" :key="perm" :text="$t(`permissions.${perm}`)" />
      </div>
    </div>
    <div class="flex items-center mr-2">
      <IconButton icon="fa-solid fa-user-pen" v-tooltip="$t('admin.editUser')"
        :href="{name: 'manageUsersEdit', params: {id: user.id}}"/>
    </div>
  </div>
</template>
