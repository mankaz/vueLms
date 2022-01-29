<!-- eslint-disable -->
<template>
  <section>
    <vs-row ref="content" class="column is-10-desktop is-10-tablet is-8-mobile">
      <div class="box">
    <div class="columns">
      <div class="column control services-btn is-flex is-justify-content-left">
        <vs-button warn class="is-size-7" :to="{ path: '/Class' }" exact>
           <i class="bx bx-arrow-back"></i><span class="ml-1">بازگشت</span>
        </vs-button>
      </div>
      <div class="is-flex is-justify-content-flex-end">
        <div class="media-content">
          <small class="is-family-iranSans is-size-5 dir-ltr">جزییات کلاس<b-icon icon="text-box-outline" size="is-normal"></b-icon></small>
          <p class="is-family-iranSans is-size-7">جزئیات کلاس ایجاد شده در این صفحه قابل مشاهده می باشد</p>
          <br>
        </div>
      </div>

    </div>

    <div class="columns">

      <div class="column  is-flex is-justify-content-center">
        <img :src="routeData['img']" class="box " alt="">
      </div>

      <div class="column is-align-items-center is-justify-content-flex-end">
        <div class="">

          <div class="columns is is-align-content-center is-align-items-center">

          <div class="column  is is-align-content-center is-justify-content-flex-end">
          <vs-button
              @click="active=!active"
              success
          >
            <span>تعریف کاربر برای این کلاس </span> <i class= 'bx bx-user-plus bx-xs ml-1'></i>
          </vs-button>
          <vs-dialog v-model="active">
            <template #header>
              <h4 class="not-margin">
                ایجاد کاربر
              </h4>
            </template>
            <div class="con-form">
              <form  method="post" @submit.prevent="addUsers()" >
                <div class="column  is-5-desktop">
                  <div class="columns">
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
                  <div justify="center" class="columns is-flex is-justify-content-flex-start">
                    <div class="column">
                      <vs-input :disabled='!isDisabled' v-model="pass"  icon-after  placeholder="رمز عبور" v-if="isDisabled">
                        <template #icon>
                          <i class='bx bx-shield-alt-2'></i>
                        </template>
                      </vs-input>
                    </div>
                    <div class="column">
                      <vs-input :disabled='!isDisabled' v-model="username"  icon-after  placeholder="شناسه کاربری" v-if="isDisabled">
                        <template #icon>
                          <i class='bx bx-user'></i>
                        </template>
                      </vs-input>
                    </div>

                  </div>
                </div>
                <div justify="center">
                  <div class="columns">
                    <div class="column" v-if="!isDisabled">
                      <blockquote class="blockquote is-size-7">
                        - فایل نمونه را دانلود کرده و لیست شرکت کنندگان را در آن وارد نمایید
                        <br>
                        - شماره موبایل می بایست یکتا(غیرتکراری) باشد
                      </blockquote>
                    </div>
                  </div>
                  <div class="column is-flex  is-justify-content-center is-align-content-center is-align-self-center">
                    <vs-input :disabled='!isDisabled' v-model="mobile"  icon-after  placeholder="شماره همراه" v-if="isDisabled">
                      <template #icon>
                        <i class='bx bx-mobile'></i>
                      </template>
                    </vs-input>
                  </div>
                </div>

                <div justify="center" class="columns is-flex is-justify-content-flex-start">
                  <div class="column is-flex  is-justify-content-right is-align-content-right is-align-self-right">
                    <span class="is-size-6 is-family-iranSans">افزودن گروهی شرکت کنندگان</span>
                    <vs-checkbox ref="checkbox" id="excelCheckBox" v-model="disable">
                    </vs-checkbox>
                  </div>
                </div>
                <div class="columns is-flex  is-justify-content-center is-align-content-center is-align-self-center">

                      <div class="is-flex column is-justify-content-center is-align-content-center is-align-self-center">
                        <div class="file is-warning has-name" v-if="!isDisabled">
                          <label class="file-label">
                            <input type="file" ref="fileName" class="file-upload" name="attachment[]" id="fileId" @change="onFileChange"  multiple>

                            <span class="file-cta">

                          <span class="file-label is-size-7 has-text-weight-bold">
                          بارگذاری فایل
                          </span>
                               <span class="file-icon">
                            <i class="bx bx-upload bx-sm"></i>
                          </span>
                      </span>
                            <span class="file-name" v-if="fileName">
                    {{fileName}}
                         </span>
                          </label>
                        </div>
                      </div>

                  <div class="column is-flex  is-justify-content-right is-align-content-center is-align-self-center">
                    <button class="button is-info has-text-white is-normal" v-if="!isDisabled"> <span class="mr-7" >دانلود قالب اکسل</span>  <i class='fas fa-file-excel'></i></button>
                  </div>
                </div>
                <vs-button block success>
                  <span class="mr-1 is-size-7">ثبت</span> <i class='bx bx-check'></i>
                </vs-button>
              </form>
            </div>
          </vs-dialog>
          </div>
          <div class="column is-flex is-flex is-justify-content-flex-end">
            <h5 class="is-size-4"> <span class="is-size-6 has-text-weight-semibold is-family-iranSans">{{routeData['meeting_name']}}</span> <span class="is-size-7 has-text-weight-semibold is-family-iranSans">:عنوان کلاس</span> <i class='bx  bx-text bx-xs'></i></h5>
          </div>
          </div>
          <div class="columns is-justify-content-flex-end mt-2">
            <h5 class="is-size-7 is-family-iranSans"> <span class="tag is-primary">{{routeData['start_time']}}</span> <span class="is-size-7 has-text-weight-semibold is-family-iranSans">:زمان شروع</span> <i class='bx  bx-time-five bx-xs'></i></h5>
          </div>
          <div class="columns is-justify-content-flex-end mt-5">
            <h5 class="is-size-7 is-family-iranSans"> <span class="tag is-danger">{{routeData['end_time']}}</span> <span class="is-size-7 has-text-weight-semibold is-family-iranSans">:زمان پایان</span> <i class='bx  bxs-time-five bx-xs' type='solid'></i></h5>
          </div>
          <div class="columns is-justify-content-flex-end mt-5">
            <h5 class="is-size-7 has-text-weight-semibold is-family-iranSans is-family-iranSans"> <span>:توضیحات کلاس</span> <i class='bx bx-detail bx-xs'></i> </h5>
          </div>
          <div class="columns is-justify-content-flex-end">
            <h5 class="is-size-7 is-family-iranSans"> {{routeData['description']}} </h5>
          </div>
          <div class="columns is-justify-content-flex-end mt-5">
              <p class="control">
                <span id="testing-code2" class="button is-static urlCopy">{{routeData['meeting_name']}}</span>
              </p>
              <vs-button @click="copyUrl('2000', 'button-right','success',`<i class='bx bx-check'></i>`)">
                  <i class="bx bx-copy"></i>
              </vs-button>
          </div>


        </div>

        </div>

      </div>
    </div>
    <div class="columns is-desktop is-multiline ">
    </div>


    </vs-row>
  </section>

</template>
<!-- eslint-disable -->
<script>

import axios from "axios";

import ClassCard from "@/components/dashbord/master/class/ClassCard";
import upload from "@/components/dashbord/master/extension/upload";

export default {
  data() {
    return {
      classId:'',
      routeParam: this.$route.params.id,
      routeData: '',
      className: '',
      courseId: '',
      classStartDate: '',
      classEndDate: '',
      classDescription: '',
      disable: false,
      active: false,
      email: '',
      password: '',
      remember: false,
      contentLoading:false,
      routeCookie: '',
      fileName:null
    }
  },
methods : {
  copyUrl (duration,position = null, color, icon) {

    let copyText = document.getElementById("testing-code2");
    let textArea = document.createElement("textarea");
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    let successful = document.execCommand("Copy");
    textArea.remove();

      const noti = this.$vs.notification({
        duration,
        icon,
        color,
        position,
        progress: 'auto',
        title: 'لینک کلاس ذخیره شد',
      })
    let msg = successful ? 'ذخیره شد' : 'ذخیره نشد';
  },
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
  addUsers : function (duration, position = null, icon) {
    if(!this.isDisabled){
      const loading = this.$vs.loading({
        target: this.$refs.content,
        scale: '0.6',
        opacity: 0.1,
      })
      const form = new FormData();
      form.append("file2",this.$refs.fileName.files[0]);
      const headers = { 'content-type': 'application/x-www-form-urlencoded' };

      axios.post("https://gholeydoon.ir/bbb/public/userController/insertMeetingUsers",form, {headers, })
          .then((res)=> {
            console.log(res)
            loading.close()

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
            loading.close()
            this.$vs.notification({
              duration,
              icon,
              color: 'danger',
              position,
              progress: 'auto',
              title: 'خطا در ایجاد کاربر',
            })
            console.log(err)
          })

    }
    else {
      if(this.name === '') {
        // eslint-disable-next-line no-unused-vars
        const noti = this.$vs.notification({
          duration,
          icon,
          color: 'warn',
          position,
          progress: 'auto',
          title: 'نام  کاربر را وارد نمایید',
        })

      }else if(this.username === ''){
        // eslint-disable-next-line no-unused-vars
        const noti = this.$vs.notification({
          duration,
          icon,
          color: 'warn',
          position,
          progress: 'auto',
          title: 'شناسه کابری را وارد نمایید',
        })
      } else if(this.pass === ''){
        // eslint-disable-next-line no-unused-vars
        const noti = this.$vs.notification({
          duration,
          icon,
          color: 'warn',
          position,
          progress: 'auto',
          title: 'رمز عبور کاربر را وارد نمایید',
        })
      } else {
        const loading = this.$vs.loading({
          target: this.$refs.content,
          scale: '0.6',
          opacity: 0.1,
        })
        const form = new FormData();
        form.append("name", this.name);
        form.append("mobile", this.mobile);
        form.append("courseId", this.$route.params.data['course_id']);
        form.append("meetingId", this.selectedMeeting);
        form.append("username", this.username);
        form.append("pass", this.pass);
        form.append("email", this.email);
        const headers = { 'content-type': 'application/x-www-form-urlencoded' };

        axios.post("https://gholeydoon.ir/bbb/public/userController/insertMeetingUser",form, {headers, })
            .then((res)=> {
              console.log(res)
              loading.close()

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
              loading.close()
              this.$vs.notification({
                duration,
                icon,
                color: 'danger',
                position,
                progress: 'auto',
                title: 'خطا در ایجاد کاربر',
              })
              console.log(err)
            })
      }
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
      this.fileName = null
      return !this.disable;
    }
  },
  created() {
    // console.log(this.$route.params.data['course_id'])

    // this.routeData = this.$route.params.data

    // this.$cookies.set('routeData', this.$route.params.data,"7d");
    // this.routeCookie = this.$cookies.get('routeData')
    // console.log(this.routeCookie)

      if (this.$route.params.data){
  this.routeData = this.$route.params.data
}else
this.$router.push({name: 'class'})
  }


}

</script>