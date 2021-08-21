<template>
  <section>
    <div class="column is-10-desktop is-10-tablet is-8-mobile">
      <div class="box">
        <div class="columns">
          <div class="column control services-btn is-flex is-justify-content-left">
            <b-button type="is-success" class="is-size-7" label="بازگشت"  icon-right="arrow-left-bold" tag="router-link" :to="{ path: '/Class' }" exact rounded/>
          </div>
          <div class="is-flex is-justify-content-flex-end">
            <div class="media-content">
              <small class="is-family-iranSans is-size-5 dir-ltr"> ویرایش دوره <b-icon icon="square-edit-outline" size="is-small"></b-icon></small>
            </div>
          </div>
        </div>
        <b-notification  :closable="false" >
          <b-loading :is-full-page="isFullPage" v-model="isLoading" :can-cancel="false"></b-loading>
        </b-notification>
        <form method="post" @submit.prevent="editCourse()">
          <div class="block is-flex is-justify-content-center">
            <div class="column  is-8-desktop">
              <div class="columns is-flex is-justify-content-flex-end">
              <vs-input v-model="routeData['title']"  icon-after  placeholder="عنوان دوره" >
                <template #icon>
                  <i class='bx bx-text'></i>
                </template>
              </vs-input>
              </div>
              <div class="columns">
                <div class="column is-flex is-flex is-align-items-center is-justify-content-center">
                  <b-field>
                    <b-field class="file is-info" :class="{'has-name': !!file2}">
                      <b-upload :name="file2" :id="file2" v-model="file2" class="file-label" rounded>
                          <span class="file-cta">
                              <b-icon class="file-icon" icon="upload"></b-icon>
                           <span>انتخاب تصویر</span>
                          </span>
                        <span class="file-name" v-if="file2">
                            {{ file2.name }}
                </span>
                      </b-upload>
                    </b-field>
                  </b-field>
                </div>
                <div class="column">
                  <div class="column is-flex is-justify-content-flex-end">
                    <textarea v-model="routeData['description']" class="textarea" placeholder="توضیحات"></textarea>
                  </div>
                </div>
              </div>
              <div class="column is-flex is-justify-content-center">
                <vs-button warn :to="{ path: '/courses' }">
                  انصراف   <i class="bx bx-arrow-back"></i>
                </vs-button>
                <vs-button success>
                  ویرایش دوره    <i class="bx bx-edit"></i>
                </vs-button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

  </section>
</template>

<script>
import axios from "axios";

export default {

  data() {
    return {
      routeParam: this.$route.params.id,
      routeData: '',
      courseId: '',
      courseName:'',
      courseDescription: '',
      file2: null,
      labelPosition: 'on-border',
      isLoading: false,
      isFullPage: true,
    }
  },
  created() {
    if (this.$route.params.data){
      this.routeData = this.$route.params.data
      console.log(this.routeData)
    }else
      this.$router.push({name: 'courses'})
  },
  methods: {

    editCourse(duration,position = null, icon) {
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
        this.isLoading = true
        const form = new FormData();

        form.append("courseId", this.routeData['course_id']);
        form.append("courseName", this.routeData['title']);
        form.append("classDescription", this.routeData['description']);
        form.append("file2", this.file2);
        console.log(this.routeData['end_time'])
        const headers = {'content-type': 'application/x-www-form-urlencoded'};
        axios.post("http://gholeydoon.ir/bbb/public/BBBController/updateCourse", form, {headers})
            .then(() => {
              this.isLoading = false
              this.className = ''
              this.course = ''
                  this.courseDescription = ''
                  this.file2 = null
              // eslint-disable-next-line no-unused-vars
              const noti = this.$vs.notification({
                duration,
                icon,
                color:'success',
                position,
                progress: 'auto',
                title: 'دوره با موفقیت ویرایش شد',
              })
            })
            .catch(() => {
              // eslint-disable-next-line no-unused-vars
              const noti = this.$vs.notification({
                duration,
                icon,
                color:'danger',
                position,
                progress: 'auto',
                title: 'خطا در ویرایش دوره',
              })
            })
      }
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