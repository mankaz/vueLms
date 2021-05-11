<template>
  <section>
    <div class="column is-10-desktop is-10-tablet is-8-mobile">
      <div class="box">
        <div class="columns">
          <div class="column control services-btn is-flex is-justify-content-left">
            <b-button type="is-info" icon-right="arrow-left-bold" tag="router-link" :to="{ path: '/Class' }" exact/>
          </div>
          <div class="is-flex is-justify-content-flex-end">
            <div class="media-content">
              <small class="is-family-iranSans is-size-5 dir-ltr">ویرایش کلاس</small>
            </div>
          </div>
        </div>
        <b-notification  :closable="false" >
          <b-loading :is-full-page="isFullPage" v-model="isLoading" :can-cancel="false"></b-loading>
        </b-notification>
          <form method="post"  @submit.prevent="editClass()">
            <div class="block is-flex is-justify-content-center">
              <div class="column  is-8-desktop">
                <div class="columns">
                  <div class="column">
<!--                    <b-field :label-position="labelPosition"-->
<!--                             label="انتخاب دوره">-->
<!--                      <b-select v-model="courseId" placeholder="یک عنوان انتخاب نمایید" expanded>-->
<!--                        <option value="پشتیبانی فنی">پشتیبانی فنی</option>-->
<!--                        <option value="واحد مالی">واحد مالی</option>-->
<!--                        <option value="پیشنهادات و انتقادات">پیشنهادات و انتقادات</option>-->
<!--                      </b-select>-->
<!--                    </b-field>-->
                    <b-field label="Simple">
                      <b-select placeholder="انتخاب " v-model="courseId">
                        <option
                            v-for="option in selectList"
                            :value="option.id"
                            :key="option.id">
                          {{ option.title}}
                        </option>
                      </b-select>
                    </b-field>

                  </div>
                  <div class="column">
                    <b-field label="عنوان کلاس" :label-position="labelPosition">
                      <b-input v-model="className"></b-input>
                    </b-field>
                  </div>
                </div>

                <div class="columns">
                  <div class="column">
                    <b-field label="زمان پایان" :label-position="labelPosition">
                      <date-picker v-model="classEndDate" class="input" type="datetime" compact-time auto-submit/>
                    </b-field>
                  </div>
                  <div class="column">
                    <b-field label="زمان شروع" :label-position="labelPosition">
                      <date-picker v-model="classStartDate" class="input" type="datetime" compact-time auto-submit/>
                    </b-field>
                  </div>
                </div>
                <div class="columns">
                  <div class="column  is-flex is-align-items-center is-justify-content-center">
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
                      <b-input v-model="classDescription" maxlength="400" type="textarea"></b-input>
                    </b-field>
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                  </div>
                  <div class="column is-flex is-align-items-center is-justify-content-center">
                    <b-field>
                      <b-checkbox :value="true" class="is-family-iranSans">
                        قابلیت ضبظ
                      </b-checkbox>
                    </b-field>
                  </div>
                </div>
                <div class="column is-flex is-justify-content-center">
                  <button  class="button is-success is-rounded ">
                    <span>ویرایش کلاس</span>
                    <span class="icon is-small">
                 <i class="fas fa-check"></i>
                 </span>
                  </button>
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
      classId:'',
      routeParam: this.$route.params.id,
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
    }
  },
  created() {
    this.classId = this.$route.params.data
  },
  methods: {

    editClass() {

      this.isLoading = true
      const form = new FormData();
      form.append("className", this.className);
      form.append("courseId", this.courseId);
      form.append("classStartDate", this.classStartDate);
      form.append("classEndDate", this.classEndDate);
      form.append("classDescription", this.classDescription);
      form.append("classId", this.classId);
      form.append("file2", this.file2);

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