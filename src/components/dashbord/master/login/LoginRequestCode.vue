<template>
  <section>
    <div class="columns">
      <div class="column is-flex is-justify-content-center">
        <progress v-show="!visibleGetCode" class="progress progress-height is-warning" value="100" max="100">100%</progress>
      </div>
      <div class="column is-flex is-justify-content-center">
        <a class="is-family-iranSans" size="is-small" v-show="visibleGetCode" @click="secondsInterval();visibleGetCode = !visibleGetCode">دریافت مجدد کد</a>
        <label v-show="!visibleGetCode" class="label is-family-iranSans is-size-7">مهلت ورود کد تأیید
          <span id="timer"></span>
        </label>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  data() {
    return {
      labelPosition: 'on-border',
      visibleGetCode: false,
      countDown : null,
      seconds : 5,
      myTimer : null,
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
      let minutes = Math.floor(this.seconds / 60),
          remSeconds = this.seconds % 60;

      if (remSeconds < 10) {
        remSeconds = "0" + remSeconds;
      }

      this.myTimer.innerHTML = minutes + ":" + remSeconds;

      if (this.seconds > 0) {
        this.seconds = this.seconds - 1;

        progress.value = Math.floor(this.seconds * 1.71)
      } else {
        $vm.visibleGetCode = true
        clearInterval(this.countDown);
        this.seconds = 5
      }

    },
   // threesInterval() {
   //    this.secondsInterval()
   //   this.visibleGetCode = true
   // }
  },

  mounted() {

    this.secondsInterval()

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