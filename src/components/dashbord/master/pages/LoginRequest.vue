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
                  <div class="column">
                    <div class="column is-flex is-justify-content-flex-end">
                      <img class="image is-48x48" src="../../../../assets/img/logo.png">
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
                            <input class="input verificationCode" type="text" maxlength="1" @keyup="onKeyup" autofocus>
                            <input class="input verificationCode" type="text" maxlength="1" @keyup="onKeyup">
                            <input class="input verificationCode" type="text" maxlength="1" @keyup="onKeyup">
                            <input class="input verificationCode" type="text" maxlength="1" @keyup="onKeyup">
                            <input class="input verificationCode" type="hidden" maxlength="1" @keyup="onKeyup">
                          </div>
                        </div>

                      </div>
                    </div>
                    <LoginRequestCode></LoginRequestCode>
                    <div class="field">
                      <div class="column is-flex is-justify-content-center">
                        <button ref="submit" class="button  is-success is-rounded " tag="router-link" >تأیید و ادامه</button>
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
import LoginRequestCode from "../login/LoginRequestCode";
export default {
  data() {
    return {
      labelPosition: 'on-border',
      visibleGetCode: false,
      countDown : null,
      seconds : 10,
      myTimer : null,
      submit : this.$refs.sub

    }
  },
  name: "login",

  methods: {
    onKeyup(event) {

      event.target.value = event.target.value.replace(/[^0-9]/g, '')
      // console.log(event.keyCode)
      if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
        const next = event.target.nextElementSibling
        if (next === null) return
        event.target.nextElementSibling.focus()
        // if(event.target.value){
        //   this.$refs.submit.click()
        // }
      }
      this.getCode()
      return
    },
    getCode: function () {
      let inputs = document.getElementsByClassName('verificationCode'),
          names = [].map.call(inputs, function (input) {
            return input.value;
          }).join('');
      if(names.length >= 4){
        console.log(names)
       // alert(names)
       //this.$refs.submit.click()
       //  alert(names);
        this.$router.push('/dashboard')
      }

    },



  },
  components : {
    LoginRequestCode
  },

  mounted() {
this.getCode()
    // let progress = document.querySelector('progress')
    // let $vm = this;
    // let seconds = 5, myTimer = document.getElementById("timer"), countDown = setInterval(secondsInterval, 1000);
    //
    // function secondsInterval() {
    //   'use strict';
    //   let minutes = Math.floor(seconds / 60),
    //       remSeconds = seconds % 60;
    //
    //   if (remSeconds < 10) {
    //
    //     remSeconds = "0" + remSeconds;
    //   }
    //
    //   myTimer.innerHTML = minutes + ":" + remSeconds;
    //
    //   if (seconds > 0) {
    //     seconds = seconds - 1;
    //     progress.value = Math.floor(seconds * 1.71)
    //   } else {
    //     $vm.visibleGetCode = true
    //     clearInterval(countDown);
    //   }
    //
    // }

  },
  beforeDestroy () {
    clearInterval(this.countDown);
  },

};
</script>