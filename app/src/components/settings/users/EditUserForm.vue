<script setup lang="ts">
import FormButton from '@/components/inputs/FormButton.vue';
import FormWrapper from '@/components/inputs/FormWrapper.vue';
import PermissionsPicker from '@/components/inputs/PermissionsPicker.vue';
import TextInput from '@/components/inputs/TextInput.vue';
import {computed} from 'vue';

interface Model {
  username: string;
  password: string;
  permissions: number;
}

const props = withDefaults(defineProps<{
  title?: string | null,
  buttonText?: string | null,
  modelValue: Model,
  saving?: boolean
  errorMessage?: string,
  isEdit?: boolean,
}>(), {
  isEdit: false,
});

const emit = defineEmits<{
  (event: 'submit', e: Event): void,
  (event: 'update:modelValue', model: Model): void,
}>();

const inputUsername = computed({
  get: () => props.modelValue.username,
  set: value => emit('update:modelValue', {...props.modelValue, username: value}),
});

const inputPassword = computed({
  get: () => props.modelValue.password,
  set: value => emit('update:modelValue', {...props.modelValue, password: value}),
});

const inputPermissions = computed({
  get: () => props.modelValue.permissions,
  set: value => emit('update:modelValue', {...props.modelValue, permissions: value}),
});

</script>

<template>
  <FormWrapper :saving="saving" @submit="e => emit('submit', e)" autocomplete="off">
    <h3 v-if="title" class="text-center text-2xl text-slate-100 mb-3">{{title}}</h3>

    <TextInput v-model="inputUsername" :label="$t('editUser.nameLabel')" icon="fa-user" minlength="3" :readonly="isEdit"
      type="text" autocomplete="off" :placeholder="isEdit ? undefined : $t('editUser.usernameForNewUserPlaceholder')" required />

    <TextInput v-model="inputPassword" :label="isEdit ? $t('editUser.update.passwordLabel') : $t('editUser.new.passwordLabel')"
      icon="fa-lock" minlength="6" type="password" :required="!isEdit" autocomplete="new-password"
      :placeholder="isEdit ? $t('editUser.update.passwordPlaceholder') : $t('editUser.new.passwordPlaceholder')" />

    <PermissionsPicker v-model="inputPermissions" :label="$t('editUser.permissionsLabel')" icon="fa-shield"
      :placeholder="isEdit ? $t('editUser.update.permissionsPlaceholder') : $t('editUser.new.permissionsPlaceholder')" />

    <span v-if="errorMessage" class="text-red-500">{{errorMessage}}</span>

    <FormButton class="w-full mt-2" type="submit">{{buttonText ?? 'ERROR'}}</FormButton>
  </FormWrapper>
</template>
