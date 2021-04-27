<!-- eslint-disable -->
<template>
  <section>
    <div class="columns">
      <div class="column control services-btn is-flex is-justify-content-left">
        <b-button tag="router-link" :to="{ path: '/AddClass' }" exact type="is-info" rounded
                  icon-right="plus-thick">
          ایجاد کلاس جدید
        </b-button>
      </div>
      <div class="is-flex is-justify-content-flex-end">
        <div class="media-content">
          <small class="is-family-iranSans is-size-5 dir-ltr">کلاس ها</small>
          <p class="is-family-iranSans is-size-7">:جزئیات کلاس های ایجاد شده شما در این صفحه لیست شده اند</p>
          <br>
        </div>
      </div>

    </div>
    <div class="columns is-flex  is-justify-content-flex-end ">
      <div class="column">
      </div>
      <div class="column is-4-desktop is-rtl">
        <b-field class="class-search" label="جستجو در عنوان کلاس" :label-position="labelPosition">
          <b-input v-model="search"></b-input>
        </b-field>
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
                          @click="editClass(item.id)"
                      />
<!--                      <router-link :to="{ name: 'editClass', params: { id: item.id, isRegisteringMe:'ffffffff' }}">Register</router-link>-->
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
                          @click="deleteRow(index)"
                      />
                    </div>
                  </div>
                </div>
              </slot>

            </div>

          </slot>
        </ClassCard>

      </div>
<!--      <b-modal v-model="isCardModalActive" full-screen :can-cancel="false" scroll="keep">-->
<!--        <form method="post" @submit.prevent="editClass()" >-->
<!--          <div class="modal-card dir-ltr" style="width: auto">-->
<!--            <header class="modal-card-head">-->
<!--              <p class="modal-card-title">ویرایش کلاس</p>-->
<!--            </header>-->

<!--            <section class="modal-card-body">-->

<!--              <div class="block direction is-flex is-justify-content-center">-->
<!--                <div class="column  is-8-desktop">-->
<!--                  <div class="columns">-->
<!--                    <div class="column">-->
<!--                      <b-field  :label-position="labelPosition"-->
<!--                                label="انتخاب دوره">-->
<!--                        <b-select v-model="course" placeholder="یک عنوان انتخاب نمایید" expanded>-->
<!--                          <option value="پشتیبانی فنی">پشتیبانی فنی</option>-->
<!--                          <option value="واحد مالی">واحد مالی</option>-->
<!--                          <option value="پیشنهادات و انتقادات">پیشنهادات و انتقادات</option>-->
<!--                        </b-select>-->
<!--                      </b-field>-->
<!--                    </div>-->
<!--                    <div class="column">-->
<!--                      <b-field  label="عنوان کلاس" :label-position="labelPosition">-->
<!--                        <b-input  ></b-input>-->
<!--                      </b-field>-->
<!--                    </div>-->
<!--                  </div>-->

<!--                  <div class="columns">-->
<!--                    <div class="column">-->
<!--                      <b-field  label="زمان پایان" :label-position="labelPosition">-->
<!--                        <date-picker v-model="classEndDate" class="input" type="datetime" compact-time auto-submit/>-->
<!--                      </b-field>-->
<!--                    </div>-->
<!--                    <div class="column">-->
<!--                      <b-field  label="زمان شروع" :label-position="labelPosition">-->
<!--                        <date-picker v-model="classStartDate" class="input" type="datetime" compact-time auto-submit/>-->
<!--                      </b-field>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  <div class="columns">-->
<!--                    <div class="column  is-flex is-align-items-center is-justify-content-center">-->
<!--                      <upload v-model="classImage">-->
<!--                        <slot> <span class="file-label">انتخاب تصویر کلاس</span></slot>-->
<!--                      </upload>-->

<!--                    </div>-->
<!--                    <div class="column">-->
<!--                      <b-field  label="توضحیات دوره" :label-position="labelPosition">-->
<!--                        <b-input  v-model="classDescription" maxlength="400" type="textarea"></b-input>-->
<!--                      </b-field>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  <div class="columns">-->
<!--                    <div class="column">-->
<!--                    </div>-->
<!--                    <div class="column is-flex is-align-items-center is-justify-content-center">-->
<!--                      <b-field>-->
<!--                        <b-checkbox :value="true" class="is-family-iranSans">-->
<!--                          قابلیت ضبظ-->
<!--                        </b-checkbox>-->
<!--                      </b-field>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  <div class="column is-flex is-justify-content-center"> <b-button tag="router-link" :to="{ path: '/AddClass/', params: { itemId: item.id } }" exact  class="button is-success is-rounded ">-->
<!--                    <span>ویرایش  کلاس</span>-->
<!--                    <span class="icon is-small">-->
<!--                 <i class="fas fa-check"></i>-->
<!--                 </span>-->
<!--                  </b-button>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </section>-->

<!--            <footer class="modal-card-foot">-->
<!--              <b-button-->
<!--                  label="انصراف"-->
<!--                  type="is-warning"-->
<!--                  @click="isCardModalActive=false" />-->
<!--            </footer>-->
<!--          </div>-->
<!--        </form>-->
<!--      </b-modal>-->
    </div>

    <div class="column is-flex is-align-content-center is-justify-content-center">
      <nav class="pagination" role="navigation" aria-label="pagination">
        <ul class="pagination-list">
          <li class="is-flex align-items-center is-justify-content-center is-align-content-center"
              v-for="pageNumber in totalPages"
              v-if="Math.abs(pageNumber - currentPage) < 3 || pageNumber === totalPages || pageNumber === 1"
              :key="pageNumber">
            <span v-if="(pageNumber === totalPages && Math.abs(pageNumber - currentPage) > 3) ">...</span>
            <a :key="pageNumber" @click.prevent="setPage(pageNumber)"
               :class="{'pagination-link is-current ': currentPage === pageNumber,'pagination-link' : pageNumber}">{{
                pageNumber
              }}</a>
            <span v-if="(pageNumber === 1 && Math.abs(pageNumber - currentPage) > 3)">...</span>
          </li>
        </ul>
      </nav>
    </div>

  </section>

</template>
<!-- eslint-disable -->
<script>

import axios from "axios";

// const posts = require('../../../../sample.json')
import ClassCard from "@/components/dashbord/master/class/ClassCard";
import upload from "@/components/dashbord/master/extension/upload";

export default {
  props: {
    someValueToPass: String
  },
  data() {
    return {
      className : '',
      course : '',
      classStartDate :'',
      classEndDate:'',
      classDescription:'',
      classImage:'',
      labelPosition: 'on-border',
      publicPath: process.env.BASE_URL,
      isCardModalActive: false,
      search: '',
      posts:null,
      currentPage: 1,
      itemsPerPage: 4,
      resultCount: 0,
      isLoading: false,
      isFullPage: false
    }
  },
  methods: {

    deleteRow(i) {
      let $vm = this;
      this.$buefy.dialog.confirm({
        title: 'حذف کلاس',
        message: `آیا از حذف این کلاس اطمینان دارید؟`,
        cancelText: 'انصرف',
        confirmText: 'بله',
        type: 'is-danger',
        onConfirm: function () {
          console.log(i)
          $vm.posts.splice(i, 1);
          // console.log($vm.data[i]['id'])
          this.$buefy.toast.open({
            message: 'کلاس مورد نظر با موفقیت حذف شد',
            type: 'is-warning',
            position: 'is-bottom',
          })
        }

      })
    },
    editClass(i) {
      this.$router.push({name: 'editClass',params:{data:i}})
    },
    setPage: function (pageNumber) {
      this.currentPage = pageNumber
    }
  },
   created() {
     this.isLoading = true

     axios
        .post('http://gholeydoon.ir/bbb/public/BBBController/getMeetings/0')
        .then((response)=> {
         this.posts = response.data
          this.isLoading = false
          // this.posts = JSON.parse(JSON.stringify(response.data)).match(/[{].*.[}]/)
          // console.log(typeof JSON.parse(JSON.stringify(response.data.replace('<script',''))))
          // console.log(typeof response.data)
        })
  },

  computed: {
    totalPages: function () {
      return Math.ceil(this.resultCount / this.itemsPerPage)
    },

    paginate: function () {
      if (!this.posts || this.posts.length !== this.posts.length) {
        return
      }
      this.resultCount = this.posts.length
      if (this.currentPage >= this.totalPages) {
        this.currentPage = this.totalPages
      }
      if (this.search !== '') {
        let searchCount = 0;
        return this.posts.filter((item) => {
          let searchResult = item.meeting_name.match(this.search)
          if (searchResult != null) {
            ++searchCount;
            console.log(searchResult.length)
          }
          this.resultCount = searchCount
          console.log(this.resultCount)
          return searchResult;
        });

      }
      console.log(this.posts )
      let index = this.currentPage * this.itemsPerPage - this.itemsPerPage
      return this.posts.slice(index, index + this.itemsPerPage)
    },
  },
  components: {
    ClassCard,upload
  }
}

</script>