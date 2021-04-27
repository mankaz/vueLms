<!-- eslint-disable -->
<template>
  <section>
    <div class="columns">
      <div class="column control services-btn is-flex is-justify-content-left">
        <b-button tag="router-link" :to="{ path: '/AddCourses' }" exact type="is-info" rounded
                  icon-right="plus-thick">
          ایجاد دوره جدید
        </b-button>
      </div>
      <div class="is-flex is-justify-content-flex-end">
        <div class="media-content">
          <small class="is-family-iranSans is-size-5 dir-ltr">دوره ها</small>
          <p class="is-family-iranSans is-size-7">:جزئیات دوره های ایجاد شده شما در این صفحه لیست شده اند</p>
          <br>
        </div>
      </div>
    </div>
    <div class="columns is-flex  is-justify-content-flex-end ">
      <div class="column">
      </div>
      <div class="column is-4-desktop is-rtl">
        <b-field class="class-search" label="جستجو در عنوان دوره" :label-position="labelPosition">
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
          <th>توضیحات</th>
          <th>عملیات</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index )  in paginate " :key="index">
          <td>{{ item.meeting_name }}</td>
          <td>{{ item.description }}</td>
          <td>
            <div class="columns">
              <div class="column">
                <b-button
                    type="is-info"
                    icon-right="square-edit-outline is-light"
                    @click="isCardModalActive = true"
                />
              </div>
              <div class="column">
                <b-button
                    type="is-danger"
                    icon-right="delete-outline"
                    @click="deleteRow(index)"
                />
              </div>
            </div>
          </td>
          <b-modal v-model="isCardModalActive" full-screen :can-cancel="false" scroll="keep">

            <form method="post" @submit.prevent="editClass()">
              <div class="modal-card dir-ltr" style="width: auto">
                <header class="modal-card-head">
                  <p class="modal-card-title">ویرایش دوره</p>
                </header>

                <section class="modal-card-body">

                  <div class="block direction is-flex is-justify-content-center">
                    <div class="column  is-8-desktop">
                      <div class="columns">

                        <div class="column">
                          <b-field label="عنوان دوره" :label-position="labelPosition">
                            <b-input v-model="className"></b-input>
                          </b-field>
                        </div>
                      </div>

                      <div class="columns">
                        <div class="column is-flex is-flex is-align-items-center is-justify-content-center">
                          <upload>
                            <slot><span class="file-label">انتخاب تصویر دوره</span></slot>
                          </upload>
                        </div>
                        <div class="column">
                          <b-field label="توضحیات دوره" :label-position="labelPosition">
                            <b-input v-model="courseDescription" maxlength="400" type="textarea"></b-input>
                          </b-field>
                        </div>
                      </div>


                      <div class="column is-flex is-justify-content-center">
                        <button @click="editClass(item.id)" class="button is-success is-rounded ">
                          <span>ویرایش  کلاس</span>
                          <span class="icon is-small">
                 <i class="fas fa-check"></i>
                 </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                <footer class="modal-card-foot">
                  <b-button
                      label="انصراف"
                      type="is-warning"
                      @click="isCardModalActive=false"/>
                </footer>
              </div>
            </form>
          </b-modal>
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

// const posts = require('../../../../sample.json')
import ClassCard from "@/components/dashbord/master/class/ClassCard";
import upload from "@/components/dashbord/master/extension/upload";

export default {
  data() {
    return {
      className: '',
      course: '',
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
        .post('http://gholeydoon.ir/bbb/public/BBBController/getMeetings/0')
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
      console.log(this.posts)
      let index = this.currentPage * this.itemsPerPage - this.itemsPerPage
      return this.posts.slice(index, index + this.itemsPerPage)
    },
  },
  components: {
    ClassCard, upload
  }
}

</script>