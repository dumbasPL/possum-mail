<script setup lang="ts">
import {useUsersApi} from '@/api';
import CenterForm from '@/components/layout/CenterForm.vue';
import FormBox from '@/components/layout/FormBox.vue';
import EditUserForm from '@/components/settings/users/EditUserForm.vue';
import type {CreateUserModel} from 'api-client';
import {Permissions} from 'shared-types';
import {ref} from 'vue';
import {useRouter} from 'vue-router';

const usersApi = useUsersApi();
const router = useRouter();

const model = ref<CreateUserModel>({
  username: '',
  password: '',
  permissions: Permissions.Active,
});

const errorMessage = ref<string>();
const saving = ref(false);

async function addUser() {
  try {
    errorMessage.value = undefined;
    saving.value = true;
    await usersApi.createUser(model.value);
    router.push({name: 'manageUsers'});
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : `${error}`;
  } finally {
    saving.value = false;
  }
}

</script>

<template>
  <CenterForm>
    <FormBox>
      <EditUserForm @submit="addUser" v-model="model" :saving="saving" :error-message="errorMessage"
        :title="$t('editUser.addNewUser.title')" :button-text="$t('editUser.addNewUser.button')"/>
    </FormBox>
  </CenterForm>
</template>
