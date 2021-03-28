<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column container is-two-thirds is-max-desktop">
            <div  class="box login-box-padding">
              <div class="columns login-height">
                <div class="column login-border-rad auth-img is-flex is-justify-content-center"></div>
                <div class="column is-flex is-justify-content-center">
                  <div class="column">
                    <div class="column is-flex is-justify-content-flex-end">
                      <img class="image is-48x48" src="../../../../assets/img/logo.png">
                    </div>
                    <div class="field  is-family-iranSans is-flex is-justify-content-flex-end">
                      <label  class="label is-size-5">تایید</label>
                    </div>
                    <div class="field is-family-iranSans is-flex is-justify-content-flex-end">
                      <label  class="label is-size-7"> رمز یک‌بار مصرف پیامک شد</label>
                    </div>
                    <div class="field is-family-iranSans is-flex is-justify-content-flex-end">
                      <label  class="label is-size-7"><b-button size="is-small" class="is-rounded is-warning" @click="destroy()"  tag="router-link" :to="{ path: '/login' }" exact >ویرایش شماره</b-button></label>
                    </div>
                    <div class="field login-mobileNumber">
                      <div class="control has-icons-left">
                        <div class="columns">
                          <div class="column code-input">
                            <input class="input" type="text" maxlength="1" @keyup="onKeyup">
                            <input class="input" type="text" maxlength="1" @keyup="onKeyup">
                            <input class="input" type="text" maxlength="1" @keyup="onKeyup">
                            <input class="input" type="text" maxlength="1" @keyup="onKeyup">
                          </div>

                        </div>

                      </div>
                    </div>
                    <div class="field is-family-iranSans is-flex is-justify-content-flex-end">
                      <label  class="label is-size-7">ارسال مجدد کد تأیید تا <span id="timer"></span></label>
                      <router-link v-if="showdiv" to="/login">دریافت کد</router-link>
                    </div>
                    <div class="field">
                      <div class="column is-flex is-justify-content-center"> <button class="button is-success is-rounded ">تأیید و ادامه</button></div>
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
  data(){
    return {
      labelPosition: 'on-border',
      showdiv:false
    }

  },
  name: "login",
  methods: {
    onKeyup(event){
      event.target.value = event.target.value.replace(/[^0-9]/g,'')
      // console.log(event.keyCode)
      if((event.keyCode >= 48 && event.keyCode <= 57)||(event.keyCode >= 96&&event.keyCode<=105)){
        const next = event.target.nextElementSibling
        if(next === null) return
        event.target.nextElementSibling.focus()
      }
      return
    },

  },
  mounted() {
    let seconds = 2,

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
      } else {
        clearInterval(countDown);
        myTimer.innerHTML ='ddd'
      }

    }

  }
};
</script>