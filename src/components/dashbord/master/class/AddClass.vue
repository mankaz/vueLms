<template>
  <section>
    <vs-row   class="column is-10-desktop is-10-tablet is-8-mobile">
      <div class="box"  ref="content">
        <div class="columns">
          <div class="column control services-btn is-flex is-justify-content-left">
          </div>
          <div class="is-flex is-justify-content-flex-end">
            <div class="media-content">
              <small class="is-size-6 is-family-iranSans is-size-5 dir-ltr"> ایجاد کلاس
                <b-icon icon="plus-thick" size="is-small"></b-icon>
              </small>
            </div>
          </div>
        </div>
        <form v-if="contentLoading" method="post"
              @submit.prevent="addClass('2000', 'button-right',`<i class='bx bx-check'></i>`)">
          <div class="block is-flex is-justify-content-center">
            <div class="column  is-8-desktop">
              <vs-row justify="center" class="columns is-flex is-justify-content-flex-end">
                <div class="column">
                  <vs-select filter placeholder="انتخاب دوره" v-model="courseId" v-if="selectList">
                    <vs-option v-for="option in selectList" :value="option.id" :key="option.id" :label="option.title">
                      {{ option.title }}
                    </vs-option>
                  </vs-select>
                </div>
                <div class="column">
                  <vs-input v-model="welcomeMsg" icon-after placeholder="پیغام خوشامدگویی">
                    <template #icon>
                      <i class='bx bx-message-rounded'></i>
                    </template>
                  </vs-input>
                </div>
                <div class="column">
                  <vs-input v-model="className" icon-after placeholder="عنوان کلاس">
                    <template #icon>
                      <i class='bx bx-text'></i>
                    </template>
                  </vs-input>
                </div>

              </vs-row>

              <div class="columns">
                <div class="column">

                  <date-picker placeholder="زمان پایان" v-model="classEndDate" class="input" type="datetime"
                               compact-time auto-submit/>

                </div>
                <div class="column">

                  <date-picker placeholder="زمان شروع" v-model="classStartDate" class="input" type="datetime"
                               compact-time auto-submit/>

                </div>
              </div>
              <div class="columns">
                <div class="column  is-flex is-align-items-center is-justify-content-center">
                  <div class="file is-info has-name">
                    <label class="file-label">
                      <input type="file" ref="fileName" class="file-upload" name="attachment[]" id="fileId" @change="onFileChange"  multiple>

                      <span class="file-cta">
                          <span class="file-icon">
                            <i class="fas fa-upload"></i>
                          </span>
                          <span class="file-label is-size-7">
                          بارگذاری عکس
                          </span>
                      </span>
                      <span class="file-name" v-if="fileName">
                    {{fileName}}
                         </span>
                    </label>
                  </div>

                </div>
                <div class="column">
                  <textarea v-model="classDescription" class="textarea" placeholder="توضیحات"></textarea>
                </div>
              </div>
              <div class="add-class-checkbox">
                <div class="columns is-justify-content-flex-end">
                  <span class="is-size-6"> موافقت مدیر قبل از ورود</span>
                  <vs-checkbox v-model="adminAllow">
                  </vs-checkbox>
                </div>
                <div class="columns is-justify-content-flex-end">
                  <span class="is-size-6">  ورود کاربران بعنوان مدیر </span>
                  <vs-checkbox v-model="userAdmin">
                  </vs-checkbox>
                </div>
                <div class="columns is-justify-content-flex-end">
                  <span class="is-size-6"> هر کاربری اجازه شروع کلاس را دارد</span>
                  <vs-checkbox v-model="allowBegin">
                  </vs-checkbox>
                </div>
                <div class="columns is-justify-content-flex-end">
                  <span class="is-size-6">قابلیت ضبط کلاس</span>
                  <vs-checkbox v-model="recordable"></vs-checkbox>
                </div>
              </div>
              <div class="column is-flex is-justify-content-center">
                <vs-button success>
                  ایجاد کلاس <i class="bx bx-check"></i>
                </vs-button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </vs-row>

  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      courseId: '',
      className: '',
      welcomeMsg: '',
      course: '',
      classStartDate: '',
      classEndDate: '',
      classDescription: '',
      classImage: '',
      recordable: false,
      labelPosition: 'on-border',
      selectList: '',
      adminAllow: false,
      userAdmin: false,
      allowBegin: false,
      contentLoading: false,
      progress: 0,
      fileName:null
    }
  },

  methods: {
    onFileChange(event, duration, position = null, icon){
      let fileData =  event.target.files[0];
      this.fileName=fileData.name;
      let filePath = this.$refs.fileName.value;
      let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
      if (!allowedExtensions.exec(filePath)) {
        this.$refs.fileName.value = null
         this.$vs.notification({
          duration,
          icon,
          color: 'primary',
          position,
          progress: 'auto',
          title: 'تنها مجاز به انتخاب عکس می باشید',
        })
        this.fileName = ""

      }
    },
    addClass: function (duration, position = null, icon) {
      if (this.className === '') {
        // eslint-disable-next-line no-unused-vars
        const noti = this.$vs.notification({
          duration,
          icon,
          color: 'warn',
          position,
          progress: 'auto',
          title: 'عنوان کلاس وارد نشده است',
        })

      } else if (this.classStartDate === '') {
        // eslint-disable-next-line no-unused-vars
        const noti = this.$vs.notification({
          duration,
          icon,
          color: 'warn',
          position,
          progress: 'auto',
          title: 'زمان شروع کلاس را انتخاب نمایید',
        })
      } else if (this.classEndDate === '') {
        // eslint-disable-next-line no-unused-vars
        const noti = this.$vs.notification({
          duration,
          icon,
          color: 'warn',
          position,
          progress: 'auto',
          title: 'زمان پایان کلاس را انتخاب نمایید',
        })
      } else {
        const loading = this.$vs.loading({
          target: this.$refs.content,
          scale: '0.6',
          opacity: 0.1,
        })
        const form = new FormData();
        form.append("className", this.className);
        form.append("welcomeMsg", this.welcomeMsg);
        form.append("courseId", this.courseId);
        form.append("classStartDate", this.classStartDate);
        form.append("classEndDate", this.classEndDate);
        form.append("classDescription", this.classDescription);
        form.append("file2", this.$refs.fileName.files[0]);
        form.append("recordable", this.recordable);
        form.append("adminAllow", this.adminAllow);
        form.append("userAdmin", this.userAdmin);
        form.append("allowBegin", this.allowBegin);
        const headers = {'content-type': 'application/x-www-form-urlencoded'};

        axios.post("https://gholeydoon.ir/bbb/public/BBBController/createMeeting", form, {headers,})
            .then((res) => {
              loading.close()
              console.log(res)
              // eslint-disable-next-line no-unused-vars
              const noti = this.$vs.notification({
                duration,
                icon,
                color: 'success',
                position,
                progress: 'auto',
                title: 'کلاس مورد نظر با موفقیت ایجاد شد',
              })
              console.log(res)
            })
            .catch(err => {
              loading.close()
              // eslint-disable-next-line no-unused-vars
              const noti = this.$vs.notification({
                duration,
                icon,
                color: 'danger',
                position,
                progress: 'auto',
                title: 'خطا در ایجاد کلاس',
              })
              console.log(err)
            })
      }

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
    axios.post("http://gholeydoon.ir/bbb/public/BBBController/getCourses", {headers,})
        .then((data) => {
          loading.close()
          clearInterval(interval)
          this.progress = 0
          this.contentLoading = true
          this.selectList = data.data
          // console.log(this.selectList)
        })
  },
  components: {

  }
}
</script>