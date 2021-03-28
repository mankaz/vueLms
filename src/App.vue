
<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.8.0/css/bulma.min.css"
      integrity="sha256-D9M5yrVDqFlla7nlELDaYZIpXfFWDytQtiV+TaH6F1I="
      crossorigin="anonymous"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css"
      integrity="sha256-+N4/V/SbAFiW1MPBCXnfnP9QSN3+Keu+NlB+0ev/YKQ="
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.css"/>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">



    <router-view></router-view>
  </div>

</template>

<script>
  import './assets/scss/style.css'
  import './assets/scss/custom.css'
  import ContentView from "./components/layout/Content.vue";
  import SideBar from "./components/layout/SideBar.vue";
  import Navbar from "./components/layout/Navbar.vue";



  export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      alert :{
      title:'',
        message:'',
        show:'false',
        type: ''
    },

    };
  },
  methods: {
    addtodo(){
      this.alert = {
        title : 'اطلاعات',
        message : 'ورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص',
        type: 'is-info',
        show: 'true'
      };
    },
  },
  mounted(){
    this.addtodo()
  },
  components : {SideBar,ContentView,Navbar},

}

</script>

