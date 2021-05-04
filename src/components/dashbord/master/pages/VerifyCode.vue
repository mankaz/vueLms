<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column container is-two-thirds is-max-desktop">
            <div class="box login-box-padding">
              <div class="columns login-height">
                <div class="column login-border-rad auth-img is-flex  is-justify-content-center">
                  <p class="is-family-iranSans has-text-white is-flex is-align-items-center">به سامانه آموزش مجازی خوش آمدید</p>
                </div>

                <div class="column is-flex is-justify-content-center">
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
                        <b-button size="is-small" class="is-rounded is-warning" tag="router-link"
                                  :to="{ path: '/login' }" exact>ویرایش شماره
                        </b-button>
                      </label>
                    </div>
                    <div class="field login-mobileNumber">
                      <div class="control has-icons-left">
                        <div class="columns">
                          <div class="column code-input">
                            <input v-model="oneNumber" class="input verificationCode" type="text" maxlength="1" @keyup="onKeyup" autofocus>
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
                        <b-button id="sub" class="button  is-success is-rounded "  @click="submitForm">تأیید و ادامه</b-button>
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
import ResendCode from "../login/ResendCode";
import axios from "axios";
export default {
  data() {
    return {
      labelPosition: 'on-border',
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
          .catch((data)=> {
            console.log(data.data.error_code)
            this.$buefy.toast.open({
              message: 'خطا در ویرایش کلاس',
              type: 'is-danger',
              position: 'is-top',
            })
          })
    },
    submitForm () {
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
  },
  created() {
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL);
    });
  },
  mounted() {
// this.getCode()

  },
  beforeDestroy () {
    clearInterval(this.countDown);
  },
  components : {
    ResendCode
  },
};
</script>