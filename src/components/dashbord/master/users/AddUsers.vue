<template>
  <section>
    <div class="column is-10-desktop is-10-tablet is-8-mobile">
      <div class="box">
        <div class="columns">
          <div class="column control services-btn is-flex is-justify-content-left">
            <b-button  type="is-success" class="is-size-7" icon-right="arrow-left-bold"  tag="router-link" rounded :to="{ path: '/Users' }" exact>
              بازگشت
            </b-button>
          </div>
          <div class="is-flex is-justify-content-flex-end">
            <div class="media-content">
              <small class="is-size-6 is-family-iranSans is-size-5 dir-ltr">   تعریف کاربر<b-icon icon="account-multiple-plus" size="is-normal"></b-icon></small>
            </div>
          </div>
        </div>
        <b-notification ref="element" :closable="false">
        <form method="post" @submit.prevent="addUsers()" >
          <div class="block is-flex is-justify-content-center">
            <div class="column  is-8-desktop">
              <div class="columns">

                <div class="column">
                  <b-field  label="ایمیل" :label-position="labelPosition">
                    <b-input v-model="className"></b-input>
                  </b-field>
                </div>
                <div class="column">
                  <b-field  label="نام" :label-position="labelPosition">
                    <b-input v-model="welcomeMsg"></b-input>
                  </b-field>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                    <b-field  label="رمز عبور" :label-position="labelPosition">
                      <b-input v-model="className"></b-input>
                    </b-field>
                </div>
                <div class="column">
                  <b-field  label="نام کاربری" :label-position="labelPosition">
                    <b-input v-model="className"></b-input>
                  </b-field>
                </div>

              </div>
              <div class="columns">
                <div class="column  is-flex is-align-items-center is-justify-content-center">
                  <b-field>
                    <b-select placeholder="انتخاب دوره " v-model="courseId">
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
                  <b-field>
                    <b-select placeholder="نقش کاربر" v-model="courseId">
                      <option
                          v-for="option in selectList"
                          :value="option.id"
                          :key="option.id">
                        {{ option.title}}
                      </option>
                    </b-select>
                  </b-field>
                </div>
              </div>
              <div class="excel">
                <div class="columns  is-justify-content-flex-end">

                  <h6 class="is-size-6">:ورود کاربران بصورت گروهی از اکسل  <b-icon icon="microsoft-excel"></b-icon></h6>
                </div>
                <div class="columns is-justify-content-flex-end">
                  <b-field>
                    <b-field class="file is-warning" :class="{'has-name': !!file2}">
                      <b-upload :name="file2" :id="file2" v-model="file2" class="file-label" rounded>
                          <span class="file-cta">
                              <b-icon class="file-icon" icon="upload"></b-icon>
                           <span class="is-size-6">انتخاب فایل اکسل</span>
                          </span>
                        <span class="file-name" v-if="file2">
                            {{ file2.name }}
                </span>
                      </b-upload>
                    </b-field>
                  </b-field>
                </div>


              </div>

              <div class="column is-flex is-justify-content-center"> <button class="button is-size-6 is-success is-rounded ">
                <span class="is-size-6">ایجاد کلاس</span>
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
        courseId:null,
        className : '',
        welcomeMsg:'',
        course : '',
        classStartDate : '',
        classEndDate:'',
        classDescription:'',
        classImage:'',
        file2: null,
        recordable:'',
        labelPosition: 'on-border',
        selectList:null,
        adminAllow:'',
        userAdmin:'',
        allowBegin:''
    }
  },
  methods : {
    // addClass : function () {
    //   if(this.className === '') {
    //     this.$buefy.toast.open({
    //       message: 'عنوان کلاس را وارد نمایید',
    //       type: 'is-warning',
    //       position: 'is-top',
    //     })
    //   // } else if(this.course === ''){
    //   //   this.$buefy.toast.open({
    //   //     message: 'دوره مورد نظر را انتخاب نمایید',
    //   //     type: 'is-warning',
    //   //     position: 'is-top',
    //   //   })
    //   }else if(this.classStartDate === ''){
    //     this.$buefy.toast.open({
    //       message: 'زمان شروع کلاس را انتخاب نمایید',
    //       type: 'is-warning',
    //       position: 'is-top',
    //     })
    //   }
    //   else if(this.classEndDate === ''){
    //     this.$buefy.toast.open({
    //       message: 'زمان پایان کلاس را انتخاب نمایید',
    //       type: 'is-warning',
    //       position: 'is-top',
    //     })
    //   } else {
    //
    //     const form = new FormData();
    //     form.append("className", this.className);
    //     form.append("welcomeMsg", this.welcomeMsg);
    //     form.append("courseId", this.courseId);
    //     form.append("classStartDate", this.classStartDate);
    //     form.append("classEndDate", this.classEndDate);
    //     form.append("classDescription", this.classDescription);
    //     form.append("file2", this.file2);
    //     form.append("recordable", this.recordable);
    //     form.append("adminAllow", this.adminAllow);
    //     form.append("userAdmin", this.userAdmin);
    //     form.append("allowBegin", this.allowBegin);
    //     const headers = { 'content-type': 'application/x-www-form-urlencoded' };
    //     const loadingComponent = this.$buefy.loading.open({
    //       container: this.isFullPage ? null : this.$refs.element.$el,
    //     })
    //     axios.post("https://gholeydoon.ir/bbb/public/BBBController/createMeeting",form, {headers, })
    //         .then((res)=> {
    //           console.log(res)
    //           loadingComponent.close()
    //           this.$buefy.toast.open({
    //             message: 'کلاس مورد نظر با موفقیت ایجاد شد',
    //             type: 'is-success',
    //             position: 'is-top',
    //           })
    //           console.log(res)
    //         })
    //         .catch(err=> {
    //           loadingComponent.close()
    //           this.$buefy.toast.open({
    //             message: 'خطا در ایجاد کلاس',
    //             type: 'is-danger',
    //             position: 'is-top',
    //           })
    //           console.log(err)
    //         })
    //   }
    //
    // }
  },
  mounted() {
    const headers = {'content-type': 'application/x-www-form-urlencoded'};
    axios.post("http://gholeydoon.ir/bbb/public/BBBController/getCourses", {headers, })
        .then((data)=> {
          this.selectList = data.data
          // console.log(this.selectList)
        })
  },
  components : {

  }
}
</script>