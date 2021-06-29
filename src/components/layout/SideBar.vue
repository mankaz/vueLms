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
        <img class="logo"  :src="`img/logo.png`" />
        <b-menu>
          <b-menu class="is-custom-mobile">
            <b-menu-list>
              <b-menu-list>
                <b-menu-item icon="view-dashboard" tag="router-link" :to="{ path: '/dashboard' }" exact  label="پیشخوان"></b-menu-item>
              </b-menu-list>
              <b-menu-list>
                <b-menu-item icon="cellphone-link" tag="router-link" :to="{ path: '/class' }" exact  label="کلاس ها"></b-menu-item>
              </b-menu-list>
              <b-menu-list>
                <b-menu-item icon="certificate-outline" tag="router-link" :to="{ path: '/courses' }" exact   label="دوره ها"></b-menu-item>
              </b-menu-list>
<!--              <b-menu>-->
<!--                <b-menu-list>-->
<!--                  <b-menu-item icon="certificate-outline" tag="router-link" :to="{ path: '/courses' }" exact >-->
<!--                    <template #label>-->
<!--                      دوره ها-->
<!--                      <b-dropdown :triggers="['hover']" aria-role="list" class="is-pulled-left" position="is-bottom-left">-->
<!--                        <template #trigger>-->
<!--                          <b-icon icon="dots-vertical"></b-icon>-->
<!--                        </template>-->
<!--                        <b-dropdown-item icon-right="plus"><router-link  :to="{ path: '/AddCourses'}" exact>دوره جدید</router-link></b-dropdown-item>-->
<!--                      </b-dropdown>-->
<!--                    </template>-->
<!--                  </b-menu-item>-->
<!--                </b-menu-list>-->

<!--                <b-menu-list>-->
<!--                  <b-menu-item icon="cellphone-link" tag="router-link" :to="{ path: '/class' }" exact >-->
<!--                    <template #label>-->
<!--                      کلاس ها-->
<!--                      <b-dropdown :triggers="['hover']" aria-role="list" class="is-pulled-left" position="is-bottom-left">-->
<!--                        <template #trigger>-->
<!--                          <b-icon icon="dots-vertical"></b-icon>-->
<!--                        </template>-->
<!--                        <b-dropdown-item icon-right="plus"><router-link  :to="{ path: '/AddClass'}" exact>کلاس جدید</router-link></b-dropdown-item>-->
<!--                      </b-dropdown>-->
<!--                    </template>-->
<!--                  </b-menu-item>-->
<!--                </b-menu-list>-->
<!--              </b-menu>-->
              <b-menu-list>
                <b-menu-item icon="cog-outline" tag="router-link" :to="{ path: '/services' }" exact  label="سرویس ها"></b-menu-item>
              </b-menu-list>
              <b-menu-list>
                <b-menu-item icon="currency-usd" tag="router-link" :to="{ path: '/payment' }" exact  label="افزایش اعتبار"></b-menu-item>
              </b-menu-list>
              <b-menu-list>
                <b-menu-item icon="account-multiple" tag="router-link" :to="{ path: '/Users' }" exact  label="کاربران"></b-menu-item>
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
