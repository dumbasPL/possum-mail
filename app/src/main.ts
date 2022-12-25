import {createApp} from 'vue';
import {createPinia} from 'pinia';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import FloatingVue, {VTooltip} from 'floating-vue';
import {Vue3Mq, type Config as MqConfig} from 'vue3-mq';
import i18next from 'i18next';
import I18NextVue from 'i18next-vue';
import AppSuspender from './AppSuspender.vue';
import router from './router';
import './icons';
import breakpoints from '@/config/breakpoints.json';

import './assets/style.scss';

const app = createApp(AppSuspender);

app.use(I18NextVue, {i18next});
app.use(createPinia());
app.use(router);
app.use(Vue3Mq, {breakpoints} satisfies MqConfig);

FloatingVue.options.container = '#popovers';
FloatingVue.options.themes.tooltip.delay.show = 0;

app.component('font-awesome-icon', FontAwesomeIcon);
app.directive('tooltip', VTooltip);

app.mount('#app');
