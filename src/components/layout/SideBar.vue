<template>

<div>

  <vs-sidebar
      right
      absolute
      v-model="active"
      open
  >
    <template #logo>
      <img  :src="`img/logo.png`" />
    </template>
    <template #header>

    </template>


      <vs-sidebar-item id="home" :to="{ path: '/dashboard' }" exact>
        <template #icon>
          <i class='bx bxs-widget'></i>
        </template>
        داشبورد
      </vs-sidebar-item>

    <vs-sidebar-group>
      <template #header>
        <vs-sidebar-item arrow>
          <template #icon>
            <i class='bx bx-award'></i>
          </template>
          دوره ها
        </vs-sidebar-item>
      </template>

      <vs-sidebar-item id="course" :to="{ path: '/courses' }" exact>
        دوره های شما
      </vs-sidebar-item>

      <vs-sidebar-item id="adcourse" :to="{ path: '/addcourses' }" exact>
        ایجاد دوره
      </vs-sidebar-item>
    </vs-sidebar-group>

    <vs-sidebar-group>
      <template #header>
        <vs-sidebar-item arrow>
          <template #icon>
            <i class='bx bx-chalkboard'></i>
          </template>
          کلاس ها
        </vs-sidebar-item>
      </template>

      <vs-sidebar-item id="class" :to="{ path: '/class' }" exact>
         کلاس های شما
      </vs-sidebar-item>
      <vs-sidebar-item id="addclass" :to="{ path: '/addclass' }" exact>

        ایجاد کلاس
      </vs-sidebar-item>
    </vs-sidebar-group>
    <vs-sidebar-group>
      <template #header>
        <vs-sidebar-item arrow>
          <template #icon>
            <i class='bx bx-group'></i>
          </template>
          کاربران
        </vs-sidebar-item>
      </template>

      <vs-sidebar-item id="users" :to="{ path: '/users' }" exact>
       همه کاربران
      </vs-sidebar-item>
      <vs-sidebar-item id="adduser" :to="{ path: '/addusers' }" exact>

        ایجاد کاربر
      </vs-sidebar-item>
    </vs-sidebar-group>
<!--    <vs-sidebar-item id="plug" :to="{ path: '/plug' }" exact>-->
<!--      <template #icon>-->
<!--        <i class='bx bx-plug'></i>-->
<!--      </template>-->
<!--     اتصال ها-->
<!--    </vs-sidebar-item>-->
    <vs-sidebar-item id="services" :to="{ path: '/services' }" exact>
      <template #icon>
        <i class='bx bx-cog'></i>
      </template>
      سرویس ها
    </vs-sidebar-item>
    <vs-sidebar-item id="support" :to="{ path: '/support' }" exact>
      <template #icon>
        <i class='bx bx-support'></i>
      </template>
      پشتیبان
    </vs-sidebar-item>
    <template #footer>
      <vs-row justify="space-between">
        <vs-avatar>
          <img src="@/assets/img/avatar.jpg"/>
        </vs-avatar>

        <vs-avatar badge-color="danger" badge-position="top-right">
          <i class='bx bx-bell' ></i>

          <template #badge>
            28
          </template>
        </vs-avatar>
      </vs-row>
    </template>
  </vs-sidebar>

</div>
</template>
<script>

  export default {
    data() {
      return {
        active: 'home',
      }
    },
  }
</script>
