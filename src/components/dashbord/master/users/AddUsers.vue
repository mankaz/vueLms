
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
        <form method="post" @submit.prevent="addUsers()" >
          <div class="block is-flex is-justify-content-center">
            <div class="column  is-8-desktop">
              <div class="columns">

                <div class="column">
                  <b-field  label="ایمیل" :label-position="labelPosition">
                    <b-input v-model="email"></b-input>
                  </b-field>
                </div>
                <div class="column">
                  <b-field  label="نام" :label-position="labelPosition">
                    <b-input v-model="name"></b-input>
                  </b-field>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                    <b-field  label="* رمز عبور" :label-position="labelPosition">
                      <b-input v-model="pass"></b-input>
                    </b-field>
                </div>
                <div class="column">
                  <b-field  label="* نام کاربری" :label-position="labelPosition">
                    <b-input v-model="username"></b-input>
                  </b-field>
                </div>

              </div>
              <div class="columns">

                <div class="column  is-flex is-align-items-center is-justify-content-center">
                  <b-field  label="موبایل" :label-position="labelPosition">
                    <b-input v-model="mobile"></b-input>
                  </b-field>
                </div>

              </div>
              <div class="columns">
                <div class="column  is-flex is-align-items-center is-justify-content-center">
<!--                  <b-field>-->
<!--                    <b-select placeholder="نقش کاربر" v-model="courseId">-->
<!--                      <option-->
<!--                          v-for="option in selectList"-->
<!--                          :value="option.id"-->
<!--                          :key="option.id">-->
<!--                        {{ option.title}}-->
<!--                      </option>-->
<!--                    </b-select>-->
<!--                  </b-field>-->
                  <b-field>
                  <b-select :disabled="meetings.length == 0" v-model="selectedMeeting">
                    <option value="" disabled>انتخاب کلاس مورد نظر</option>
                    <!--                <option v-for="(city_obj, city) in meetings">{{city.meeting_name}}</option>-->
                    <option
                        v-for="option in meetings"
                        :value="option.id"
                        :key="option.id">
                      {{ option.meeting_name}}
                    </option>
                  </b-select>
                  </b-field>
                </div>
                <div class="column is-flex is-align-items-center is-justify-content-center">
                  <b-field>
                    <b-select  v-model="courses">
                      <option value="" disabled>انتخاب دوره مورد نظر</option>
                      <!--                <option v-for="(country_obj, country) in selectList" :value="country">{{country}}</option>-->
                      <option
                          v-for="option in selectList"
                          :value="option.id"
                          :key="option.id">
                        {{ option.title}}
                      </option>
                    </b-select>
                  </b-field>
                </div>
              </div>
              <div class="excel">
                <div class="columns  is-justify-content-flex-end">

                  <h6 class="is-size-6">:ورود کاربران بصورت گروهی از اکسل  <b-icon icon="microsoft-excel"></b-icon></h6>
                </div>
                <div class="columns is-justify-content-flex-end">
                  <b-field>
                    <b-field class="file is-warning" :class="{'has-name': !!file2}">
                      <b-upload :name="file2" :id="file2" v-model="file2" class="file-label" rounded>
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
              <div class="column is-flex is-justify-content-center"> <button class="button is-size-6 is-success is-rounded ">
                <span class="is-size-6">ایجاد کاربر</span>
                <span class="icon is-small">
                 <i class="fas fa-check"></i>
                 </span>
              </button>
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
      course : '',
      file2: null,
      labelPosition: 'on-border',
      selectList:null,
      posts:null,
      meetings: "",
      courses: null,
      selectedMeeting: "",
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
        form.append("courseId", this.course);
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