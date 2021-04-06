<template>
  <div>
    <navbar></navbar>
    <sideBar></sideBar>
    <router-view></router-view>
  </div>
</template>
<script>
import SideBar from "../../components/layout/SideBar.vue";
import Navbar from "../../components/layout/Navbar.vue";
export default {
  data () {
return{

}
  },
  components : {SideBar,Navbar},
  name: "AppLayout"
};
</script>
