<script setup lang="ts">
import {useUserStore} from '@/stores/userStore';
import {useTranslation} from 'i18next-vue';
import {reactive, ref} from 'vue';
import FormButton from '../../inputs/FormButton.vue';
import FormWrapper from '../../inputs/FormWrapper.vue';
import TextInput from '../../inputs/TextInput.vue';

const {t} = useTranslation();
const userStore = useUserStore();

const model = reactive({
  currentPassword: '',
  newPassword: '',
  newPassword2: '',
});

// we nee to force the form to re-render for the browser to show the update password dialog.
// We use a counter as key that increments on every successful api call to force it
const changed = ref(0);
const errorMessage = ref<null | string>(null);
const successMessage = ref<null | string>(null);
const saving = ref(false);

async function changePassword() {
  try {
    saving.value = true;
    errorMessage.value = null;

    if (model.newPassword != model.newPassword2) {
      throw new Error(t('updatePassword.newPasswordsNeedToMatch'));
    }

    await userStore.changePassword(model.currentPassword, model.newPassword);

    changed.value++;
    successMessage.value = t('updatePassword.passwordChanged');
    model.currentPassword = model.newPassword = model.newPassword2 = '';
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : `${error}`;
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <FormWrapper :saving="saving" @submit="changePassword">
    <h3 class="text-center text-2xl text-slate-100 mb-3">
      {{$t('updatePassword.title')}}
    </h3>
    <input type="test" class="hidden" name="username" :value="userStore.user?.name">
    <TextInput v-model="model.currentPassword" :label="$t('updatePassword.currentPasswordLabel')" icon="fa-lock"
      type="password" autocomplete="current-password" required />

    <TextInput v-model="model.newPassword" :label="$t('updatePassword.newPasswordLabel')" icon="fa-lock"
      type="password" autocomplete="new-password" required />

    <TextInput v-model="model.newPassword2" :label="$t('updatePassword.confirmNewPasswordLabel')" icon="fa-lock"
      type="password" autocomplete="new-password" required />

    <span v-if="errorMessage" class="text-red-500">{{errorMessage}}</span>
    <span v-if="successMessage" class="text-green-500">{{successMessage}}</span>

    <FormButton class="w-full mt-2" type="submit">{{$t('updatePassword.changePasswordButton')}}</FormButton>
  </FormWrapper>
</template>
