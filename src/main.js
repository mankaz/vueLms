import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import router from "./router";
import VueApexCharts from 'vue-apexcharts'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker';
// import Buefy from 'buefy';
import 'bulma/css/bulma-rtl.css'

Vue.component('date-picker', VuePersianDatetimePicker);
import VueStore from '@websanova/vue-store';
import vueResource from 'vue-resource';
import {guest} from "@/plugin/axios";
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
import Vuesax from 'vuesax'
import 'boxicons'
import 'boxicons/css/boxicons.css'

import 'vuesax/dist/vuesax.css'


Vue.use(require('vue-cookies'))
Vue.use(VueRouter)
Vue.use(
    Vuesax,

    vueResource,
    VueStore,
    VuePersianDatetimePicker,
    VueApexCharts
);
// Vue.use(VueRouter);
// Vue.use(vueResource);
// Vue.use(VueStore);
// Vue.use(VuePersianDatetimePicker);
// Vue.use(VueApexCharts);
new Vue({
    el: '#app',
    render: h => h(App),
    router,
    guest
})
