import VueRouter from "vue-router";
import Login from "./components/dashbord/master/pages/Login";
import LoginLayout from "./components/layout/LoginLayout";
import AppLayout from "./components/layout/App";
import Vue from "vue";
Vue.use(require('vue-cookies'))

const router = new VueRouter({
  routes : [
    {
      path: '/',
      component: LoginLayout,
      children: [
        {
          path: '',
          meta: { login: true },
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
          meta: { loginChild: true },
        },
        {
          path : '/LoginRequest',
          name:'VerifyCode',
          meta: { VerifyCode: true },
          component : require('./components/dashbord/master/pages/VerifyCode.vue').default
        }
      ],
    },
    {
      path: '/dashboard',
      component: AppLayout,
      children: [
        {
          path : '/dashboard',
          meta: { Auth: true },
          component : require('./components/layout/Content.vue').default
        },
        {
          path : '/courses',
          meta: { Auth: true },
          component : require('./components/dashbord/master/pages/Courses.vue').default
        },
        {
          path : '/AddCourses',
          meta: { Auth: true },
          component : require('./components/dashbord/master/courses/AddCourses.vue').default
        },
        {
          path : '/Users',
          meta: { Auth: true },
          component : require('./components/dashbord/master/pages/Users.vue').default
        },
        {
          path : '/AddUsers',
          meta: { Auth: true },
          component : require('./components/dashbord/master/users/AddUsers.vue').default
        },
        {
          path : '/services',
          meta: { Auth: true },
          component : require('./components/dashbord/master/pages/Services.vue').default
        },
        {
          path : '/Payment',
          meta: { Auth: true },
          component : require('./components/dashbord/master/pages/Payment.vue').default
        },
        {
          path : '/Class',
          name:'class',
          meta: { Auth: true },
          component : require('./components/dashbord/master/pages/Class.vue').default
        },
        {
          path : '/ClassDetail',
          name:'ClassDetail',
          meta: { Auth: true },
          component : require('./components/dashbord/master/pages/ClassDetail.vue').default
        },
        {
          path : '/AddClass',
          meta: { Auth: true },
          component : require('./components/dashbord/master/class/AddClass.vue').default
        },
        {
          name:'editClass',
          // path : '/EditClass/:id/:isRegisteringMe',
          path : '/EditClass',
          meta: { Auth: true },
          props:true,
          component : require('./components/dashbord/master/class/EditClass.vue').default
        },
        {
          path : '/Ticketing',
          meta: { Auth: true },
          component : require('./components/dashbord/master/pages/Ticketing.vue').default
        },
      ],
    },
  ],
  linkActiveClass: ['is-active'],

  mode: 'hash',
  base: process.env.BASE_URL,

})
  router.beforeEach((to, from, next) => {

    if (to.meta.Auth) {
      if (!Vue.$cookies.get('mobile') && !Vue.$cookies.get('token')) {
        next("/");
      } else {
        next();
      }
    } else {
      next();
    }
    if (to.meta.login || to.meta.VerifyCode || to.meta.loginChild) {
      if (Vue.$cookies.get('mobile') && Vue.$cookies.get('token')) {
        next("/dashboard");
      } else {
        next();
      }
    } else {
      next();
    }
  });


export default router


// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.adminOnly)) {
//     next({ path: '/login'})
//   } else {
//     next();
//   }
//
// });