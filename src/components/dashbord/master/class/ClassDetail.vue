<!-- eslint-disable -->
<template>
  <section>
    <div class="columns">
      <div class="column control services-btn is-flex is-justify-content-left">
        <b-button  type="is-success" class="is-size-7" icon-right="arrow-left-bold"  tag="router-link"  :to="{ path: '/Class' }" rounded exact>
          بازگشت
        </b-button>
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
            <h5 class="is-size-4"> {{routeData['meeting_name']}} <span class="is-size-6">:عنوان دوره</span></h5>
          </div>
          <div class="columns is-justify-content-flex-end">
            <h5 class="is-size-7 is-family-iranSans"> {{routeData['start_time']}} <span class="is-size-6">:زمان شروع</span></h5>
          </div>
          <div class="columns is-justify-content-flex-end">
            <h5 class="is-size-7 is-family-iranSans"> {{routeData['end_time']}} <span class="is-size-6">:زمان پایان</span></h5>
          </div>
          <div class="columns is-justify-content-flex-end">
            <h5 class="is-size-6 is-family-iranSans">:توضیحات کلاس</h5>
          </div>
          <div class="columns is-justify-content-flex-end">
            <h5 class="is-size-7 is-family-iranSans"> {{routeData['description']}}</h5>
          </div>
          <div class="columns is-justify-content-flex-end">
            <b-field>

              <p class="control">
                <span id="testing-code2" class="button is-static urlCopy">{{routeData['meeting_name']}}</span>
              </p>
              <p class="control">
                <b-button class="button is-info" @click="copyUrl">کپی لینک</b-button>
              </p>
            </b-field>

          </div>

        </div>
      </div>
    </div>

      <div v-if="isData" class="columns">
        <div  class="column is-flex is-justify-content-center  no-data">
          <p class="is-family-iranSans is-size-7">داده ای برای نمایش وجود ندارد<b-icon type="is-info" icon="information-outline" size="is-normal"></b-icon></p>
      </div>

    </div>
    <b-notification  :closable="false" >
      <b-loading :is-full-page="isFullPage" v-model="isLoading" :can-cancel="false"></b-loading>
    </b-notification>
    <div class="columns is-desktop is-multiline ">

      <div class="column is-one-quarter" v-for="(item,index )  in paginate " :key="index">

        <ClassCard>
          <slot>
            <div class="card-image">
              <slot>
                <figure class="image is-4by3">
                  <img class="image is-flex is-align-items-center courses-img is-128x128"
                       src="https://static.eseminar.tv/public/upload/webinar/thumb/1618049353_55.jpg">
                </figure>
              </slot>
            </div>
          </slot>
          <slot>
            <div class="card-content">
              <slot>
                <div class="media">

                  <div class="media-content">
                    <slot>
                      <p class="title is-4" v-if="item.meeting_name.length<20">{{ item.meeting_name }}</p>
                      <p v-else>{{ item.meeting_name.substring(0,20)+"..." }}</p>
                    </slot>
                  </div>
                </div>
              </slot>
              <slot>
                <div class="content">
                  <div class="columns">
                    <div class="column">
                      <slot><small>عنوان دوره:</small></slot>
                    </div>
                  </div>


<!--                    <div class="columns start-date">-->
<!--                      <div class="column">-->
<!--                        <slot><small>آدرس:</small>-->
<!--                          <span :id="index"  :value="item.meeting_name" class="urlCopy">http://conf.ir/{{item.meeting_name}}</span>-->
<!--                        </slot>-->
<!--                      </div>-->
<!--                      <div class="column is-7 is-size-7">-->
<!--                        <b-button icon-right="content-copy"  class="button is-small" @click="copyUrl"></b-button>-->
<!--                      </div>-->
<!--                    </div>-->

                  <div class="columns">
                      <slot>
                        <b-collapse :open="false" position="is-bottom" aria-id="contentIdForA11y1">
                          <template #trigger="props">
                            <a class="is-size-7" aria-controls="contentIdForA11y1">
                              <b-icon :icon="!props.open ? 'menu-down' : 'menu-up'"></b-icon>
                              {{ !props.open ? 'توضیحات' : 'بستن' }}
                            </a>
                          </template>
                          <p v-if="item.description">{{ item.description }} </p>
                          <p v-else>{{ "بدون توضیح" }} </p>
                        </b-collapse>
                      </slot>
                  </div>
                  <slot>
                    <div class="columns start-date">
                      <div class="column">
                        <slot><small>زمان شروع:</small></slot>
                      </div>
                      <div class="column is-7 is-size-7">
                        <slot><small>{{ item.start_time }}</small></slot>
                      </div>
                    </div>
                  </slot>
                  <div class="columns">
                    <div class="column is-flex ">
                      <b-button
                          class="is-light"
                          type="is-info"
                          icon-right="square-edit-outline is-light"
                          @click="editClass(item)"
                      />
                    </div>
                    <div class="column  is-flex">
                      <b-button
                          class="is-light"
                          type="is-success"
                          icon-right="play-outline"
                          @click="deleteRow(index)"
                      />
                    </div>
                    <div class="column  is-flex ">
                      <b-button
                          class="is-light"
                          type="is-danger"
                          icon-right="delete-outline"
                          @click="deleteRow(index ,item.id)"
                      />
                    </div>
                  </div>
                </div>
              </slot>

            </div>

          </slot>
        </ClassCard>

      </div>
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
  copyUrl () {

    let copyText = document.getElementById("testing-code2");
    let textArea = document.createElement("textarea");
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    let successful = document.execCommand("Copy");
    textArea.remove();

    let msg = successful ? 'ذخیره شد' : 'ذخیره نشد';
    this.$buefy.toast.open({
      message: 'لینک ' + msg,
      type: 'is-success'
    })
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