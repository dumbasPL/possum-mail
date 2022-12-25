<script setup lang="ts">
import FormButton from '@/components/inputs/FormButton.vue';
import FormWrapper from '@/components/inputs/FormWrapper.vue';
import TextInput from '@/components/inputs/TextInput.vue';
import {useUserStore} from '@/stores/userStore';
import type {LoginModel} from 'api-client';
import {reactive, ref} from 'vue';
import {useRouter} from 'vue-router';
import UnauthorizedError from '../api/errors/UnauthorizedError';
import config from '@/config/index.json';
import SimpleLanguagePicker from '@/components/inputs/SimpleLanguagePicker.vue';

const saving = ref(false);
const userStore = useUserStore();
const router = useRouter();

const inputs = reactive<LoginModel>({
  username: '',
  password: '',
});

const errorMessage = ref<string | null>(null);

async function login() {
  try {
    saving.value = true;
    errorMessage.value = null;
    await userStore.login(inputs);
    router.replace({name: 'home'});
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      errorMessage.value = error.reason;
    } else {
      errorMessage.value = `${error}`;
    }
  } finally {
    saving.value = false;
  }
}

</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <div class="max-w-sm flex-1 m-3">
      <div class="text-center mb-6">
        <h1 class="text-2xl text-slate-200">{{$t('loginForm.welcome', {name: config.name})}}</h1>
        <h3 class="text-lg text-slate-500">{{$t('loginForm.loginToContinue')}}</h3>
      </div>
      <div class="rounded-lg p-6 bg-slate-800 highlight-white/5">
        <FormWrapper @submit="login" :saving="saving">
          <TextInput v-model="inputs.username" type="text" icon="fa-user" :label="$t('loginForm.usernameLabel')"
            :placeholder="$t('loginForm.usernamePlaceholder')" autocomplete="username" autofocus required />

          <TextInput v-model="inputs.password" type="password" icon="fa-lock" :label="$t('loginForm.passwordLabel')"
            :placeholder="$t('loginForm.passwordPlaceholder')" autocomplete="current-password" required />

          <span v-if="errorMessage" class="text-red-500">{{errorMessage}}</span>

          <FormButton class="w-full mt-2" type="submit">{{$t('loginForm.loginButton')}}</FormButton>
        </FormWrapper>
      </div>
      <div class="text-center mt-1">
        <SimpleLanguagePicker />
      </div>
    </div>
  </div>
</template>
