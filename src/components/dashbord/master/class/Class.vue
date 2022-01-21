<!-- eslint-disable -->
<template>
  <section>
    <vs-row ref="content" class="column is-10-desktop is-10-tablet is-8-mobile">
      <div  class="box">
    <div class="columns">
      <div class="column control services-btn is-flex is-justify-content-left">
      </div>
      <div class="is-flex is-justify-content-flex-end">
        <div class="media-content">
          <small class="is-size-6 is-family-iranSans is-size-5 dir-ltr">کلاس ها </small>
          <p class="is-family-iranSans is-size-7">.با انتخاب یک دوره، کلاس های زیرمجموعه دوره انتخاب شده نمایش داده می شود</p>
          <br>
        </div>
      </div>

    </div>

    <vs-row justify="center"  v-if="contentLoading">
      <vs-row class="column is-flex is-justify-content-center">
        <vs-input v-model="search"  icon-after  placeholder="جستجو در عنوان کلاس" >
          <template #icon>
            <i class='bx bx-search'></i>
          </template>
        </vs-input>
      </vs-row>
      <vs-row class="column is-flex is-justify-content-center">
        <vs-select ref="dropdown" autocomplete="off" filter placeholder="انتخاب دوره" @input="getMeeting()" v-model="courseId" v-if="selectList">
          <vs-option  v-for="option in selectList" :value="option.id" :key="option.id" :label="option.title">
            {{ option.title}}
          </vs-option>
        </vs-select>
      </vs-row>
    </vs-row>
      <div v-if="isData" class="column is-flex is-justify-content-center is-justify-content-flex-end">
        <vs-row justify="center"  v-if="contentLoading">
          <p class="is-family-iranSans is-size-7">!داده ای برای نمایش وجود ندارد</p>
        </vs-row>

    </div>
    <div class="columns">
      <div class="column is-one-quarter" v-for="(item,index )  in paginate " :key="index">
        <ClassCard>
          <slot>
            <div class="card-image">
              <slot>
                <a  class="is-size-7" type="is-text"  @click="ClassDetail(item)">
                <figure class="image is-4by3">
                  <img class="image is-flex is-align-items-center courses-img is-128x128"
                       :src="item.img">
                </figure>
                </a>
              </slot>
            </div>
          </slot>
          <slot>
            <div class="card-content">
              <slot>
                <div class="media">

                  <div class="media-content">
                    <slot>
                      <p class="title is-4" v-if="item.meeting_name.length<20">

                        <a  class="is-size-7" type="is-text" rounded @click="ClassDetail(item)">
                          {{ item.meeting_name }}
                        </a>
                      </p>
                      <p v-else>{{ item.meeting_name.substring(0,20)+"..." }}</p>
                    </slot>
                  </div>
                </div>
              </slot>
              <slot>
                <div class="content">
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
                      <vs-button
                          transparent
                          icon
                          @click="editClass(item)"
                      >
                        <i class='bx bx-edit-alt'></i>
                      </vs-button>
                    </div>
                    <div class="column  is-flex">
                      <vs-button
                          transparent
                          icon
                          danger
                          @click="deleteRow(index ,item.id)"
                      >
                        <i class='bx bx-trash'></i>
                      </vs-button>
                    </div>
                    <div class="column  is-flex">
                      <vs-button
                          transparent
                          icon
                          success
                      >
                        <i class='bx bx-play'></i>
                      </vs-button>
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
      <vs-pagination  v-if="contentLoading" :color="paginationColor"  v-model="currentPage" :length="totalPages" />
<!--      <nav class="pagination" role="navigation" aria-label="pagination">-->
<!--        <ul class="pagination-list">-->
<!--          <li class="is-flex align-items-center is-justify-content-center is-align-content-center"-->
<!--              v-for="pageNumber in totalPages"-->
<!--              v-if="Math.abs(pageNumber - currentPage) < 3 || pageNumber === totalPages || pageNumber === 1"-->
<!--              :key="pageNumber">-->
<!--            <span v-if="(pageNumber === totalPages && Math.abs(pageNumber - currentPage) > 3) ">...</span>-->
<!--            <a :key="pageNumber" @click.prevent="setPage(pageNumber)"-->
<!--               :class="{'pagination-link is-current ': currentPage === pageNumber,'pagination-link' : pageNumber}">{{-->
<!--                pageNumber-->
<!--              }}</a>-->
<!--            <span v-if="(pageNumber === 1 && Math.abs(pageNumber - currentPage) > 3)">...</span>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </nav>-->
    </div>
      </div>
    </vs-row>

  </section>

</template>
<!-- eslint-disable -->
<script>

import axios from "axios";

import ClassCard from "@/components/dashbord/master/class/ClassCard";
import upload from "@/components/dashbord/master/extension/upload";
import Vue from "vue";
Vue.use(require('vue-cookies'))

export default {

  data() {
    return {
      value: '',
      isData:true,
      id:null,
      courseId:'',
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
      selectList:'',
      contentLoading:false,
      progress: 0,
      paginationColor:'success'

    }
  },
  methods: {
      getMeeting(){
        const loading = this.$vs.loading({
          target: this.$refs.content,
          scale: '0.6',
          opacity: 0.1,
        })
        const form = new FormData();
        form.append("courseId", this.courseId);
        const headers = {'content-type': 'application/x-www-form-urlencoded'};
        axios
            .post('https://gholeydoon.ir/bbb/public/BBBController/getMeetings',form, {headers})
            .then((response)=> {
              this.posts = response.data
              this.isData = false
              loading.close()
              if(!this.posts){
                this.isData = true
              }

              this.$cookies.set('dropdown',this.posts[0]['course_id']);
             // this.courseId=this.$cookies.get('dropdown')

              // this.posts = JSON.parse(JSON.stringify(response.data)).match(/[{].*.[}]/)
              // console.log(typeof JSON.parse(JSON.stringify(response.data.replace('<script',''))))
              // console.log(typeof response.data)
            })

      },
    deleteRow(i,id,duration, position = null, icon) {

      let result = confirm("آیا از حذف کلاس اطمینان دارید؟");
      if (result) {
        const loading = this.$vs.loading()
          const form = new FormData();
          form.append("meetingId", id);
          const headers = { 'content-type': 'application/x-www-form-urlencoded' };
          axios.post("https://gholeydoon.ir/bbb/public/BBBController/deleteMeeting",form, {headers, })
              .then(()=> {
                this.posts.splice((this.currentPage-1)* this.itemsPerPage +i, 1);
                loading.close()
                this.$vs.notification({
                  duration,
                  icon,
                  color: 'success',
                  position,
                  progress: 'auto',
                  title: 'کلاس مورد نظر با موفقیت حذف شد',
                })
              })
      }




      // this.isLoading = true
      // $vm.posts.splice(($vm.currentPage-1)* $vm.itemsPerPage +i, 1);
      // const form = new FormData();
      // form.append("meetingId", id);
      // const headers = { 'content-type': 'application/x-www-form-urlencoded' };
      // axios.post("http://gholeydoon.ir/bbb/public/BBBController/deleteMeeting",form, {headers, })
      //     .then(()=> {
      //       $vm.posts.splice(($vm.currentPage-1)* $vm.itemsPerPage +i, 1);
      //       this.$buefy.toast.open({
      //         message: 'کلاس مورد نظر با موفقیت حذف شد',
      //         type: 'is-success',
      //         position: 'is-top',
      //       })
      //       this.isLoading = false
      //     })
      //
      // let $vm = this;
      // this.$buefy.dialog.confirm({
      //   title: 'حذف کلاس',
      //   message: `آیا از حذف این کلاس اطمینان دارید؟`,
      //   cancelText: 'انصرف',
      //   confirmText: 'بله',
      //   type: 'is-danger',
      //   onConfirm: function () {
      //     this.isLoading = true
      //     // $vm.posts.splice(($vm.currentPage-1)* $vm.itemsPerPage +i, 1);
      //     const form = new FormData();
      //     form.append("meetingId", id);
      //     const headers = { 'content-type': 'application/x-www-form-urlencoded' };
      //     axios.post("http://gholeydoon.ir/bbb/public/BBBController/deleteMeeting",form, {headers, })
      //         .then(()=> {
      //           $vm.posts.splice(($vm.currentPage-1)* $vm.itemsPerPage +i, 1);
      //           this.$buefy.toast.open({
      //             message: 'کلاس مورد نظر با موفقیت حذف شد',
      //             type: 'is-success',
      //             position: 'is-top',
      //           })
      //           this.isLoading = false
      //         })
      //   }
      //
      // })
    },
    editClass(item) {
      // this.$router.push({name: 'editClass',params:{data:i}})
      this.$router.push({name: 'editClass',params:{data:item}})
    },
    ClassDetail(item) {
      // this.$router.push({name: 'editClass',params:{data:i}})
      this.$router.push({name: 'ClassDetail',params:{data:item}})
    },
    setPage: function (pageNumber) {
      this.currentPage = pageNumber
    }
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
      const loading = this.$vs.loading({
        target: this.$refs.content,
        scale: '0.6',
        progress: 0,
        opacity: 0.1,
      })
      const interval = setInterval(() => {
        if (this.progress <= 100) {
          loading.changeProgress(this.progress++)
        }
      })

    const headers = {'content-type': 'application/x-www-form-urlencoded'};
    axios.post("https://gholeydoon.ir/bbb/public/BBBController/getCourses", {headers, })
        .then((data)=> {
          loading.close()
          clearInterval(interval)
          this.progress = 0
          this.contentLoading= true
          this.selectList = data.data
          // this.$cookies.remove("dropdown");
          if (this.$cookies.get('dropdown')) {
            this.courseId=this.$cookies.get('dropdown')
            this.getMeeting()
          }else {
            this.courseId=this.selectList[0]['id']
          }
        })
  },
  components: {
    ClassCard,upload
  }
}

</script>

