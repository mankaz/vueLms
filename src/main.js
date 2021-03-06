import Vue from 'vue';
import App from './App.vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import VueRouter from 'vue-router';
import router from "./router";
import VueApexCharts from 'vue-apexcharts'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker';

Vue.component('date-picker', VuePersianDatetimePicker);
import VueStore from '@websanova/vue-store';
import vueResource from 'vue-resource';
import {guest} from "@/plugin/axios";
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

Vue.use(require('vue-cookies'))
Vue.use(VueRouter)
Vue.use(
    Buefy,
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
