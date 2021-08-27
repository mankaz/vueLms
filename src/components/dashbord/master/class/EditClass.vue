<template>
  <section>
    <vs-row ref="content" class="column is-10-desktop is-10-tablet is-8-mobile">
      <div class="box">
        <div class="columns">
          <div class="column control services-btn is-flex is-justify-content-left">
          </div>
          <div class="is-flex is-justify-content-flex-end">
            <div class="media-content">
              <small class="is-family-iranSans is-size-5 dir-ltr"> ویرایش کلاس <b-icon icon="square-edit-outline" size="is-small"></b-icon></small>
            </div>
          </div>
        </div>
        <b-notification  :closable="false" >
          <b-loading :is-full-page="isFullPage" v-model="isLoading" :can-cancel="false"></b-loading>
        </b-notification>
        <form v-if="contentLoading" method="post"  @submit.prevent="editClass('2000', 'button-right',`<i class='bx bx-check'></i>`)">
          <div class="block is-flex is-justify-content-center">
            <div class="column  is-8-desktop">

              <vs-row  justify="center" class="columns">
                <div class="column">
                  <vs-select filter placeholder="انتخاب دوره" v-model="routeData['course_id']" v-if="selectList">
                    <vs-option  v-for="option in selectList" :value="option.id" :key="option.id" :label="option.title">
                      {{ option.title}}
                    </vs-option>
                  </vs-select>
                </div>
                <div class="column">
                  <vs-input v-model="routeData['meeting_name']"  icon-after  placeholder="عنوان کلاس" >
                    <template #icon>
                      <i class='bx bx-message-rounded'></i>
                    </template>
                  </vs-input>
                </div>
                <div class="column">
                  <vs-input v-model="routeData['welcomeMsg']"  icon-after  placeholder="پیغام خوشامدگویی" >
                    <template #icon>
                      <i class='bx bx-message-rounded'></i>
                    </template>
                  </vs-input>
                </div>
              </vs-row>

              <div class="columns">
                <div class="column">
                  <b-field label="زمان پایان" :label-position="labelPosition">
                    <date-picker v-model="routeData['end_time']" class="input" type="datetime" compact-time auto-submit/>
                  </b-field>
                </div>
                <div class="column">
                  <b-field label="زمان شروع" :label-position="labelPosition">
                    <date-picker v-model="routeData['start_time']" class="input" type="datetime" compact-time auto-submit/>
                  </b-field>
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
                  <div class="column">
                    <textarea v-model="routeData['description']" class="textarea" placeholder="توضیحات"></textarea>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                </div>
                <div class="add-class-checkbox">
                  <div class="columns is-justify-content-flex-end">
                    <span> موافقت مدیر قبل از ورود</span>
                    <vs-checkbox v-model="adminAllow">
                    </vs-checkbox>
                  </div>
                  <div class="columns is-justify-content-flex-end">
                    <span>  ورود کاربران بعنوان مدیر </span>
                    <vs-checkbox v-model="userAdmin">
                    </vs-checkbox>
                  </div>
                  <div class="columns is-justify-content-flex-end">
                    <span> هر کاربری اجازه شروع کلاس را دارد</span>
                    <vs-checkbox v-model="allowBegin">
                    </vs-checkbox>
                  </div>
                  <div class="columns is-justify-content-flex-end">
                    <span>قابلیت ضبط کلاس</span>
                    <vs-checkbox v-model="recordable">
                    </vs-checkbox>
                  </div>
                </div>
              </div>
              <div class="column is-flex is-justify-content-center">
                <vs-button warn :to="{ path: 'class' }">
                  انصراف   <i class="bx bx-arrow-back"></i>
                </vs-button>
                <vs-button success>
                  ویرایش کلاس    <i class="bx bx-edit"></i>
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
      classId:'',
      routeParam: this.$route.params.id,
      routeData: '',
      className: '',
      courseId: '',
      classStartDate: '',
      classEndDate: '',
      classDescription: '',
      file2: null,
      labelPosition: 'on-border',
      isLoading: false,
      isFullPage: true,
      selectList:null,
      recordable:false,
      adminAllow:false,
      userAdmin:false,
      allowBegin:false,
      contentLoading:false,
      progress: 0,
      fileName:''
    }
  },
  created() {
    if (this.$route.params.data){
      this.routeData = this.$route.params.data
    }else
      this.$router.push({name: 'class'})
  },
  methods: {
    onFileChange(event){
      let fileData =  event.target.files[0];
      this.fileName=fileData.name;
    },
    editClass(duration,position = null, icon) {
      if(this.className === '') {
        // eslint-disable-next-line no-unused-vars
        const noti = this.$vs.notification({
          duration,
          icon,
          color:'warn',
          position,
          progress: 'auto',
          title: 'عنوان کلاس وارد نشده است',
        })

      }else if(this.classStartDate === ''){
        // eslint-disable-next-line no-unused-vars
        const noti = this.$vs.notification({
          duration,
          icon,
          color:'warn',
          position,
          progress: 'auto',
          title: 'زمان شروع کلاس را انتخاب نمایید',
        })
      }
      else if(this.classEndDate === ''){
        // eslint-disable-next-line no-unused-vars
        const noti = this.$vs.notification({
          duration,
          icon,
          color:'warn',
          position,
          progress: 'auto',
          title: 'زمان پایان کلاس را انتخاب نمایید',
        })
      } else {
      this.isLoading = true
      const form = new FormData();
      form.append("className", this.routeData['meeting_name']);
      form.append("courseId", this.routeData['course_id']);
      form.append("classStartDate", this.routeData['start_time']);
      form.append("classEndDate", this.routeData['end_time']);
      form.append("classDescription", this.routeData['description']);
      form.append("classId", this.routeData['id']);
      form.append("file2", this.fileName);
        const loading = this.$vs.loading({
          target: this.$refs.content,
          scale: '0.6',
          opacity: 0.1,
        })
      const headers = {'content-type': 'application/x-www-form-urlencoded'};
      axios.post("http://gholeydoon.ir/bbb/public/BBBController/updateMeeting", form, {headers})
          .then(() => {

            this.isLoading = false
            this.className=''
            this.course= ''
                this.classStartDate= ''
                this.classEndDate= ''
                this.classDescription= ''
                this.file2= null
            loading.close()
            // eslint-disable-next-line no-unused-vars
            const noti = this.$vs.notification({
              duration,
              icon,
              color:'success',
              position,
              progress: 'auto',
              title: 'کلاس مورد نظر با موفقیت ایجاد شد',
            })

          })
          .catch(()=> {
            loading.close()
            // eslint-disable-next-line no-unused-vars
            const noti = this.$vs.notification({
              duration,
              icon,
              color:'danger',
              position,
              progress: 'auto',
              title: 'خطای سرور',
            })
          })
        }
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
    axios.post("http://gholeydoon.ir/bbb/public/BBBController/getCourses", {headers, })
        .then((data)=> {
          loading.close()
          clearInterval(interval)
          this.progress = 0
          this.selectList = data.data
          this.contentLoading= true
          // console.log(this.selectList)
        })
  },
  components: {

  }
}
</script>