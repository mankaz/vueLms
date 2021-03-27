import VueRouter from "vue-router";
let routes = [
  {
    path : '/',
    component : require('./components/layout/Content.vue').default
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
  {
    path: '/about',
    component: require('./components/pages/About.vue').default
  },
  {
    path: '/AddText',
    component: require('./components/pages/AddText.vue').default
  },
  {
    path: '/AddText2',
    component: require('./components/pages/AddText.vue').default
  },
  {
    path: '/menuBuilderView',
    component: require('./components/pages/menuBuilderView.vue').default
  }

]
export default new VueRouter({
  linkActiveClass: ['is-active'],

  mode: 'history',
  routes
})
