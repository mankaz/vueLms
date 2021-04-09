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
              icon-right="menu-down"/>
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
    </template>
    <template slot="end">
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