<template>
  <section class="hero is-fullheight">
    <div class="hero-body" >
      <div class="container">
        <div class="columns is-centered">
          <div class="column container is-two-thirds is-max-desktop">
            <div class="box login-box-padding">
              <div class="columns login-height">
                <div class="column login-border-rad auth-img is-flex  is-justify-content-center">
                  <p class="is-family-iranSans has-text-white is-flex is-align-items-center">به سامانه آموزش مجازی خوش
                    آمدید</p>
                </div>
                <div class="column is-flex is-justify-content-center" v-if="loginHidden">

                  <b-notification ref="element" :closable="false">
                    <div class="column is-flex is-justify-content-flex-end">
                      <img class="image is-48x48" src="../../../../../public/img/logo.png">
                    </div>
                    <div class="field  is-family-iranSans is-flex is-justify-content-flex-end">
                      <label class="label is-size-5">ورود به بی نام</label>
                    </div>
                    <div class="field is-family-iranSans is-flex is-justify-content-flex-end">
                      <label class="label is-size-7">برای استفاده از خدمات بی نام، وارد حساب کاربری خود شوید</label>
                    </div>
                    <form method="post">
                      <div class="field login-mobileNumber">
                        <div class="control has-icons-left">
                          <b-field label="شماره همراه" :label-position="labelPosition">
                            <input autofocus @keyup="mobileNumber" v-model="mobile" class="input" id="mobile" maxlength="11"
                                   icon-right="cellphone" size="is-normal">
                          </b-field>
                        </div>
                      </div>

                      <div class="field">
                        <div class="column is-flex is-justify-content-center">
                          <b-button class="is-rounded is-success" @click.prevent="submitForm()">تأیید و ادامه</b-button>
                        </div>
                      </div>
                    </form>
                  </b-notification>
                </div>


                <div class="column is-flex is-justify-content-center" v-if="verifyHidden" >
                  <b-notification ref="element" :closable="false">
                    <div class="column is-flex is-justify-content-flex-end">
                      <img class="image is-48x48" src="../../../../../public/img/logo.png">
                    </div>
                    <div class="field  is-family-iranSans is-flex is-justify-content-flex-end">
                      <label class="label is-size-5">تایید</label>
                    </div>
                    <div class="field is-family-iranSans is-flex is-justify-content-flex-end">
                      <label class="label is-size-7"> رمز یک‌بار مصرف پیامک شد</label>
                    </div>
                    <div class="field is-family-iranSans is-flex is-justify-content-flex-end">
                      <label class="label is-size-7">
                        <b-button size="is-small" class="is-rounded is-warning" @click="backLogin()">ویرایش شماره
                        </b-button>
                      </label>
                    </div>
                    <div class="field login-mobileNumber">
                      <div class="control has-icons-left">
                        <div class="columns">
                          <div class="column code-input">
                            <input autofocus v-model="oneNumber" class="input verificationCode" type="text" maxlength="1" @keyup="onKeyup">
                            <input v-model="twoNumber" class="input verificationCode" type="text" maxlength="1" @keyup="onKeyup">
                            <input v-model="threeNumber" class="input verificationCode" type="text" maxlength="1" @keyup="onKeyup">
                            <input v-model="fourNumber" class="input verificationCode" type="text" maxlength="1" @keyup="onKeyup">
                            <input v-model="fiveNumber" class="input verificationCode" type="hidden" maxlength="1" @keyup="onKeyup">
                          </div>
                        </div>

                      </div>
                    </div>
                    <ResendCode v-show="!visibleGetCode"></ResendCode>
                    <div class="field">
                      <div class="column is-flex is-justify-content-center">
                        <b-button id="sub" class="button  is-success is-rounded "  @click="verifySubmit">تأیید و ادامه</b-button>
                      </div>
                    </div>

                  </b-notification>
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
import ResendCode from "../login/ResendCode";

export default {

  data() {
    return {
      labelPosition: 'on-border',
      mobile: null,
      verifyHidden: false,
      loginHidden: true,
      visibleGetCode: false,
      countDown : null,
      seconds : 10,
      myTimer : null,
      fields :  '',
      oneNumber:'',
      twoNumber:'',
      threeNumber:'',
      fourNumber:'',
      fiveNumber:'',
    }

  },
  name: "login",
  methods: {
/* start verify actions */

    backLogin(){
      this.verifyHidden = false
      this.loginHidden = true
         this.oneNumber=''
         this.twoNumber=''
         this.threeNumber=''
         this.fourNumber=''
         this.fiveNumber= ''
    },
    onKeyup(event) {
      event.target.value = event.target.value.replace(/[^0-9]/g, '')
      if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
        const next = event.target.nextElementSibling
        if (next === null) return
        event.target.nextElementSibling.focus()
      }
      this.getVerifyCodeFields()
    },
    getVerifyCodeFields: function () {

      let inputs = document.getElementsByClassName('verificationCode')
      this.fields = [].map.call(inputs, function (input) {
        return input.value;
      }).join('');
      if(this.fields.length >= 4){
        this.open()
      }
    },
    open() {
      this.visibleGetCode = true
      // const vm=this
      const loadingComponent = this.$buefy.loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el,
      })
      const form = new FormData();
      form.append("oneNumber", this.oneNumber);
      form.append("twoNumber", this.twoNumber);
      form.append("threeNumber", this.threeNumber);
      form.append("fourNumber", this.fourNumber);
      form.append("mobile", localStorage.getItem('mobile'));

      const headers = {'content-type': 'application/x-www-form-urlencoded'};
      axios.post("http://gholeydoon.ir/bbb/public/UserController/verifyCode",form, {headers})
          .then((data) => {
            this.isLoading = false
            loadingComponent.close()
            console.log(data)
            if(data.data.error_code != 0){
              this.$buefy.toast.open({
                message: data.data.error_message,
                type: 'is-danger',
                position: 'is-top',
              })
            }else {
              this.$cookies.set('mobile',data.data.feed.mobile);
              this.$cookies.set('token',data.data.feed.token);
              //console.log(this.$cookies.get('mobile'))
              //console.log(data)
              this.$router.push('/dashboard')
            }
            // vm.$router.push('/dashboard')
          })
    },
    verifySubmit () {
      if (this.fields.length < 4) {
        this.$buefy.toast.open({
          message: 'ورود کد تأیید الزامی است',
          type: 'is-warning',
          position: 'is-top',
        })
      } else {
        this.$router.push('/dashboard')
      }
    },

/* end verify actions */

    mobileNumber(event) {
      event.target.value = event.target.value.replace(/[^0-9]/g, '')
    },
    submitForm() {
      const form = new FormData();
      form.append("mobile", this.mobile);
      localStorage.mobile = this.mobile;
      let mobile = document.getElementById('mobile')
      if (mobile.value === '' || !(/^(\+98|0)?9\d{9}/g.test(mobile.value))) {
        this.$buefy.toast.open({
          message: 'شماره موبایل را وارد نمایید',
          type: 'is-warning',
          position: 'is-top',
        })
      } else {
        this.verifyHidden = true
        this.loginHidden = false
        const headers = {'content-type': 'application/x-www-form-urlencoded'};
        axios.post("http://gholeydoon.ir/bbb/public/UserController/loginOrRegister", form, {headers})
            .then(() => {
              this.isLoading = false
              // this.$router.push({name : 'VerifyCode' , params : this.$route.meta.title = this.VerifyCode})
            })
            .catch(() => {
              this.$buefy.toast.open({
                message: 'خطا در ارسال کد تأیید',
                type: 'is-danger',
                position: 'is-top',
              })
            })

      }
    },
  },
  created() {

    // history.pushState(null, null, document.URL);
    // window.addEventListener('popstate', function () {
    //   history.pushState(null, null, document.URL);
    // });
  },
  components: {
    ResendCode
  },
  mounted() {
    // if (this.$cookies.get('mobile') && this.$cookies.get('token')) {
    //   this.$router.push('/dashboard')
    // }
    // const form = new FormData();
    // form.append("mobile", this.$cookies.get('mobile'));
    // form.append("mobile", this.$cookies.get('token'));
    // const headers = {'content-type': 'application/x-www-form-urlencoded'};
    // axios.post("http://gholeydoon.ir/bbb/public/BBBController/checkLogin", {headers})
    //     .then((data) => {
    //       console.log(data.data)
    //       if(data.data.feed.isLoggedIn) {
    //         this.$cookies.set('mobile',data.data.feed.mobile);
    //         this.$cookies.set('token',data.data.feed.token);
    //         this.$router.push('/dashboard')
    //       }
    //     })
  },

};
</script>