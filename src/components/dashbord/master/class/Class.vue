<!-- eslint-disable -->
<template>
  <section>
    <div class="columns">
      <div class="column control services-btn is-flex is-justify-content-left">
        <b-button tag="router-link" class="is-size-7" :to="{ path: '/AddClass' }" exact type="is-success" rounded
                  icon-right="plus-thick">
          ایجاد کلاس جدید
        </b-button>
      </div>
      <div class="is-flex is-justify-content-flex-end">
        <div class="media-content">
          <small class="is-family-iranSans is-size-5 dir-ltr">کلاس ها  <b-icon icon="google-classroom" size="is-normal"></b-icon></small>
          <p class="is-family-iranSans is-size-7">:با انتخاب یک دوره، کلاس های زیرمجموعه دوره انتخاب شده نمایش داده می شود</p>
          <br>
        </div>
      </div>

    </div>
    <div class="columns">
      <div class="column is-flex is-justify-content-center">
        <b-field class="class-search" label="جستجو در عنوان کلاس" :label-position="labelPosition">
          <b-input v-model="search"></b-input>
        </b-field>
      </div>
      <div class="column is-flex is-justify-content-center">
                <b-field>
                  <b-select @input="getMeeting()" v-model="courseId">
                    <option :value="null" disabled>انتخاب دوره مورد نظر</option>
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

import ClassCard from "@/components/dashbord/master/class/ClassCard";
import upload from "@/components/dashbord/master/extension/upload";

export default {
  data() {
    return {
      isData:true,
      id:null,
      courseId:null,
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
      isFullPage: false,
      selectList:null,
    }
  },
  methods: {
      getMeeting(){
        this.isLoading = true
        const form = new FormData();
        form.append("courseId", this.courseId);
        const headers = {'content-type': 'application/x-www-form-urlencoded'};
        axios
            .post('http://gholeydoon.ir/bbb/public/BBBController/getMeetings',form, {headers})
            .then((response)=> {
              this.posts = response.data
              this.isData = false
              this.isLoading = false
              if(!this.posts){
                this.isData = true
              }
              // this.posts = JSON.parse(JSON.stringify(response.data)).match(/[{].*.[}]/)
              // console.log(typeof JSON.parse(JSON.stringify(response.data.replace('<script',''))))
              // console.log(typeof response.data)
            })

      },
    deleteRow(i,id) {

      let $vm = this;
      this.$buefy.dialog.confirm({
        title: 'حذف کلاس',
        message: `آیا از حذف این کلاس اطمینان دارید؟`,
        cancelText: 'انصرف',
        confirmText: 'بله',
        type: 'is-danger',
        onConfirm: function () {
          this.isLoading = true
          // $vm.posts.splice(($vm.currentPage-1)* $vm.itemsPerPage +i, 1);
          const form = new FormData();
          form.append("meetingId", id);
          const headers = { 'content-type': 'application/x-www-form-urlencoded' };
          axios.post("http://gholeydoon.ir/bbb/public/BBBController/deleteMeeting",form, {headers, })
              .then(()=> {
                $vm.posts.splice(($vm.currentPage-1)* $vm.itemsPerPage +i, 1);
                this.$buefy.toast.open({
                  message: 'کلاس مورد نظر با موفقیت حذف شد',
                  type: 'is-success',
                  position: 'is-top',
                })
                this.isLoading = false
              })
        }

      })
    },
    editClass(item) {
      // this.$router.push({name: 'editClass',params:{data:i}})
      this.$router.push({name: 'editClass',params:{data:item}})
    },
    copyUrl () {
      let copyText = document.getElementById("testing-code2");
      let textArea = document.createElement("textarea");
      textArea.value = copyText.textContent;
      document.body.appendChild(textArea);
      textArea.select();
      let successful = document.execCommand("Copy");
      textArea.remove();
      console.log(textArea.value)
      let msg = successful ? 'ذخیره شد' : 'ذخیره نشد';
      this.$buefy.toast.open({
        message: 'لینک ' + msg,
        type: 'is-success'
      })
    },
    setPage: function (pageNumber) {
      this.currentPage = pageNumber
    }
  },
   created() {

     //
     // axios
     //    .post('http://gholeydoon.ir/bbb/public/BBBController/getAllMeetings')
     //    .then((response)=> {
     //     this.posts = response.data
     //      this.isLoading = false
     //      // this.posts = JSON.parse(JSON.stringify(response.data)).match(/[{].*.[}]/)
     //      // console.log(typeof JSON.parse(JSON.stringify(response.data.replace('<script',''))))
     //      // console.log(typeof response.data)
     //    })
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
            // console.log(searchResult.length)
          }
          this.resultCount = searchCount
          // console.log(this.resultCount)
          return searchResult;
        });

      }
      // console.log(this.posts )
      let index = this.currentPage * this.itemsPerPage - this.itemsPerPage
      return this.posts.slice(index, index + this.itemsPerPage)
    },
  },
  mounted() {
    const headers = {'content-type': 'application/x-www-form-urlencoded'};
    axios.post("http://gholeydoon.ir/bbb/public/BBBController/getCourses", {headers, })
        .then((data)=> {
          this.selectList = data.data
          // console.log(this.selectList)
        })
  },
  components: {
    ClassCard,upload
  }
}

</script>