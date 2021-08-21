<!-- eslint-disable -->
<template>
  <section>
    <div class="columns">
      <div class="column control services-btn is-flex is-justify-content-left">
        <vs-button success class="is-size-7" :to="{ path: '/Class' }" exact>
          بازگشت <i class="bx bx-arrow-back"></i>
        </vs-button>
      </div>
      <div class="is-flex is-justify-content-flex-end">
        <div class="media-content">
          <small class="is-family-iranSans is-size-5 dir-ltr">جزییات کلاس<b-icon icon="text-box-outline" size="is-normal"></b-icon></small>
          <p class="is-family-iranSans is-size-7">جزئیات کلاس ایجاد شده در این صفحه قابل مشاهده می باشد</p>
          <br>
        </div>
      </div>

    </div>

    <div class="columns">

      <div class="column  is-flex is-justify-content-center">
        <img src="https://static.eseminar.tv/public/upload/webinar/thumb/1618049353_55.jpg" class="box " alt="">
      </div>


      <div class="column is-flex is-justify-content-flex-end">
        <div class="add-class-checkbox">
          <div class="columns is-justify-content-flex-end">
            <h5 class="is-size-4"> <span class="is-size-6 has-text-weight-semibold is-family-iranSans">{{routeData['meeting_name']}}</span> <span class="is-size-7 has-text-weight-semibold is-family-iranSans">:عنوان دوره</span></h5>
          </div>
          <div class="columns is-justify-content-flex-end">
            <h5 class="is-size-7 is-family-iranSans"> <span class="tag is-success">{{routeData['start_time']}}</span> <span class="is-size-7 has-text-weight-semibold is-family-iranSans">:زمان شروع<b-icon icon="calendar-clock" size="is-small"></b-icon></span></h5>
          </div>
          <div class="columns is-justify-content-flex-end">
            <h5 class="is-size-7 is-family-iranSans"> <span class="tag is-warning">{{routeData['end_time']}}</span> <span class="is-size-7 has-text-weight-semibold is-family-iranSans">:زمان پایان<b-icon icon="timer-sand-empty" size="is-small"></b-icon></span></h5>
          </div>
          <div class="columns is-justify-content-flex-end">
            <h5 class="is-size-7 has-text-weight-semibold is-family-iranSans is-family-iranSans">:توضیحات کلاس</h5>
          </div>
          <div class="columns is-justify-content-flex-end">
            <h5 class="is-size-7 is-family-iranSans"> {{routeData['description']}}</h5>
          </div>
          <div class="columns is-justify-content-flex-end">
              <p class="control">
                <span id="testing-code2" class="button is-static urlCopy">{{routeData['meeting_name']}}</span>
              </p>
              <vs-button @click="copyUrl('2000', 'button-right','success',`<i class='bx bx-check'></i>`)">
                  <i class="bx bx-copy"></i>
              </vs-button>
          </div>

        </div>
      </div>
    </div>
    <div class="columns is-desktop is-multiline ">
    </div>
  </section>

</template>
<!-- eslint-disable -->
<script>

import axios from "axios";

import ClassCard from "@/components/dashbord/master/class/ClassCard";
import upload from "@/components/dashbord/master/extension/upload";

export default {
  data() {
    return {
      classId:'',
      routeParam: this.$route.params.id,
      routeData: '',
      className: '',
      courseId: '',
      classStartDate: '',
      classEndDate: '',
      classDescription: '',
    }
  },
methods : {
  copyUrl (duration,position = null, color, icon) {

    let copyText = document.getElementById("testing-code2");
    let textArea = document.createElement("textarea");
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    let successful = document.execCommand("Copy");
    textArea.remove();


      const noti = this.$vs.notification({
        duration,
        icon,
        color,
        position,
        progress: 'auto',
        title: 'لینک ذخیره شد',
      })


    let msg = successful ? 'ذخیره شد' : 'ذخیره نشد';
    // this.$buefy.toast.open({
    //   message: 'لینک ' + msg,
    //   type: 'is-success'
    // })
  },
},
  created() {
    console.log(this.$route.params.data)
    if (this.$route.params.data){
      this.routeData = this.$route.params.data
    }else
      this.$router.push({name: 'class'})
  },

}

</script>