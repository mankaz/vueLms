<template>
  <section>
    <div class="column is-10-desktop is-10-tablet is-8-mobile">
      <div class="box">
        <div class="is-flex is-justify-content-flex-end">
          <div class="media-content">
            <small class="is-family-iranSans is-size-5 dir-ltr">ایجاد کلاس</small>

          </div>
        </div>

        <form method="post" @submit.prevent="addClass()" >
          <div class="block is-flex is-justify-content-center">
            <div class="column  is-8-desktop">
              <div class="columns">
                <div class="column">
                  <b-field  :label-position="labelPosition"
                            label="انتخاب دوره">
                    <b-select v-model="course" placeholder="یک عنوان انتخاب نمایید" expanded>
                      <option value="پشتیبانی فنی">پشتیبانی فنی</option>
                      <option value="واحد مالی">واحد مالی</option>
                      <option value="پیشنهادات و انتقادات">پیشنهادات و انتقادات</option>
                    </b-select>
                  </b-field>
                </div>
                <div class="column">
                  <b-field  label="عنوان کلاس" :label-position="labelPosition">
                    <b-input v-model="className"></b-input>
                  </b-field>
                </div>
              </div>

              <div class="columns">
                <div class="column">
                  <b-field  label="زمان پایان" :label-position="labelPosition">
                    <date-picker v-model="classStartDate" class="input" type="datetime" compact-time auto-submit/>
                  </b-field>
                </div>
                <div class="column">
                  <b-field  label="زمان شروع" :label-position="labelPosition">
                    <date-picker v-model="classEndDate" class="input" type="datetime" compact-time auto-submit/>
                  </b-field>
                </div>
              </div>
              <div class="columns">
                <div class="column  is-flex is-align-items-center is-justify-content-center">
                  <upload v-model="classImage">
                    <slot> <span class="file-label">انتخاب تصویر کلاس</span></slot>
                  </upload>

                </div>
                <div class="column">
                  <b-field  label="توضحیات دوره" :label-position="labelPosition">
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
              <div class="column is-flex is-justify-content-center"> <button class="button is-success is-rounded ">ایجاد کلاس</button></div>
            </div>
          </div>
        </form>
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
        className : '',
        course : '',
        classStartDate : '',
        classEndDate:'',
        classDescription:'',
        classImage:'',
      labelPosition: 'on-border',
    }
  },
  methods : {
    addClass : function () {
      const form = new FormData();
      form.append("className", this.className);
      form.append("course", this.course);
      form.append("classStartDate", this.classStartDate);
      form.append("classEndDate", this.classEndDate);
      form.append("classDescription", this.classDescription);
      form.append("classImage", this.classImage);

      const headers = { 'content-type': 'application/x-www-form-urlencoded' };
      axios.post("http://localhost/bbb/CI/public/BBBController/createMeeting/0",form, {headers, })
          .then((res)=> {
            console.log(this.classStartDate)
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