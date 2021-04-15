<template>
  <section>
    <div class="column is-10-desktop is-10-tablet is-8-mobile">

        <div class="box">
          <div class="is-flex is-justify-content-flex-end">
            <div class="media-content">
              <small class="is-family-iranSans is-size-5 dir-ltr">ایجاد دوره</small>

            </div>
          </div>
          <div class="block is-flex is-justify-content-center">
            <div class="column  is-8-desktop">
              <b-field label="عنوان دوره" :label-position="labelPosition">
                <b-input v-model="courseName" size="is-medium"></b-input>
              </b-field>
              <div class="columns">
                <div class="column is-flex is-flex is-align-items-center is-justify-content-center">
                  <upload><slot> <span class="file-label">انتخاب تصویر دوره</span></slot>
                  </upload>
                </div>
                <div class="column">
                  <b-field  label="توضحیات دوره" :label-position="labelPosition">
                    <b-input v-model="courseDescription" maxlength="400" type="textarea"></b-input>
                  </b-field>
                </div>
              </div>
              <div class="column is-flex is-justify-content-center"> <button @click="addCourse" class="button is-success is-rounded ">ایجاد دوره</button></div>
            </div>
            </div>
          </div>
        </div>

  </section>
</template>

<script>
import upload from "../extension/upload";
import axios from "axios";

export default {
  data() {
    return {
        courseName : '',
        courseDescription : '',
        courseImage: '',
      labelPosition: 'on-border',
    }
  },
  methods :{
    addCourse : function () {
      const form = new FormData();
      form.append("courseName", this.courseName);
      form.append("courseDescription", this.courseDescription);
      form.append("courseImage", this.courseImage);
      const headers = { 'content-type': 'application/x-www-form-urlencoded' };
      axios.post("http://localhost/bbb/CI/public/BBBController/createCourse/0",form, {headers, })
          .then((res)=> {
            console.log(res)
          })
          .catch(err=> {
            console.log(err)
          })
    }
  },
  components : {
    upload
  }
}
</script>