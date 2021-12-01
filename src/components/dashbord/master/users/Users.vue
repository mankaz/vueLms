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
                <vs-button
                    icon
                    @click="editUser(item)"
                >
                  <i class='bx bx-edit'></i>
                </vs-button>
              </div>
              <div class="column">
                <vs-button
                    danger
                    icon
                    @click="deleteRow(index,item.id)"
                >
                  <i class='bx bx-trash'></i>
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
    editUsers(item) {
      // this.$router.push({name: 'editClass',params:{data:i}})
      this.$router.push({name: 'editUser',params:{data:item}})
    },
    setPage: function (pageNumber) {
      this.currentPage = pageNumber
    }
  },
  created() {
    // this.isLoading = true
    //
    // axios
    //     .post('http://gholeydoon.ir/bbb/public/BBBController/getCourses')
    //     .then((response) => {
    //       this.posts = response.data
    //       this.isLoading = false
    //       // this.posts = JSON.parse(JSON.stringify(response.data)).match(/[{].*.[}]/)
    //       // console.log(typeof JSON.parse(JSON.stringify(response.data.replace('<script',''))))
    //       // console.log(typeof response.data)
    //     })
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
    axios.post("http://gholeydoon.ir/bbb/public/BBBController/getCourses", {headers, })
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