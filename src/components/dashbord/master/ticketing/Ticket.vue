<template>
  <section>
    <div class="block is-flex is-justify-content-center">
      <upload/>
      <div class="column  is-6-desktop">
        <b-field label="عنوان تیکت" :label-position="labelPosition">
          <b-input size="is-medium"></b-input>
        </b-field>
        <div class="columns">
          <div class="column">
            <b-field  :label-position="labelPosition"
                label="انتخاب دپارتمان">
              <b-select size="is-medium" placeholder="یک عنوان انتخاب نمایید" expanded>
                <option value="پشتیبانی فنی">پشتیبانی فنی</option>
                <option value="واحد مالی">واحد مالی</option>
                <option value="پیشنهادات و انتقادات">پیشنهادات و انتقادات</option>
              </b-select>
            </b-field>
            <b-field  label="پیام" :label-position="labelPosition">
              <b-input maxlength="200" type="textarea"></b-input>
            </b-field>
          </div>
        </div>
        <div class="columns is-flex is-justify-content-center">

        </div>
        <div class="columns">
          <div class="column is-family-iranSans is-flex is-justify-content-center">
            <div class="block">
            <b-radio v-model="radio"
                     name="name"
                     native-value="necessary">
              فوری
            </b-radio>
            <b-radio v-model="radio"
                     name="name"
                     native-value="important">
              مهم
            </b-radio>
            <b-radio v-model="radio"
                     name="name"
                     native-value="normal">
              عادی
            </b-radio>
          </div>
          </div>
          <div class="column is-flex is-justify-content-center"><span class="is-family-iranSans">:انتخاب اهمیت</span></div>
        </div>
        <div class="column is-flex is-justify-content-center"> <button class="button is-success is-rounded ">ثبت تیکت</button></div>


      </div>

    </div>
  </section>
</template>

<script>
import upload from "./upload";
export default {
  data() {
    return {
      labelPosition: 'on-border',
      radio: 'normal'
    }
  },
  components : {
    upload
  }
}
</script>
