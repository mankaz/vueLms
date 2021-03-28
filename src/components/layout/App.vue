<template>
  <div>
    <navbar></navbar>
    <sideBar></sideBar>
    <router-view></router-view>
  </div>
</template>
<script>
import ContentView from "../../components/layout/Content.vue";
import SideBar from "../../components/layout/SideBar.vue";
import Navbar from "../../components/layout/Navbar.vue";
export default {
  data () {

  },
  components : {SideBar,ContentView,Navbar},
  name: "AppLayout"
};
</script>
