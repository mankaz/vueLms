<template>
  <section>
    <div class="columns">
      <div class="column is-flex is-justify-content-center">
        <progress v-show="!visibleGetCode" class="progress progress-height is-warning" value="100" max="100">100%
        </progress>
      </div>
      <div class="column repeat-code container is-flex is-justify-content-center">
        <a class="is-family-iranSans" size="is-small" v-show="visibleGetCode"
           @click="sendNewCode();visibleGetCode = !visibleGetCode">دریافت مجدد کد</a>
        <label v-show="!visibleGetCode" class="label is-family-iranSans is-size-7">مهلت ورود کد تأیید
          <span id="timer"></span>
        </label>
      </div>
    </div>
  </section>
</template>

<script>


import axios from "axios";

export default {
  data() {
    return {
      labelPosition: 'on-border',
      visibleGetCode: false,
      countDown: null,
      seconds: 60,
      myTimer: null,
    }
  },
  name: "login",

  methods: {

    secondsInterval: function () {
      let $vm = this;
      // console.log(this.myTimer)
      clearInterval(this.countDown);


      let progress = document.querySelector('progress')
      this.myTimer = document.querySelector("#timer")
      this.countDown = setInterval(this.secondsInterval, 1000);
      let minutes = Math.floor(this.seconds / 60);
      let getTimeStore
      getTimeStore = this.seconds % 60;
      if (getTimeStore < 10) {
        getTimeStore = "0" + getTimeStore;
      }
      this.myTimer.innerHTML = "0" + minutes + ":" + getTimeStore;
      if (this.seconds > 0) {
        this.seconds = this.seconds - 1;
        localStorage.seconds = this.seconds ;
        progress.value = Math.floor(this.seconds * 1.71)
      } else {
        $vm.visibleGetCode = true
        clearInterval(this.countDown);
        this.seconds = 60
      }
    },
   sendNewCode() {

      this.visibleGetCode = true
      const form = new FormData();
      form.append("mobile", localStorage.getItem('mobile'));
      const headers = {'content-type': 'application/x-www-form-urlencoded'};
      axios.post("http://gholeydoon.ir/bbb/public/UserController/loginOrRegister",form, {headers})
          .then(() => {
            console.log(localStorage.getItem('mobile'))
           this.secondsInterval()
          })
    },
  },
  mounted() {
    this.secondsInterval()
  },
  beforeDestroy() {
    clearInterval(this.countDown);
  },

};
</script>