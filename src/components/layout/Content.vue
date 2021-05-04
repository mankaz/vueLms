<template>
      <div class="p-1">

        <!--          <div courses="columns is-variable is-desktop page-title">-->
        <!--            <div courses="column">-->
        <!--              <h1 courses="title">-->
        <!--                داشبورد-->
        <!--              </h1>-->
        <!--            </div>-->
        <!--          </div>-->

        <!--          <div courses="columns  is-variable is-desktop">-->
        <!--            <div courses="column">-->
        <!--              <div courses="card has-background-primary has-text-white">-->
        <!--                <div courses="card-header">-->
        <!--                  <div courses="card-header-title has-text-white">-->
        <!--                    جمع فروش-->
        <!--                  </div>-->
        <!--                </div>-->
        <!--                <div courses="card-content">-->
        <!--                  <p courses="is-size-4">56,590</p>-->
        <!--                </div>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--            <div courses="column">-->
        <!--              <div courses="card has-background-warning has-text-black">-->
        <!--                <div courses="card-header">-->
        <!--                  <div courses="card-header-title has-text-black is-uppercase">-->
        <!--                    درآمد-->
        <!--                  </div>-->
        <!--                </div>-->
        <!--                <div courses="card-content">-->
        <!--                  <p courses="is-size-4">55%</p>-->
        <!--                </div>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--            <div courses="column">-->
        <!--              <div courses="card has-background-info has-text-white">-->
        <!--                <div courses="card-header">-->
        <!--                  <div courses="card-header-title has-text-white is-uppercase">-->
        <!--                    بازخورد-->
        <!--                  </div>-->
        <!--                </div>-->
        <!--                <div courses="card-content">-->
        <!--                  <p courses="is-size-4">78 %</p>-->
        <!--                </div>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--            <div courses="column">-->
        <!--              <div courses="card has-background-danger has-text-white">-->
        <!--                <div courses="card-header">-->
        <!--                  <div courses="card-header-title has-text-white">سفارشات</div>-->
        <!--                </div>-->
        <!--                <div courses="card-content">-->
        <!--                  <p courses="is-size-4">425k</p>-->
        <!--                </div>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--          </div>-->

        <div class="columns is-variable">

          <div class="column is-10">
<!--              <tabs></tabs>-->
              <Menu> </Menu>
          </div>
        </div>
      </div>
</template>


<script>


  import Menu from "../dashbord/master/Menu.vue"
  export default {
  data(){
    return{
      editorConfig: {
      },
    }

  },
    mounted() {
      // if (this.$cookies.get('mobile') && this.$cookies.get('token')) {
      //   this.$router.push('/dashboard')
      // }
      let test = this.$cookies.set('test' , 'mansour')
      if(!test) {
        console.log(test)
      }
      if (!this.$cookies.get('mobile') || !this.$cookies.get('token')){
        this.$router.push('/login')

      // const headers = {'content-type': 'application/x-www-form-urlencoded'};
      // axios.post("http://gholeydoon.ir/bbb/public/userController/checkSession", {headers})
      //     .then((data) => {
      //       console.log(data.data)
      //       if(!data.data.feed.isLoggedIn) {
      //         this.$router.push('/login')
      //       }
      //     })
      }
    },
    components : {Menu},

  }
</script>
