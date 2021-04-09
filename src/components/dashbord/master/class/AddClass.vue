<template>
  <section>
    <div class="column is-10-desktop is-10-tablet is-8-mobile">

        <div class="box">
          <div class="block is-flex is-justify-content-center">
            <div class="column  is-8-desktop">
              <div class="columns">
                <div class="column">
                  <b-field  :label-position="labelPosition"
                            label="انتخاب دوره">
                    <b-select  placeholder="یک عنوان انتخاب نمایید" expanded>
                      <option value="پشتیبانی فنی">پشتیبانی فنی</option>
                      <option value="واحد مالی">واحد مالی</option>
                      <option value="پیشنهادات و انتقادات">پیشنهادات و انتقادات</option>
                    </b-select>
                  </b-field>
                </div>
                <div class="column">
                  <b-field  label="عنوان کلاس" :label-position="labelPosition">
                    <b-input ></b-input>
                  </b-field>
                </div>
              </div>

              <div class="columns">
                <div class="column">
                  <b-field label="زمان پایان" :label-position="labelPosition">
                    <date-picker class="input" type="datetime" compact-time auto-submit/>
                  </b-field>
                </div>
                <div class="column">
                  <b-field label="زمان شروع" :label-position="labelPosition">
                    <date-picker class="input" type="datetime" compact-time auto-submit/>
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
export default {
  data() {
    return {
      labelPosition: 'on-border',
    }
  },
  components : {

  }
}
</script>