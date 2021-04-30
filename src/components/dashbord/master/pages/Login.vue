<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column container is-two-thirds is-max-desktop">
            <div  class="box login-box-padding">
              <div class="columns login-height">
                <div class="column login-border-rad auth-img is-flex  is-justify-content-center">
                  <p class="is-family-iranSans has-text-white is-flex is-align-items-center">به سامانه آموزش مجازی خوش آمدید</p>
                </div>
                <div class="column is-flex is-justify-content-center">
                  <div class="column">
                    <div class="column is-flex is-justify-content-flex-end">
                      <img class="image is-48x48" src="../../../../../public/img/logo.png">
                    </div>
                    <div class="field  is-family-iranSans is-flex is-justify-content-flex-end">
                      <label  class="label is-size-5">ورود به بی نام</label>
                    </div>
                    <div class="field is-family-iranSans is-flex is-justify-content-flex-end">
                      <label  class="label is-size-7">برای استفاده از خدمات بی نام، وارد حساب کاربری خود شوید</label>
                    </div>
                    <form method="post">
                    <div class="field login-mobileNumber">
                      <div class="control has-icons-left">
                        <b-field  label="شماره همراه" :label-position="labelPosition">
                          <input @keyup="onKeyup" v-model="mobile" class="input" id="mobile" maxlength="11" icon-right="cellphone" size="is-normal">
                        </b-field>
                      </div>
                    </div>

                    <div class="field">
                      <div  class="column is-flex is-justify-content-center">
                        <b-button class="is-rounded is-success" @click.prevent="submitForm" >تأیید و ادامه</b-button>
                      </div>
                    </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {

  data(){
    return {
      labelPosition: 'on-border',
      mobile:null
    }

  },
  methods:{
    onKeyup(event) {
      event.target.value = event.target.value.replace(/[^0-9]/g, '')
    },
    submitForm () {
      const form = new FormData();
      form.append("mobile", this.mobile);
      localStorage.mobile = this.mobile ;
      let mobile = document.getElementById('mobile')
      if (mobile.value === '' || !(/^(\+98|0)?9\d{9}/g.test(mobile.value)) ) {
        this.$buefy.toast.open({
          message: 'شماره موبایل را وارد نمایید',
          type: 'is-warning',
          position: 'is-top',
        })
      } else {
        const headers = {'content-type': 'application/x-www-form-urlencoded'};
        axios.post("http://gholeydoon.ir/bbb/public/BBBController/loginOrRegister",form, {headers})
            .then(() => {
              this.isLoading = false
              this.$router.push('/loginRequest')
            })
            .catch(()=> {
              this.$buefy.toast.open({
                message: 'خطا در ویرایش کلاس',
                type: 'is-danger',
                position: 'is-top',
              })
            })

      }
      console.log(localStorage.mobile = this.mobile)
    },
  },
  created() {
    // history.pushState(null, null, document.URL);
    // window.addEventListener('popstate', function () {
    //   history.pushState(null, null, document.URL);
    // });
  },
  mounted() {
    // if (localStorage.mobile) {
    //   localStorage.name = this.mobile ;
    // }
  },
  // watch:{
  //   mobile(newName) {
  //     localStorage.mobile = newName;
  //   }
  // },
  // name: "login"
};
</script>