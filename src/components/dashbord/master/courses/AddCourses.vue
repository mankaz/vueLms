<template>
  <section>
    <vs-row ref="content" class="column is-10-desktop is-10-tablet is-8-mobile">

      <div class="box">
        <div class="columns">
          <div class="column control services-btn is-flex is-justify-content-left">
          </div>
          <div class="is-flex is-justify-content-flex-end">
            <div class="media-content">
              <small class="is-family-iranSans is-size-5 dir-ltr">ایجاد دوره</small>
            </div>
          </div>
        </div>
          <form method="post" @submit.prevent="addCourse('2000', 'button-right',`<i class='bx bx-info-circle'></i>`)">
            <div class="block is-flex is-justify-content-center">

              <div class="column  is-8-desktop">
                <div class="columns is-flex is-justify-content-flex-end">
                  <vs-input v-model="courseName"  icon-after  placeholder="عنوان دوره" >
                    <template #icon>
                      <i class='bx bx-text'></i>
                    </template>
                  </vs-input>
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
<!--                    <b-field>-->
<!--                      <b-field class="file is-info" :class="{'has-name': !!file2}">-->
<!--                        <b-upload :name="file2" :id="file2" v-model="file2" class="file-label" rounded>-->
<!--                          <span class="file-cta">-->
<!--                              <b-icon class="file-icon" icon="upload"></b-icon>-->
<!--                           <span>انتخاب تصویر</span>-->
<!--                          </span>-->
<!--                          <span class="file-name" v-if="file2">-->
<!--                            {{ file2.name }}-->
<!--                </span>-->
<!--                        </b-upload>-->
<!--                      </b-field>-->
<!--                    </b-field>-->
                  </div>

                    <div class="column is-flex is-justify-content-flex-end">
                      <textarea v-model="courseDescription" class="textarea" placeholder="توضیحات"></textarea>
                    </div>

                </div>
                <div class="column is-flex is-justify-content-center">
                  <vs-button success>
                    ایجاد دوره    <i class="bx bx-check"></i>
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
      courseName: '',
      courseDescription: '',
      fileName:''
    }
  },
  methods: {
    onFileChange(event, duration, position = null, icon) {
      let fileData = event.target.files[0];
      this.fileName = fileData.name;
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
    addCourse: function (duration,position = null, icon) {
      if (this.courseName === '') {
        // eslint-disable-next-line no-unused-vars
        const noti = this.$vs.notification({
          duration,
          icon,
          color:'warn',
          position,
          progress: 'auto',
          title: 'عنوان دوره وارد نشده است',
        })

      } else {
        const loading = this.$vs.loading({
          target: this.$refs.content,
          scale: '0.6',
          opacity: 0.3,
        })
        const form = new FormData();
        form.append("courseName", this.courseName);
        form.append("courseDescription", this.courseDescription);
        form.append("file2", this.$refs.fileName.files[0]);
        const headers = {'content-type': 'application/x-www-form-urlencoded'};
        axios.post("https://gholeydoon.ir/bbb/public/BBBController/createCourse", form, {headers,})
            .then((res) => {
              loading.close()
              // eslint-disable-next-line no-unused-vars
              const noti = this.$vs.notification({
                duration,
                icon,
                color:'success',
                position,
                progress: 'auto',
                title: 'دوره با موفقیت ایجاد شد',
              })
              console.log(res)
            })
            .catch(err => {
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
              console.log(err)
            })
      }
    }
  },
  components: {

  }
}
</script>