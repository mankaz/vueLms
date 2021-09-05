<template>
  <section>
    <vs-row ref="content" class="column is-10-desktop is-10-tablet is-8-mobile">
      <div class="box">
        <div class="columns">
          <div class="column control services-btn is-flex is-justify-content-left">
          </div>
          <div class="is-flex is-justify-content-flex-end">
            <div class="media-content">
              <small class="is-size-6 is-family-iranSans  dir-ltr">   ایجاد کاربر<b-icon icon="account-multiple-plus" size="is-normal"></b-icon></small>
            </div>
          </div>
        </div>
        <form  method="post" @submit.prevent="addUsers()" ref="userForm" v-if="contentLoading">
          <div class="block is-flex is-justify-content-center">
            <div class="column  is-5-desktop">

              <div class="columns is-flex is-justify-content-flex-end">
                <div class="column">
                  <vs-input :disabled='!isDisabled' v-model="email"  icon-after  placeholder="ایمیل" v-if="isDisabled">
                    <template #icon>
                      <i class='bx bx-mail-send'></i>
                    </template>
                  </vs-input>
                </div>
                <div class="column">
                  <vs-input :disabled='!isDisabled' v-model="name"  icon-after  placeholder="نام" v-if="isDisabled">
                    <template #icon>
                      <i class='bx bx-text'></i>
                    </template>
                  </vs-input>
                </div>
              </div>

              <div justify="center" class="columns is-flex is-justify-content-flex-end">
                <div class="column">
                  <vs-input :disabled='!isDisabled' v-model="pass"  icon-after  placeholder="رمز عبور" v-if="isDisabled">
                    <template #icon>
                      <i class='bx bx-shield-alt-2'></i>
                    </template>
                  </vs-input>
                </div>
                <div class="column">
                  <vs-input :disabled='!isDisabled' v-model="username"  icon-after  placeholder="نام کاربری" v-if="isDisabled">
                    <template #icon>
                      <i class='bx bx-user'></i>
                    </template>
                  </vs-input>
                </div>

              </div>
              <div class="columns">

                <div class="column  is-flex is-align-items-center is-justify-content-center">
                  <vs-input :disabled='!isDisabled' v-model="mobile"  icon-after  placeholder="شماره همراه" v-if="isDisabled">
                    <template #icon>
                      <i class='bx bx-mobile'></i>
                    </template>
                  </vs-input>
                </div>

              </div>
              <div class="columns">
                <div class="column  is-flex is-align-items-center is-justify-content-center">
                  <vs-select autocomplete="off" :disabled="meetings.length == 0" filter placeholder="انتخاب کلاس مورد نظر" v-model="selectedMeeting" v-if="meetings">
                    <vs-option  v-for="option in meetings" :value="option.id" :key="option.id" :label="option.meeting_name">
                      {{ option.meeting_name}}
                    </vs-option>
                  </vs-select>
                </div>
                <div class="column is-flex is-align-items-center is-justify-content-center">
                  <vs-select  filter placeholder="انتخاب دوره" v-model="courses" v-if="selectList">
                    <vs-option  v-for="option in selectList" :value="option.id" :key="option.id" :label="option.title">
                      {{ option.title}}
                    </vs-option>
                  </vs-select>
                </div>
              </div>
              <div class="excel">
                <div class="columns  is-justify-content-flex-end">
                  <span class="is-size-6">ورود کاربران بصورت گروهی از اکسل</span>
                  <vs-checkbox id="excelCheckBox" v-model="disable">
                  </vs-checkbox>
                </div>
                <div class="columns is-justify-content-flex-end">
                  <div class="file is-info has-name" v-if="!isDisabled">
                    <label class="file-label">
                      <input type="file" ref="fileName" class="file-upload" name="attachment[]" id="fileId" @change="onFileChange"  multiple>

                      <span class="file-cta">
                          <span class="file-icon">
                            <i class="fas fa-upload"></i>
                          </span>
                          <span class="file-label is-size-7">
                          بارگذاری فایل اکسل
                          </span>
                      </span>
                      <span class="file-name" v-if="fileName">
                    {{fileName}}
                         </span>
                    </label>
                  </div>
<!--                  <b-field>-->
<!--                    <b-field class="file is-info" :class="{'has-name': !!file2}" >-->
<!--                      <b-upload :name="file2" :id="file2" v-model="file2" class="file-label" :disabled='isDisabled' rounded>-->
<!--                          <span class="file-cta">-->
<!--                              <b-icon class="file-icon" icon="upload"></b-icon>-->
<!--                           <span class="is-size-6">انتخاب فایل اکسل</span>-->
<!--                          </span>-->
<!--                        <span class="file-name" v-if="file2">-->
<!--                            {{ file2.name }}-->
<!--                </span>-->
<!--                      </b-upload>-->
<!--                    </b-field>-->
<!--                  </b-field>-->
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
      disable: false,
      fileName:null,
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
            .post('http://gholeydoon.ir/bbb/public/BBBController/getMeetings',form, {headers})
            .then((response)=> {
              this.posts = response.data
              this.meetings = this.posts
            })
      }
    },
  },
  methods : {
    onFileChange(event, duration, position = null, icon) {
      let fileData = event.target.files[0];
      this.fileName = fileData.name;
      let filePath = this.$refs.fileName.value;
      let allowedExtensions = /(\.csv|\.xls|\.xlsx|\.xlsm|\.)$/i;
      if (!allowedExtensions.exec(filePath)) {
        this.$refs.fileName.value = null
        this.$vs.notification({
          duration,
          icon,
          color: 'primary',
          position,
          progress: 'auto',
          title: 'تنها مجاز به انتخاب فایل اکسل می باشید',
        })
        this.fileName = ""

      }
    },
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
        form.append("file2",this.$refs.fileName.files[0]);
        const headers = { 'content-type': 'application/x-www-form-urlencoded' };
        const loadingComponent = this.$buefy.loading.open({
          container: this.isFullPage ? null : this.$refs.element.$el,
        })
        axios.post("https://gholeydoon.ir/bbb/public/userController/insertMeetingUser",form, {headers, })
            .then((res)=> {
              console.log(res)
              loadingComponent.close()
              this.$vs.notification({
                duration,
                icon,
                color: 'success',
                position,
                progress: 'auto',
                title: 'کاربر با موفقیت ایجاد شد',
              })
              console.log(res)
            })
            .catch(err=> {
              loadingComponent.close()
              this.$vs.notification({
                duration,
                icon,
                color: 'success',
                position,
                progress: 'auto',
                title: 'خطا در ایجاد کاربر',
              })
              console.log(err)
            })
      }

    }

  },
  computed : {
    isDisabled: function(){
      this.name=''
      this.username=''
      this.pass=''
      this.mobile=''
      this.email=''
      this.className= ''
      return !this.disable;
    }
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
    axios.post("http://gholeydoon.ir/bbb/public/BBBController/getCourses", {headers, })
        .then((data)=> {
          this.selectList = data.data
          loading.close()
          clearInterval(interval)
          this.progress = 0
          this.contentLoading= true
          // console.log(this.selectList)
        })
  },
  components : {

  }
}
</script>