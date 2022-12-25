<script setup lang="ts">
import {useUserStore} from '@/stores/userStore';
import {computed, provide} from 'vue';
import SidebarButton from './SidebarButton.vue';
import {labelsHiddenKey} from './injectionKeys';

const props = defineProps<{
  expanded: boolean,
  isMobile?: boolean,
}>();

const emit = defineEmits<{
  (event: 'update:expanded', value: boolean): void,
}>();

const userStore = useUserStore();

function hideOnMobile() {
  if (props.isMobile) {
    emit('update:expanded', false);
  }
}

const labelsHidden = computed(() => !props.isMobile && !props.expanded);

provide(labelsHiddenKey, labelsHidden);

</script>

<template>
  <Transition name="custom-classes" enter-from-class="opacity-0" leave-to-class="opacity-0">
    <div v-if="(isMobile && expanded)" @click="hideOnMobile"
      class="bg-slate-800/50 w-full h-full absolute inset-0 block transition-opacity ease-in-out duration-300 z-20"></div>
  </Transition>
  <div :class="{'w-0': isMobile}" class="relative z-20">
    <Transition name="custom-classes" enter-from-class="-translate-x-full" leave-to-class="-translate-x-full">
      <div v-if="(!isMobile || expanded)" :class="(isMobile || expanded) ? 'w-48' : 'w-14'"
        class="bg-slate-800 h-full absolute lg:static top-0 left-0 bottom-0 transition-all ease-in-out duration-300" >
        <nav class="flex flex-col gap-1 px-2 pt-2">
          <SidebarButton icon="fa-solid fa-house" :href="{name: 'home'}" @click="hideOnMobile" :text="$t('sidebar.home')" />
          <template v-if="userStore.permissions.Admin">
            <SidebarButton icon="fa-solid fa-users" :href="{name: 'manageUsers'}" @click="hideOnMobile" :text="$t('sidebar.manageUsers')" />
          </template>
        </nav>
      </div>
    </Transition>
  </div>
</template>
