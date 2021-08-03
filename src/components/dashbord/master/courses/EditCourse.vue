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
              <b-field label="عنوان دوره" :label-position="labelPosition">
                <b-input v-model="routeData['title']" size="is-medium"></b-input>
              </b-field>
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
                  <b-field label="توضحیات دوره" :label-position="labelPosition">
                    <b-input v-model="routeData['description']" maxlength="400" type="textarea"></b-input>
                  </b-field>
                </div>
              </div>
              <div class="column is-flex is-justify-content-center">
                <button class="button is-success is-rounded ">
                  <span>ویرایش دوره</span>
                  <span class="icon is-small">
                     <i class="fas fa-check"></i>
                    </span>
                </button>
              </div>
            </div>
          </div>
        </form>
<!--        <form method="post"  @submit.prevent="editClass()">-->
<!--          <div class="block is-flex is-justify-content-center">-->
<!--            <div class="column  is-8-desktop">-->
<!--              <div class="columns">-->
<!--                <div class="column">-->
<!--                  <b-field>-->
<!--                    <b-select placeholder="انتخاب " v-model="routeData['course_id']">-->
<!--                      <option-->
<!--                          v-for="option in selectList"-->
<!--                          :value="option.id"-->
<!--                          :key="option.id">-->
<!--                        {{ option.title}}-->
<!--                      </option>-->
<!--                    </b-select>-->
<!--                  </b-field>-->

<!--                </div>-->
<!--                <div class="column">-->
<!--                  <b-field label="عنوان کلاس" :label-position="labelPosition">-->
<!--                    <b-input  v-model="routeData['meeting_name']"></b-input>-->
<!--                  </b-field>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="columns">-->
<!--                <div class="column">-->
<!--                  <b-field label="زمان پایان" :label-position="labelPosition">-->
<!--                    <date-picker v-model="routeData['end_time']" class="input" type="datetime" compact-time auto-submit/>-->
<!--                  </b-field>-->
<!--                </div>-->
<!--                <div class="column">-->
<!--                  <b-field label="زمان شروع" :label-position="labelPosition">-->
<!--                    <date-picker v-model="routeData['start_time']" class="input" type="datetime" compact-time auto-submit/>-->
<!--                  </b-field>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="columns">-->
<!--                <div class="column  is-flex is-align-items-center is-justify-content-center">-->
<!--                  <b-field>-->
<!--                    <b-field class="file is-info" :class="{'has-name': !!file2}">-->
<!--                      <b-upload :name="file2" :id="file2" v-model="file2" class="file-label" rounded>-->
<!--                          <span class="file-cta">-->
<!--                              <b-icon class="file-icon" icon="upload"></b-icon>-->
<!--                           <span>انتخاب تصویر</span>-->
<!--                          </span>-->
<!--                        <span class="file-name" v-if="file2">-->
<!--                            {{ file2.name }}-->
<!--                </span>-->
<!--                      </b-upload>-->
<!--                    </b-field>-->
<!--                  </b-field>-->

<!--                </div>-->
<!--                <div class="column">-->
<!--                  <b-field label="توضحیات دوره" :label-position="labelPosition">-->
<!--                    <b-input v-model="routeData['description']" maxlength="400" type="textarea"></b-input>-->
<!--                  </b-field>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="columns">-->
<!--                <div class="column">-->
<!--                </div>-->
<!--                <div class="add-class-checkbox">-->
<!--                  <div class="columns is-justify-content-flex-end">-->
<!--                    <b-field>-->
<!--                      <b-checkbox  v-model="adminAllow" class="is-family-iranSans">-->
<!--                        موافقت مدیر قبل از ورود-->
<!--                      </b-checkbox>-->
<!--                    </b-field>-->
<!--                  </div>-->
<!--                  <div class="columns is-justify-content-flex-end">-->
<!--                    <b-field>-->
<!--                      <b-checkbox  v-model="userAdmin" class="is-family-iranSans">-->
<!--                        تمام کاربران بعنوان مدیر وارد شوند-->
<!--                      </b-checkbox>-->
<!--                    </b-field>-->
<!--                  </div>-->
<!--                  <div class="columns is-justify-content-flex-end">-->
<!--                    <b-field>-->
<!--                      <b-checkbox  v-model="allowBegin" class="is-family-iranSans">-->
<!--                        هر کاربری اجازه شروع کلاس را دارد-->
<!--                      </b-checkbox>-->
<!--                    </b-field>-->
<!--                  </div>-->
<!--                  <div class="columns is-justify-content-flex-end">-->
<!--                    <b-field>-->
<!--                      <b-checkbox :value="true" v-model="recordable" class="is-family-iranSans">-->
<!--                        قابلیت ضبظ-->
<!--                      </b-checkbox>-->
<!--                    </b-field>-->
<!--                  </div>-->

<!--                </div>-->

<!--              </div>-->
<!--              <div class="column is-flex is-justify-content-center">-->
<!--                <button  class="button is-success is-rounded ">-->
<!--                  <span>ویرایش کلاس</span>-->
<!--                  <span class="icon is-small">-->
<!--                 <i class="fas fa-check"></i>-->
<!--                 </span>-->
<!--                </button>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </form>-->

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

    editCourse() {

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
            this.className=''
            this.course= '',
                this.courseDescription= '',
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