<template>
  <b-navbar>
    <template slot="brand">

      <b-dropdown :triggers="['hover']" aria-role="list">
        <template #trigger>
          <b-button
              rounded
              class="is-light"
              label="کاظمی"
              type="is-info"
              icon-right="menu-down" />

        </template>


        <b-dropdown-item aria-role="listitem">پروفایل</b-dropdown-item>
        <b-dropdown-item aria-role="listitem">خروج</b-dropdown-item>
      </b-dropdown>
      <b-button
          rounded
          class="is-light nav-btn-space"
          type="is-info"
          icon-right="plus"
          tag="router-link" :to="{ path: '/payment' }" exact
      >
        {{money}} <span class="unit">{{unit}} </span>
      </b-button>

      <b-tooltip label="اعلان ها"
                 position="is-bottom">
        <b-button
            rounded
            class="is-light nav-btn-space"
            type="is-info"
            icon-right="bell"/>
      </b-tooltip>


      <!--      <b-dropdown aria-role="list">-->
<!--        <button class="avatar" type="button" slot="trigger">-->

<!--&lt;!&ndash;          <b-icon class="arrow-down" icon="menu-down"></b-icon>&ndash;&gt;-->
<!--        </button>-->

<!--        <b-dropdown-item :value="true" aria-role="listitem">-->
<!--          <div class="media">-->
<!--            <b-icon class="media-left" icon="earth"></b-icon>-->
<!--            <div class="media-content">-->
<!--              <h3>Public</h3>-->
<!--              <small>Everyone can see</small>-->
<!--            </div>-->
<!--          </div>-->
<!--        </b-dropdown-item>-->

<!--        <b-dropdown-item :value="false" aria-role="listitem">-->
<!--          <div class="media">-->
<!--            <b-icon class="media-left" icon="account-multiple"></b-icon>-->
<!--            <div class="media-content">-->
<!--              <h3>Friends</h3>-->
<!--              <small>Only friends can see</small>-->
<!--            </div>-->
<!--          </div>-->
<!--        </b-dropdown-item>-->
<!--      </b-dropdown>-->

    </template>
<!--    <template slot="start">-->
<!--      <b-navbar-item href="#">-->
<!--        Home-->
<!--      </b-navbar-item>-->
<!--      <b-navbar-item href="#">-->
<!--        Documentation-->
<!--      </b-navbar-item>-->
<!--      <b-navbar-dropdown label="Info">-->
<!--        <b-navbar-item href="#">-->
<!--          About-->
<!--        </b-navbar-item>-->
<!--        <b-navbar-item href="#">-->
<!--          Contact-->
<!--        </b-navbar-item>-->
<!--      </b-navbar-dropdown>-->
<!--    </template>-->

    <template slot="end">
<!--      <b-navbar-item tag="div">-->
<!--        <div class="buttons">-->
<!--          <a class="button is-primary">-->
<!--            <strong>Sign up</strong>-->
<!--          </a>-->
<!--          <a class="button is-light">-->
<!--            Log in-->
<!--          </a>-->
<!--        </div>-->
<!--      </b-navbar-item>-->
    </template>
  </b-navbar>
</template>

<script>

export default {
  data() {
    return {
      money:100000,
      unit :'ریال'
    }
  },


}
</script>