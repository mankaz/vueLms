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
                    <form method="post" @submit.prevent="submitForm('2000', 'button-right',`<i class='bx bx-info-circle'></i>`)">
                      <div class="column  is-10-desktop">
                      <div class="field login-mobileNumber">
                        <div class="control has-icons-left">
                          <vs-input id="mobile"  @keyup="mobileNumber" v-model="mobile"  icon-after  placeholder="شماره همراه" maxlength="11">
                            <template #icon>
                              <i class='bx bx-mobile'></i>
                            </template>
                          </vs-input>
                        </div>
                      </div>
                      </div>
                      <div class="field">
                        <div class="column is-flex is-justify-content-center">
                          <vs-button success >
                            تأیید و ادامه    <i class="bx bx-check"></i>
                          </vs-button>
                        </div>
                      </div>
                    </form>
                  </b-notification>
                </div>


                <div class="column is-flex is-justify-content-center" v-if="verifyHidden" >
                  <div class="column  is-10-desktop">
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
                        <a class="is-family-iranSans is-warning" size="is-small" @click="mobileEdit()">
                          ویرایش شماره    <i class="bx bx-edit"></i>
                        </a>
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
                        <vs-button id="sub" success @click="verifySubmit">تأیید و ادامه</vs-button>
                      </div>
                    </div>
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
import ResendCode from "../login/ResendCode";

export default {

  data() {
    return {
      labelPosition: 'on-border',
      mobile: '',
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

    mobileEdit(){
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
    open(duration,position = null, icon) {
      this.visibleGetCode = true
      // const vm=this
      const loading = this.$vs.loading({
        target: this.$refs.content,
        scale: '0.6',
        opacity: 0.3,
      })
      const form = new FormData();
      form.append("oneNumber", this.oneNumber);
      form.append("twoNumber", this.twoNumber);
      form.append("threeNumber", this.threeNumber);
      form.append("fourNumber", this.fourNumber);
      form.append("mobile", localStorage.getItem('mobile'));

      const headers = {'content-type': 'application/x-www-form-urlencoded'};
      axios.post("https://gholeydoon.ir/bbb/public/UserController/verifyCode",form, {headers})
          .then((data) => {
            loading.close()
            // console.log(data)
            if(data.data.error_code !== 0){
              // eslint-disable-next-line no-unused-vars
              const noti = this.$vs.notification({
                duration,
                icon,
                color:'danger',
                position,
                progress: 'auto',
                title: data.data.error_message,
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
    verifySubmit (duration,position = null, icon) {
      if (this.fields.length < 4) {
        // eslint-disable-next-line no-unused-vars
        const noti = this.$vs.notification({
          duration,
          icon,
          color:'warn',
          position,
          progress: 'auto',
          title: 'ورود کد تأیید الزامی است',
        })
      } else {
        this.$router.push('/dashboard')
      }
    },

/* end verify actions */

    mobileNumber(event) {
      event.target.value = event.target.value.replace(/[^0-9]/g, '')
    },
    submitForm(duration,position = null, icon) {
      const form = new FormData();
      form.append("mobile", this.mobile);
      localStorage.mobile = this.mobile;
      // let mobile = document.getElementById('mobile')
      if (this.mobile === '') {
        // eslint-disable-next-line no-unused-vars
        const noti = this.$vs.notification({
          duration,
          icon,
          color:'warn',
          position,
          progress: 'auto',
          title: 'شماره موبایل را وارد نمایید',
        })
      // } else if (!(/(\+98|0)?9\d{9}/.test(this.mobile.value))) {
      //   // eslint-disable-next-line no-unused-vars
      //   const noti = this.$vs.notification({
      //     duration,
      //     icon,
      //     color: 'warn',
      //     position,
      //     progress: 'auto',
      //     title: 'شماره موبایل وارد شده صحیح نمی باشد',
      //   })
      }else{
        this.verifyHidden = true
        this.loginHidden = false
        const headers = {'content-type': 'application/x-www-form-urlencoded'};
        axios.post("https://gholeydoon.ir/bbb/public/UserController/loginOrRegister", form, {headers})
            .then(() => {
              this.isLoading = false
              // this.$router.push({name : 'VerifyCode' , params : this.$route.meta.title = this.VerifyCode})
            })
            .catch(() => {
              // eslint-disable-next-line no-unused-vars
              const noti = this.$vs.notification({
                duration,
                icon,
                color:'danger',
                position,
                progress: 'auto',
                title: 'خطا در ارسال کد تأیید',
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