<template>
  <section>
    <div class="column is-10-desktop is-10-tablet is-8-mobile">

        <div class="box">
          <div class="block is-flex is-justify-content-center">
            <div class="column  is-8-desktop">
              <b-field label="عنوان دوره" :label-position="labelPosition">
                <b-input size="is-medium"></b-input>
              </b-field>
              <div class="columns">
                <div class="column is-flex is-flex is-align-items-center is-justify-content-center"><upload><slot> <span class="file-label">انتخاب تصویر دوره</span></slot></upload></div>
                <div class="column">
                  <b-field  label="توضحیات دوره" :label-position="labelPosition">
                    <b-input maxlength="400" type="textarea"></b-input>
                  </b-field>
                </div>
              </div>
              <div class="column is-flex is-justify-content-center"> <button class="button is-success is-rounded ">ایجاد دوره</button></div>
            </div>
            </div>
          </div>
        </div>

  </section>
</template>

<script>
import upload from "../extension/upload";

export default {
  data() {
    return {
      labelPosition: 'on-border',
    }
  },
  components : {
    upload
  }
}
</script>