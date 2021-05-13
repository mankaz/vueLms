<template>
  <section>
    <div class="column is-10-desktop is-10-tablet is-8-mobile">

      <div class="box">
        <div class="columns">
          <div class="column control services-btn is-flex is-justify-content-left">
            <b-button  type="is-info" icon-right="arrow-left-bold" tag="router-link" :to="{ path: '/Courses' }" exact />
          </div>
          <div class="is-flex is-justify-content-flex-end">
            <div class="media-content">
              <small class="is-family-iranSans is-size-5 dir-ltr">ایجاد دوره</small>
            </div>
          </div>
        </div>

        <b-notification ref="element" :closable="false">
          <form method="post" @submit.prevent="addCourse()">
            <div class="block is-flex is-justify-content-center">
              <div class="column  is-8-desktop">
                <b-field label="عنوان دوره" :label-position="labelPosition">
                  <b-input v-model="courseName" size="is-medium"></b-input>
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
                      <b-input v-model="courseDescription" maxlength="400" type="textarea"></b-input>
                    </b-field>
                  </div>
                </div>
                <div class="column is-flex is-justify-content-center">
                  <button class="button is-success is-rounded ">
                    <span>ایجاد دوره</span>
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

<script>
import axios from "axios";

export default {
  data() {
    return {
      courseName: '',
      courseDescription: '',
      file2: null,
      labelPosition: 'on-border',
    }
  },
  methods: {
    addCourse: function () {
      if (this.courseName === '') {
        this.$buefy.toast.open({
          message: 'عنوان دوره را وارد نمایید',
          type: 'is-warning',
          position: 'is-top',
        })
      } else {
        const loadingComponent = this.$buefy.loading.open({
          container: this.isFullPage ? null : this.$refs.element.$el,
        })
        const form = new FormData();
        form.append("courseName", this.courseName);
        form.append("courseDescription", this.courseDescription);
        form.append("file2", this.file2);
        const headers = {'content-type': 'application/x-www-form-urlencoded'};
        axios.post("https://gholeydoon.ir/bbb/public/BBBController/createCourse", form, {headers,})
            .then((res) => {
              loadingComponent.close()
              this.$buefy.toast.open({
                message: 'دوره مورد نظر با موفقیت ایجاد شد',
                type: 'is-success',
                position: 'is-top',
              })
              console.log(res)
            })
            .catch(err => {
              loadingComponent.close()
              this.$buefy.toast.open({
                message: 'خطا در ایجاد دوره',
                type: 'is-danger',
                position: 'is-top',
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