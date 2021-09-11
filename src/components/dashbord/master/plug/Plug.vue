<!-- eslint-disable -->
<template >
  <section >
    <vs-row ref="content" class="column is-10-desktop is-10-tablet is-8-mobile">
      <div  class="box">
        <div class="columns">
          <div class="column control services-btn is-flex is-justify-content-left">
          </div>
          <div class="is-flex is-justify-content-flex-end">
            <div class="media-content">
              <small class="is-size-6 is-family-iranSans is-size-5 dir-ltr">  حضور کاربران <b-icon icon="account-multiple" ></b-icon>  </small>
              <p class="is-family-iranSans is-size-7">.میزان حضور کاربران در این قسمت قابل مشاهده می باشد</p>
              <br>
            </div>
          </div>
        </div>
        <div class="columns is-flex  is-justify-content-flex-end ">
          <div class="column">
          </div>
          <div class="column is-4-desktop is-rtl">
            <b-field class="class-search" label="جستجو نام کاربر" :label-position="labelPosition">
              <b-input v-model="search"></b-input>
            </b-field>
          </div>
        </div>
        <b-notification :closable="false">
          <b-loading :is-full-page="isFullPage" v-model="isLoading" :can-cancel="false"></b-loading>
        </b-notification>
        <div class="columns  is-desktop is-multiline ">
          <table class="table is-striped is-hoverable is-fullwidth">
            <thead>
            <tr>
              <th>کلاس</th>
              <th>تعداد حاضرین</th>
              <th>زمان شروع</th>
              <th>مدت زمان کلاس</th>
              <th>کل زمان حضور</th>
              <th>جزئیات</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index )  in paginate " :key="index">
              <td>{{ item.meeting_name }}</td>
              <td>{{ item.meeting_name }}</td>
              <td>{{ item.meeting_name }}</td>
              <td>{{ item.meeting_name }}</td>
              <td>{{ item.meeting_name }}</td>
              <td>
                <div class="columns">
                  <div class="column">
                    <vs-button
                        transparent
                        icon
                        @click="editUser(item)"
                    >
                      <i class='bx bx-detail'></i>
                    </vs-button>
                  </div>
                </div>
              </td>
            </tr>
            </tbody>
          </table>

        </div>

        <div class="column is-flex is-align-content-center is-justify-content-center">
          <vs-pagination v-if="contentLoading" :color="paginationColor"  v-model="currentPage" :length="totalPages" />
        </div>
      </div>
    </vs-row>
  </section>
</template>
<!-- eslint-disable -->

<script>

import axios from "axios";

import upload from "@/components/dashbord/master/extension/upload";

export default {
  data() {
    return {
      className: '',
      courseId: null,
      classStartDate: '',
      classEndDate: '',
      classDescription: '',
      classImage: '',
      labelPosition: 'on-border',
      publicPath: process.env.BASE_URL,
      isCardModalActive: false,
      search: '',
      posts: null,
      currentPage: 1,
      itemsPerPage: 4,
      resultCount: 0,
      isLoading: false,
      isFullPage: false,
      contentLoading:false,
      progress: 0,
      paginationColor:'success'
    }
  },
  methods: {
    editUser(item) {
      // this.$router.push({name: 'editClass',params:{data:i}})
      this.$router.push({name: 'editUser',params:{data:item}})
    },
    editClass(i) {
      console.log(i)
      const form = new FormData();
      form.append("className", this.className);
      form.append("course", this.course);
      form.append("classStartDate", this.classStartDate);
      form.append("classEndDate", this.classEndDate);
      form.append("classDescription", this.classDescription);
      form.append("classImage", this.classImage);
      const headers = {'content-type': 'application/x-www-form-urlencoded'};
      axios.post("http://localhost/bbb/CI/public/BBBController/createMeeting/0", form, {headers})
          .then((res) => {
            this.$buefy.toast.open({
              message: 'کلاس مورد نظر با موفقیت ویرایش شد',
              type: 'is-success',
              position: 'is-top',
            })
            console.log(i)
          })
          .catch(err => {
            this.$buefy.toast.open({
              message: 'خطا در ویرایش کلاس',
              type: 'is-danger',
              position: 'is-top',
            })
          })
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
          let searchResult = item.title.match(this.search)
          if (searchResult != null) {
            ++searchCount;
            console.log(searchResult.length)
          }
          this.resultCount = searchCount
          console.log(this.resultCount)
          return searchResult;
        });

      }
      console.log(this.posts)
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
    axios.post("http://gholeydoon.ir/bbb/public/BBBController/getMeetings", {headers, })
        .then((data)=> {
          this.posts = data.data
          loading.close()
          clearInterval(interval)
          this.progress = 0
          this.contentLoading= true
          // console.log(this.selectList)
        })
  },
  components: {
    upload
  }
}

</script>