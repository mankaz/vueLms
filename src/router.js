import VueRouter from "vue-router";
import Login from "./components/dashbord/master/pages/Login";
import LoginLayout from "./components/layout/LoginLayout";
import AppLayout from "./components/layout/App";
let routes = [
  {
    path: '/',
    component: LoginLayout,
    children: [
      {
        path: '',
        component: Login,
      },
    ],
  },
  {
    path: '/login',
    component: LoginLayout,
    children: [
      {
        path: '',
        component: Login,
      },
      {
        path : '/LoginRequest',
        component : require('./components/dashbord/master/pages/LoginRequest.vue').default
      }
    ],
  },
  {
    path: '/dashboard',
    component: AppLayout,
    children: [
      {
        path : '/dashboard',
        component : require('./components/layout/Content.vue').default
      },
      {
        path : '/courses',
        component : require('./components/dashbord/master/pages/Courses.vue').default
      },
      {
        path : '/services',
        component : require('./components/dashbord/master/pages/Services.vue').default
      },
      {
        path : '/Payment',
        component : require('./components/dashbord/master/pages/Payment.vue').default
      },
      {
        path : '/Rooms',
        component : require('./components/dashbord/master/pages/Rooms.vue').default
      },
      {
        path : '/Ticketing',
        component : require('./components/dashbord/master/pages/Ticketing.vue').default
      },


    ],
  },
]
export default new VueRouter({
  linkActiveClass: ['is-active'],

  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
