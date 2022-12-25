<script setup lang="ts">
import {useUsersApi} from '@/api';
import CenterForm from '@/components/layout/CenterForm.vue';
import FormBox from '@/components/layout/FormBox.vue';
import EditUserForm from '@/components/settings/users/EditUserForm.vue';
import {ref} from 'vue';
import {useRouter} from 'vue-router';

const usersApi = useUsersApi();
const router = useRouter();

const props = defineProps<{
  userId: number,
}>();

const {data: userData} = await usersApi.getUserById(props.userId);

const model = ref({
  username: userData.name,
  password: '',
  permissions: userData.permissions,
});

const errorMessage = ref<string>();
const saving = ref(false);

async function saveUser() {
  try {
    errorMessage.value = undefined;
    saving.value = true;
    await usersApi.editUser(props.userId, {
      password: model.value.password || undefined,
      permissions: model.value.permissions,
    });
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
      <EditUserForm @submit="saveUser" is-edit v-model="model" :saving="saving" :error-message="errorMessage"
        :title="$t('editUser.editUser.title')" :button-text="$t('editUser.editUser.button')" />
    </FormBox>
  </CenterForm>
</template>
