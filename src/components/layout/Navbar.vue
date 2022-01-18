<!--<template>-->
<!--  <nav class="navbar" role="navigation" aria-label="main navigation">-->
<!--    <template slot="brand">-->
<!--      <b-dropdown :triggers="['hover']" aria-role="list">-->
<!--        <template #trigger>-->
<!--          <b-button-->
<!--              rounded-->
<!--              class="is-light"-->
<!--              label="کاظمی"-->
<!--              type="is-info"-->
<!--              icon-right="menu-down"/>-->
<!--        </template>-->
<!--        <b-dropdown-item aria-role="listitem">پروفایل</b-dropdown-item>-->
<!--        <b-dropdown-item @click="logOut()" aria-role="listitem">خروج</b-dropdown-item>-->
<!--      </b-dropdown>-->
<!--      <vs-button success :to="{ path: '/payment' }" exact>-->
<!--        {{money}} <span class="unit">{{unit}} </span>-->
<!--      </vs-button>-->
<!--      <vs-button success>-->
<!--        ایجاد کاربر    <i class="bx bx-check"></i>-->
<!--      </vs-button>-->
<!--      <b-tooltip label="اعلان ها"-->
<!--                 position="is-bottom">-->
<!--        <b-button-->
<!--            rounded-->
<!--            class="is-light nav-btn-space"-->
<!--            type="is-info"-->
<!--            icon-right="bell"/>-->
<!--      </b-tooltip>-->
<!--    </template>-->
<!--    <template slot="end">-->
<!--    </template>-->
<!--  </nav>-->
<!--</template>-->
<template>
<!--  <div class="center examplex">-->
<!--    <vs-navbar center-collapsed v-model="active">-->
<!--      <template #left>-->
<!--        <img src="/logo2.png" alt="">-->
<!--      </template>-->
<!--      <vs-navbar-item :active="active == 'guide'" id="guide">-->
<!--        Guide-->
<!--      </vs-navbar-item>-->
<!--      <vs-navbar-item :active="active == 'docs'" id="docs">-->
<!--        Documents-->
<!--      </vs-navbar-item>-->
<!--      <vs-navbar-item :active="active == 'components'" id="components">-->
<!--        Components-->
<!--      </vs-navbar-item>-->
<!--      <vs-navbar-item :active="active == 'license'" id="license">-->
<!--        license-->
<!--      </vs-navbar-item>-->
<!--      <template #right>-->
<!--        <vs-button flat >Login</vs-button>-->
<!--        <vs-button>Get Started</vs-button>-->
<!--      </template>-->
<!--    </vs-navbar>-->
<!--    <div class="square">-->
<!--      <div class="child">-->
<!--        child 1-->
<!--      </div>-->
<!--      <div class="child">-->
<!--        child 2-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
  <nav class="navbar is-transparent">
    <div class="navbar-brand">
      <vs-tooltip color="#ff4757" bottom>
        <vs-button
            danger
            icon
            @click="logOut()"
        >
          <i class='bx bx-log-out-circle'></i>
        </vs-button>
        <template #tooltip>
         خروج
        </template>
      </vs-tooltip>
      <vs-tooltip color="#98a9e0" bottom>
      <vs-button
          icon
          color="#98a9e0"
          :to="{ path: '/payment' }" exact
      >
        {{unit}} <span class="unit">  {{money}} </span>
        <i class="bx bx-plus-circle"></i>
      </vs-button>
        <template #tooltip>
          موجودی حساب شما
        </template>
      </vs-tooltip>

    </div>

    <div id="navbarExampleTransparentExample" class="navbar-menu">


    </div>
  </nav>
</template>
<script>

import axios from "axios";

export default {
  data() {
    return {
      money:100000,
      unit :'ریال',
      active: 'guide'
    }
  },
  methods : {
    logOut () {
      console.log('ffffffff')
      const headers = {'content-type': 'application/x-www-form-urlencoded'};
      axios.post("http://gholeydoon.ir/bbb/public//userController/logOut", {headers})
          .then(() => {
            this.$router.push('/login')
          })
    }
  }
}
</script>