<template>
  <section>
    <vs-row ref="content" class="column is-10-desktop is-10-tablet is-8-mobile">
      <div class="box">
        <div class="columns">
          <div class="column control services-btn is-flex is-justify-content-left">
          </div>
          <div class="is-flex is-justify-content-flex-end">
            <div class="media-content">
              <small class="is-size-6 is-family-iranSans  dir-ltr">تکمیل پروفایل کاربری<b-icon icon="account-multiple-plus" size="is-normal"></b-icon></small>
            </div>
          </div>
        </div>
        <form  method="post" @submit.prevent="addUsers()" ref="userForm" v-if="contentLoading">
          <div class="block is-flex is-justify-content-center">
            <div class="column  is-5-desktop">

              <div class="columns is-flex is-justify-content-flex-end">
                <div class="column">
                  <vs-input v-model="username"  icon-after  placeholder="نام کاربری" >
                    <template #icon>
                      <i class='bx bx-user'></i>
                    </template>
                  </vs-input>
                </div>
                <div class="column">
                  <vs-input  v-model="name"  icon-after  placeholder="نام" >
                    <template #icon>
                      <i class='bx bx-text'></i>
                    </template>
                  </vs-input>
                </div>
              </div>

              <div justify="center" class="columns is-flex is-justify-content-flex-end">

                <div class="column">
                  <vs-input
                      id="confirmPassword"
                      class="vs-input-password"
                      type="password"
                      v-model="value2"
                      placeholder="تکرار رمز عبور"
                      :progress="getProgress2"
                      :visiblePassword="hasVisibleConfirmPassword"
                      icon-after
                      @keyup="getProgress2"
                      @click-icon="hasVisibleConfirmPassword = !hasVisibleConfirmPassword">
                    >
                    <template #icon>
                      <i v-if="!hasVisibleConfirmPassword" class='bx bx-show-alt'></i>
                      <i v-else class='bx bx-hide'></i>
                    </template>

                    <template v-if="getProgress2 >= 100" #message-success>
                      رمز عبور مطمئن
                    </template>
                  </vs-input>
                </div>
                <div class="column">
                  <vs-input
                      id="password"
                      class="vs-input-password"
                      type="password"
                      v-model="value"
                      placeholder="رمز عبور"
                      :progress="getProgress"
                      :visiblePassword="hasVisiblePassword"
                      icon-after
                      @keyup="getProgress2"
                      @click-icon="hasVisiblePassword = !hasVisiblePassword">
                    >
                    <template #icon>
                      <i v-if="!hasVisiblePassword" class='bx bx-show-alt'></i>
                      <i v-else class='bx bx-hide'></i>
                    </template>

                    <template v-if="getProgress >= 100" #message-success>
                      رمز عبور مطمئن
                    </template>
                  </vs-input>
                <span class="is-family-iranSans is-size-7 is-rtl"> {{message}}</span>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <vs-input  v-model="email"  icon-after  placeholder="ایمیل">
                    <template #icon>
                      <i class='bx bx-mail-send'></i>
                    </template>
                  </vs-input>
                </div>

                <div class="column  is-flex is-align-items-center is-justify-content-center">
                  <vs-input  v-model="mobile"  icon-after  placeholder="شماره همراه">
                    <template #icon>
                      <i class='bx bx-mobile'></i>
                    </template>
                  </vs-input>
                </div>

              </div>

              <div class="column is-flex is-justify-content-center">
                <vs-button success>
                  ثبت    <i class="bx bx-check"></i>
                </vs-button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </vs-row>

  </section>



</template>
<!-- eslint-disable -->
<script>
import axios from "axios";

export default {
  data() {
    return {
      value: '',
      value2: '',
      message:'',
      hasVisiblePassword: false,
      hasVisibleConfirmPassword: false,
      name:'',
      username:'',
      pass:'',
      mobile:'',
      email:'',
      className : '',
      contentLoading:false,
      progress: 0,
    }
  },
  watch: {
    courses: function() {
      // Clear previously selected values
      this.meetings = "";
      // Populate list first dropdown
      if (this.courses.length > 0) {
        // this.meetings = this.selectList[this.courses]
        const form = new FormData();
        form.append("courseId", this.courses);
        const headers = {'content-type': 'application/x-www-form-urlencoded'};
        axios
            .post('https://gholeydoon.ir/bbb/public/BBBController/getMeetings',form, {headers})
            .then((response)=> {
              this.posts = response.data
              this.meetings = this.posts
            })
      }
    },
  },
  methods : {
    getProgress2(){
      if (this.value === this.value2) {
       this.message = ''
      } else {
      this.message = 'رمز عبورها یکسان نیستند'
      }
    }

  },
    computed: {
      getProgress() {
        let progress = 0
        // at least one special character

        if (/[^A-Za-z0-9]/.test(this.value)) {
          progress += 20
        }
        // at least one capital letter

        if (/(.*[A-Z].*)/.test(this.value)) {
          progress += 20
        }
        // at menons a lowercase

        if (/(.*[a-z].*)/.test(this.value)) {
          progress += 20
        }

        // at least one number

        if (/\d/.test(this.value)) {
          progress += 20
        }

        // more than 8 digits

        if (this.value.length >= 8) {
          progress += 20
        }

        return progress
      },

  },
  mounted() {
    const loading = this.$vs.loading({
      target: this.$refs.content,
      scale: '0.6',
      progress: 0,
      opacity: 0.1,
    })
    const interval = setInterval(() => {
      if (this.progress <= 100) {
        loading.changeProgress(this.progress++)
      }
    })
    const headers = {'content-type': 'application/x-www-form-urlencoded'};
    axios.post("https://gholeydoon.ir/bbb/public/BBBController/getCourses", {headers, })
        .then((data)=> {
          this.selectList = data.data
          loading.close()
          clearInterval(interval)
          this.progress = 0
          this.contentLoading= true
          // console.log(this.selectList)
        })
  },
}
</script>