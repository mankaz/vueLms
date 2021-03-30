<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column container is-two-thirds is-max-desktop">
            <div class="box login-box-padding">
              <div class="columns login-height">
                <div class="column login-border-rad auth-img is-flex is-justify-content-center"></div>
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
                          </div>
                        </div>

                      </div>
                    </div>
                      <div class="columns">
                        <div class="column is-flex is-justify-content-center"><progress v-if="!visibleGetCode" class="progress progress-height is-warning" value="100" max="100">100%</progress></div>
                        <div class="column is-flex is-justify-content-center">  <router-link class="is-family-iranSans" size="is-small" v-if="visibleGetCode" to="/login">دریافت مجدد کد</router-link><label v-if="!visibleGetCode" class="label is-family-iranSans is-size-7">مهلت ورود کد تأیید <span id="timer"></span> </label></div>
                      </div>
                    <div class="field">
                      <div class="column is-flex is-justify-content-center">
                        <button class="button  is-success is-rounded " tag="router-link" @click="getCode()">تأیید و ادامه</button>
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

export default {
  data() {
    return {
      labelPosition: 'on-border',
      visibleGetCode: false
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
      }
      return
    },
    getCode: function () {
      let inputs = document.getElementsByClassName('verificationCode'),
          names = [].map.call(inputs, function (input) {
            return input.value;
          }).join('');
      alert(names);
      this.$router.push('/dashboard')
    }
  },
  mounted() {
    let progress = document.querySelector('progress')
    let $vm = this;
    let seconds = 60,
        myTimer = document.getElementById("timer"),
        countDown = setInterval(secondsInterval, 1000);

    function secondsInterval() {
      "use strict";
      let minutes = Math.floor(seconds / 60),
          remSeconds = seconds % 60;

      if (remSeconds < 10) {

        remSeconds = "0" + remSeconds;
      }

      myTimer.innerHTML = minutes + ":" + remSeconds;

      if (seconds > 0) {
        seconds = seconds - 1;
        progress.value = Math.floor(seconds * 1.71)
      } else {
        $vm.visibleGetCode = true
        clearInterval(countDown);
      }

    }

  }
};
</script>