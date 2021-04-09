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
          <b-menu class="is-custom-mobile">
            <b-menu-list label="Menu">
              <b-menu-list>
                <b-menu-item icon="view-dashboard" tag="router-link" :to="{ path: '/dashboard' }" exact  label="میز کار"></b-menu-item>
              </b-menu-list>
              <b-menu-list>
                <b-menu-item icon="certificate-outline" tag="router-link" :to="{ path: '/courses' }" exact  label="دوره های من"></b-menu-item>
              </b-menu-list>
              <b-menu-list>
                <b-menu-item icon="google-classroom" tag="router-link" :to="{ path: '/class' }" exact  label="کلاس های من"></b-menu-item>
              </b-menu-list>
              <b-menu-list>
                <b-menu-item icon="cog-outline" tag="router-link" :to="{ path: '/services' }" exact  label="سرویس ها"></b-menu-item>
              </b-menu-list>
              <b-menu-list>
                <b-menu-item icon="currency-usd" tag="router-link" :to="{ path: '/payment' }" exact  label="افزایش اعتبار"></b-menu-item>
              </b-menu-list>
              <b-menu-list>
                <b-menu-item icon="account-multiple" tag="router-link" :to="{ path: '/users' }" exact  label="کاربران"></b-menu-item>
              </b-menu-list>
              <b-menu-list>
                <b-menu-item icon="history" tag="router-link" :to="{ path: '/session' }" exact  label="نشست ها"></b-menu-item>
              </b-menu-list>
              <b-menu-list>
                <b-menu-item icon="face-agent" tag="router-link" :to="{ path: '/ticketing' }" exact  label="پشتیبان"></b-menu-item>
              </b-menu-list>

            </b-menu-list>
          </b-menu>

        </b-menu>
      </div>
    </b-sidebar>

  </section>
</div>
</template>
<script>

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
      }
    },
  }
</script>
