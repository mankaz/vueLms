
<!-- eslint-disable -->
<template>
  <section>
    <div class="column is-10-desktop is-10-tablet is-8-mobile">
      <div class="box">
        <div class="columns">
          <div class="column control services-btn is-flex is-justify-content-left">
            <b-button  type="is-success" class="is-size-7" icon-right="arrow-left-bold"  tag="router-link" rounded :to="{ path: '/Users' }" exact>
              بازگشت
            </b-button>
          </div>
          <div class="is-flex is-justify-content-flex-end">
            <div class="media-content">
              <small class="is-size-6 is-family-iranSans is-size-5 dir-ltr">   ایجاد کاربر<b-icon icon="account-multiple-plus" size="is-normal"></b-icon></small>
            </div>
          </div>
        </div>
        <b-notification ref="element" :closable="false">
        <form  method="post" @submit.prevent="addUsers()" >
          <div class="block is-flex is-justify-content-center">
            <div class="column  is-5-desktop">

              <div class="columns is-flex is-justify-content-flex-end">
                <div class="column">
                  <vs-input :disabled='!isDisabled' v-model="email"  icon-after  placeholder="ایمیل" >
                    <template #icon>
                      <i class='bx bx-mail-send'></i>
                    </template>
                  </vs-input>
                </div>
                <div class="column">
                  <vs-input :disabled='!isDisabled' v-model="name"  icon-after  placeholder="نام" >
                    <template #icon>
                      <i class='bx bx-text'></i>
                    </template>
                  </vs-input>
                </div>
              </div>

              <div justify="center" class="columns is-flex is-justify-content-flex-end">
                <div class="column">
                  <vs-input :disabled='!isDisabled' v-model="pass"  icon-after  placeholder="رمز عبور" >
                    <template #icon>
                      <i class='bx bx-shield-alt-2'></i>
                    </template>
                  </vs-input>
                </div>
                <div class="column">
                  <vs-input :disabled='!isDisabled' v-model="username"  icon-after  placeholder="نام کاربری" >
                    <template #icon>
                      <i class='bx bx-user'></i>
                    </template>
                  </vs-input>
                </div>

              </div>
              <div class="columns">

                <div class="column  is-flex is-align-items-center is-justify-content-center">
                  <b-field  label="موبایل" :label-position="labelPosition">
                    <b-input :disabled='!isDisabled' v-model="mobile"></b-input>
                  </b-field>
                </div>

              </div>
              <div class="columns">
                <div class="column  is-flex is-align-items-center is-justify-content-center">
                  <vs-select :disabled="meetings.length == 0" filter placeholder="انتخاب کلاس مورد نظر" v-model="selectedMeeting" v-if="meetings">
                    <vs-option  v-for="option in meetings" :value="option.id" :key="option.id" :label="option.meeting_name">
                      {{ option.meeting_name}}
                    </vs-option>
                  </vs-select>
                </div>
                <div class="column is-flex is-align-items-center is-justify-content-center">
                  <vs-select :disabled='!isDisabled' filter placeholder="انتخاب دوره" v-model="courses" v-if="selectList">
                    <vs-option  v-for="option in selectList" :value="option.id" :key="option.id" :label="option.title">
                      {{ option.title}}
                    </vs-option>
                  </vs-select>
                </div>
              </div>
              <div class="excel">
                <div class="columns  is-justify-content-flex-end">
                  <span>ورود کاربران بصورت گروهی از اکسل</span>
                  <vs-checkbox v-model="disable">
                  </vs-checkbox>
                </div>
                <div class="columns is-justify-content-flex-end">
                  <b-field>
                    <b-field class="file is-info" :class="{'has-name': !!file2}" >
                      <b-upload :name="file2" :id="file2" v-model="file2" class="file-label" :disabled='isDisabled' rounded>
                          <span class="file-cta">
                              <b-icon class="file-icon" icon="upload"></b-icon>
                           <span class="is-size-6">انتخاب فایل اکسل</span>
                          </span>
                        <span class="file-name" v-if="file2">
                            {{ file2.name }}
                </span>
                      </b-upload>
                    </b-field>
                  </b-field>
                </div>
              </div>
              <div class="column is-flex is-justify-content-center">
                <vs-button success>
                  ایجاد کاربر    <i class="bx bx-check"></i>
                </vs-button>
              </div>
            </div>
          </div>
        </form>

        </b-notification>
      </div>
    </div>

  </section>



</template>
<!-- eslint-disable -->
<script>
import axios from "axios";


export default {
  data() {
    return {
        // courseId:null,
      name:'',
      username:'',
      pass:'',
      mobile:'',
      email:'',
      className : '',
      // course : '',
      file2: null,
      labelPosition: 'on-border',
      selectList:null,
      posts:null,
      meetings: "",
      courses: '',
      selectedMeeting: "",
      disable: false
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
            .post('http://gholeydoon.ir/bbb/public/BBBController/getMeetings',form, {headers})
            .then((response)=> {
              this.posts = response.data
              this.meetings = this.posts
            })
      }
    },
  },
  methods : {
    addUsers : function () {
      if(this.name === '') {
        this.$buefy.toast.open({
          message: 'اسم کاربر را وارد نمایید',
          type: 'is-warning',
          position: 'is-top',
        })

      }else if(this.pass === ''){
        this.$buefy.toast.open({
          message: 'رمز عبور کاربر را وارد نمایید',
          type: 'is-warning',
          position: 'is-top',
        })
      }
      else if(this.username === ''){
        this.$buefy.toast.open({
          message: 'نام کاربری را وارد نمایید',
          type: 'is-warning',
          position: 'is-top',
        })
      } else {

        const form = new FormData();
        form.append("name", this.name);
        form.append("mobile", this.mobile);
        form.append("courseId", this.courses);
        form.append("meetingId", this.selectedMeeting);
        form.append("username", this.username);
        form.append("pass", this.pass);
        form.append("email", this.email);
        form.append("file2", this.file2);
        const headers = { 'content-type': 'application/x-www-form-urlencoded' };
        const loadingComponent = this.$buefy.loading.open({
          container: this.isFullPage ? null : this.$refs.element.$el,
        })
        axios.post("https://gholeydoon.ir/bbb/public/userController/insertMeetingUser",form, {headers, })
            .then((res)=> {
              console.log(res)
              loadingComponent.close()
              this.$buefy.toast.open({
                message: 'کاربر با موفقیت ایجاد شد',
                type: 'is-success',
                position: 'is-top',
              })
              console.log(res)
            })
            .catch(err=> {
              loadingComponent.close()
              this.$buefy.toast.open({
                message: 'خطا در ایجاد کاربر',
                type: 'is-danger',
                position: 'is-top',
              })
              console.log(err)
            })
      }

    }

  },
  computed : {
    isDisabled: function(){
      return !this.disable;
    }
  },
  mounted() {
    const headers = {'content-type': 'application/x-www-form-urlencoded'};
    axios.post("http://gholeydoon.ir/bbb/public/BBBController/getCourses", {headers, })
        .then((data)=> {
          this.selectList = data.data
          // console.log(this.selectList)
        })
  },
  components : {

  }
}
</script>