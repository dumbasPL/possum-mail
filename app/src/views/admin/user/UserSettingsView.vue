<script setup lang="ts">
import LanguagePicker from '@/components/inputs/LanguagePicker.vue';
import CenterForm from '@/components/layout/CenterForm.vue';
import FormBox from '@/components/layout/FormBox.vue';
import ChangePasswordForm from '@/components/settings/user/ChangePasswordForm.vue';


</script>

<template>
  <CenterForm>
    <FormBox>
      <h3 class="text-center text-2xl text-slate-100 mb-3">
        {{$t('updateLanguage.title')}}
      </h3>

      <LanguagePicker class="mb-0"/>
    </FormBox>

    <FormBox>
      <ChangePasswordForm />
    </FormBox>
  </CenterForm>
</template>
