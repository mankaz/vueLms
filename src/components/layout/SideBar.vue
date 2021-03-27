<template>
<div class="sidebar-page">
  <section class="sidebar-layout">
    <b-sidebar
      type="is-light"
      :fullheight="fullheight"
      :fullwidth="fullwidth"
      :overlay="overlay"
      :right="right"
      :open.sync="open"
      :mobile="mobile"
    >
      <div class="p-1">
        <img
          src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
          alt="Lightweight UI components for Vue.js based on Bulma"
        />
        <b-menu>
<!--          <b-menu-list label="Menu">-->
<!--            <a class="navbar-item is-active">-->
<!--              <router-link to="/" exact>dashboard</router-link>-->
<!--            </a>-->
<!--            <b-menu-item  expanded icon="text-box-multiple" size="is-large" label="نوشته ها">-->
<!--                <router-link  to="/AddText" exact><b-icon icon="text-box-plus-outline" size="is-small"></b-icon>متن جدید</router-link>-->
<!--                <router-link to="/about" exact>همه نوشته ها </router-link>-->
<!--            </b-menu-item>-->
<!--          </b-menu-list>-->
<!--          <b-menu-list>-->
<!--            <ulsidebar :menuitem="menuitem"></ulsidebar>-->
<!--          </b-menu-list>-->
          <b-menu class="is-custom-mobile">
            <b-menu-list label="Menu">
              <b-menu-list>
                <b-menu-item icon="view-dashboard" tag="router-link" :to="{ path: '/' }" exact  label="میز کار"></b-menu-item>
              </b-menu-list>
              <b-menu-list>
                <b-menu-item icon="cog-outline" tag="router-link" :to="{ path: '/services' }" exact  label="سرویس ها"></b-menu-item>
              </b-menu-list>
              <b-menu-list>
                <b-menu-item icon="door" tag="router-link" :to="{ path: '/rooms' }" exact  label="اتاق ها"></b-menu-item>
              </b-menu-list>
              <b-menu-list>
                <b-menu-item icon="currency-usd" tag="router-link" :to="{ path: '/payment' }" exact  label="افزایش اعتبار"></b-menu-item>
              </b-menu-list>
              <b-menu-list>
                <b-menu-item icon="account-multiple" tag="router-link" :to="{ path: '/users' }" exact  label="کاربران"></b-menu-item>
              </b-menu-list>
<!--              <b-menu-list>-->
<!--                <b-menu-item icon="file-multiple-outline" tag="router-link" :to="{ path: '/files' }" exact  label="فایل ها"></b-menu-item>-->
<!--              </b-menu-list>-->
              <b-menu-list>
                <b-menu-item icon="history" tag="router-link" :to="{ path: '/session' }" exact  label="نشست ها"></b-menu-item>
              </b-menu-list>
<!--              <b-menu-list>-->
<!--                <b-menu-item icon="lan-connect" tag="router-link" :to="{ path: '/Connections' }" exact  label="اتصال ها"></b-menu-item>-->
<!--              </b-menu-list>-->
              <b-menu-list>
                <b-menu-item icon="face-agent" tag="router-link" :to="{ path: '/ticketing' }" exact  label="پشتیبان"></b-menu-item>
              </b-menu-list>


<!--              <b-menu-item icon="settings">-->
<!--                <template slot="label"  slot-scope="props">-->
<!--                  <b-icon icon="order-bool-ascending-variant" class="is-pulled-right"></b-icon>-->
<!--                  آزمون-->
<!--                  <b-icon exact class="is-pulled-left" :icon="props.expanded ? 'menu-down' : 'menu-up'"></b-icon>-->
<!--                </template>-->

<!--                <b-menu-item icon="account" tag="router-link" :to="{ path: '/AddText' }" exact type="is-link" label="Users"></b-menu-item>-->
<!--                <b-menu-item icon="account" tag="router-link" :to="{ path: '/about' }" exact type="is-link" label="Users"></b-menu-item>-->
<!--                <b-menu-item icon="cash-multiple" label="Payments" disabled></b-menu-item>-->
<!--              </b-menu-item>-->

            </b-menu-list>
          </b-menu>




<!--          -->
<!--          <b-menu-list icon="text-box-outline" label="متن">-->
<!--            <ulsidebar :menuitem="menuitem"></ulsidebar>-->
<!--          </b-menu-list>-->
<!--        </b-menu>-->
        </b-menu>
      </div>
    </b-sidebar>

  </section>
</div>
</template>
<script>
  import ulsidebar from "../sidebar/ulsidebar";

  export default {
    data() {
      return {
        open: true,
        overlay: false,
        fullheight: true,
        fullwidth: false,
        right: true,
        expandOnHover: false,
        mobile: "reduce",
        reduce: true,
        menuitem:[
          {title : 'متن جدید',icon:'text-box-plus-outline',link:'/AddText'},
          {title : '  نوشته ها',icon: 'text-box-multiple-outline',link:'/about',},
          {title : 'منو ساز',icon: 'text-box-multiple-outline',link:'/menuBuilderView',}
        ],
      }
    },
    components : {ulsidebar},
  }
</script>
