
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
              <small class="is-size-6 is-family-iranSans is-size-5 dir-ltr">   ویرایش کاربر<b-icon icon="account-multiple-plus" size="is-normal"></b-icon></small>
            </div>
          </div>
        </div>
        <b-notification ref="element" :closable="false">
        <form  method="post" @submit.prevent="editUser()" >
          <div class="block is-flex is-justify-content-center">
            <div class="column  is-8-desktop">
              <div class="columns">

                <div class="column">
                  <b-field  label="ایمیل" :label-position="labelPosition">
                    <b-input  v-model="email"></b-input>
                  </b-field>
                </div>
                <div class="column">
                  <b-field  label="نام" :label-position="labelPosition">
                    <b-input  v-model="name"></b-input>
                  </b-field>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                    <b-field  label="* رمز عبور" :label-position="labelPosition">
                      <b-input  v-model="pass"></b-input>
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
                    <b-input  v-model="mobile"></b-input>
                  </b-field>
                </div>

              </div>
              <div class="columns">
                <div class="column  is-flex is-align-items-center is-justify-content-center">
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
                    <b-select  placeholder="انتخاب دوره مورد نظر" v-model="courses">
                      <option value="انتخاب دوره مورد نظر">انتخاب دوره مورد نظر</option>
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
              <div class="column is-flex is-justify-content-center"> <button class="button is-size-6 is-success is-rounded ">
                <span class="is-size-6">ویرایش کاربر</span>
                <b-icon  icon="pencil-outline"></b-icon>
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
      routeParam: this.$route.params.id,
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
      courses: null,
      selectedMeeting: "",
    }
  },
  created() {
    if (this.$route.params.data){
      this.routeData = this.$route.params.data
    }else
      this.$router.push({name: 'users'})
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

  methods: {

    editUser() {

      this.isLoading = true
      const form = new FormData();
      form.append("className", this.routeData['meeting_name']);
      form.append("courseId", this.routeData['course_id']);
      form.append("classStartDate", this.routeData['start_time']);
      form.append("classEndDate", this.routeData['end_time']);
      form.append("classDescription", this.routeData['description']);
      form.append("classId", this.routeData['id']);
      form.append("file2", this.file2);
      console.log(this.routeData['end_time'])
      const headers = {'content-type': 'application/x-www-form-urlencoded'};
      axios.post("http://gholeydoon.ir/bbb/public/BBBController/updateMeeting", form, {headers})
          .then(() => {
            this.isLoading = false
            this.className=''
            this.course= '',
                this.classStartDate= '',
                this.classEndDate= '',
                this.classDescription= '',
                this.file2= null,
                this.$buefy.toast.open({
                  message: 'کلاس مورد نظر با موفقیت ویرایش شد',
                  type: 'is-success',
                  position: 'is-top',
                })
          })
          .catch(()=> {
            this.$buefy.toast.open({
              message: 'خطا در ویرایش کلاس',
              type: 'is-danger',
              position: 'is-top',
            })
          })

    },
  },
  mounted() {
    const headers = {'content-type': 'application/x-www-form-urlencoded'};
    axios.post("http://gholeydoon.ir/bbb/public/BBBController/getCourses", {headers, })
        .then((data)=> {
          this.selectList = data.data
          // console.log(this.selectList)
        })
  },
  components: {

  }
}
</script>