import {createRouter, createWebHistory, START_LOCATION} from 'vue-router';
import {useUserStore} from '@/stores/userStore';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import UserSettingsView from '@/views/admin/user/UserSettingsView.vue';
import ManageUsersView from '@/views/admin/users/ManageUsersView.vue';
import AddNewUserView from '@/views/admin/users/AddNewUserView.vue';
import EditUserView from '@/views/admin/users/EditUserView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/user',
      children: [
        {
          path: 'settings',
          name: 'currentUserSettings',
          component: UserSettingsView,
        },
      ],
    },
    {
      path: '/admin',
      children: [
        {
          path: 'users',
          children: [
            {
              path: '',
              name: 'manageUsers',
              component: ManageUsersView,
            },
            {
              path: 'new',
              name: 'manageUsersAddNew',
              component: AddNewUserView,
            },
            {
              path: 'edit/:id',
              name: 'manageUsersEdit',
              props: ({params}) => ({userId: parseInt(params.id as string)}),
              beforeEnter: ({params}) => isNaN(parseInt(params.id as string)) ? {name: 'manageUsers'} : true,
              component: EditUserView,
            },
          ],
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from) => {
  const userStore = useUserStore();

  // fetch user data on initial page load
  if (from === START_LOCATION && userStore.hasToken) {
    await userStore.fetchUserInfo();
  }

  if (to.name == 'login') {
    // redirect to home if already logged in
    if (userStore.isLoggedIn) {
      return {name: 'home'};
    }
  } else if (!userStore.isLoggedIn) {
    // redirect to login page if not logged in already
    return {name: 'login'};
  }

  return true;
});

export default router;
