<!-- eslint-disable -->
<template>
  <section>
    <div class="columns">
      <div class="column control services-btn is-flex is-justify-content-left">
        <b-button tag="router-link" :to="{ path: '/AddUsers' }" exact  class="is-size-7"
                  type="is-success" rounded
                  icon-right="plus-thick">
          ایجاد کاربر
        </b-button>
      </div>
      <div class="is-flex is-justify-content-flex-end">
        <div class="media-content">
          <small class="is-size-6 is-family-iranSans is-size-5 dir-ltr">  کاربران <b-icon icon="account-multiple" ></b-icon>  </small>
          <p class="is-family-iranSans is-size-7">:کاربران مجاز جهت استفاده از دوره ها در این صفحه لیست شده اند</p>
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
          <th>عنوان دوره</th>
          <th>نام کابری</th>
          <th>نام</th>
          <th>ایمیل</th>
          <th>نقش</th>
          <th>عملیات</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index )  in paginate " :key="index">
          <td>{{ item.title }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.title }}</td>
          <td>
            <div class="columns">
              <div class="column">
                <b-button
                    type="is-info"
                    icon-right="square-edit-outline is-light"
                />
              </div>
              <div class="column">
                <b-button
                    type="is-danger"
                    icon-right="delete-outline"
                    @click="deleteRow(index,item.id)"
                />
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>

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
      isFullPage: false
    }
  },
  methods: {

    deleteRow(i,id) {
      let $vm = this;
      this.$buefy.dialog.confirm({
        title: 'حذف دوره',
        message: `آیا از حذف این دوره اطمینان دارید؟`,
        cancelText: 'انصرف',
        confirmText: 'بله',
        type: 'is-danger',
        onConfirm: function () {
          // console.log(($vm.currentPage-1)* $vm.itemsPerPage +i)
          const form = new FormData();
          form.append("courseId", id);
          const headers = { 'content-type': 'application/x-www-form-urlencoded' };
          axios.post("http://gholeydoon.ir/bbb/public/BBBController/deleteCourse",form, {headers, })
              .then(()=> {
                $vm.posts.splice(($vm.currentPage-1)* $vm.itemsPerPage +i, 1);
                this.$buefy.toast.open({
                  message: 'دوره مورد نظر با موفقیت حذف شد',
                  type: 'is-success',
                  position: 'is-top',
                })
              })
          this.$buefy.toast.open({
            message: 'کلاس مورد نظر با موفقیت حذف شد',
            type: 'is-warning',
            position: 'is-bottom',
          })
        }

      })
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
  created() {
    this.isLoading = true

    axios
        .post('http://gholeydoon.ir/bbb/public/BBBController/getCourses')
        .then((response) => {
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
  components: {
    upload
  }
}

</script>