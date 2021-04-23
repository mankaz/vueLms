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
        <b-field  label="جستجو در عنوان کلاس" :label-position="labelPosition">
          <b-input v-model="search"></b-input>
        </b-field>
      </div>
    </div>

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
                      <p class="title is-4">{{item.user.class_name}}</p>
                    </slot>
                  </div>
                </div>
              </slot>
              <slot>
                <div class="content">
                  <slot>
                    <p>{{item.description}} </p>
                  </slot>
                  <slot>
                    <div class="columns start-date">
                      <div class="column">
                        <slot><small>زمان شروع</small></slot>
                      </div>
                      <div class="column is-7 is-size-7">
                        <slot><small>{{ item.start_date }}</small></slot>
                      </div>
                    </div>
                  </slot>
                  <div class="columns">
                        <div class="column is-flex ">
                          <b-button
                              class="is-light"
                              type="is-info"
                              icon-right="square-edit-outline is-light"
                              @click="editCourse(index)"
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

    </div>
<div class="column is-flex is-align-content-center is-justify-content-center">
  <nav class="pagination" role="navigation" aria-label="pagination">
  <ul class="pagination-list">
    <li class="is-flex align-items-center is-justify-content-center is-align-content-center" v-for="pageNumber in totalPages" v-if="Math.abs(pageNumber - currentPage) < 3 || pageNumber === totalPages || pageNumber === 1" :key="pageNumber">
      <span v-if="(pageNumber === totalPages && Math.abs(pageNumber - currentPage) > 3) ">...</span>
      <a :key="pageNumber"  @click.prevent="setPage(pageNumber)" :class="{'pagination-link is-current ': currentPage === pageNumber,'pagination-link' : pageNumber}">{{ pageNumber }}</a>
      <span v-if="(pageNumber === 1 && Math.abs(pageNumber - currentPage) > 3)">...</span>
    </li>
  </ul>
  </nav>
</div>
  </section>

</template>
<!-- eslint-disable -->
<script>

const data = require('../../../../sample.json')
import ClassCard from "@/components/dashbord/master/class/ClassCard";
import EditClass from "@/components/dashbord/master/class/EditClass";

export default {
  data() {
    return {
      labelPosition: 'on-border',
      publicPath: process.env.BASE_URL,
      data,
      search: '',
      currentPage: 1,
      itemsPerPage: 4,
      resultCount: 0,
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
          $vm.data.splice(i,1);
          // console.log($vm.data[i]['id'])
          this.$buefy.toast.open({
            message: 'کلاس مورد نظر با موفقیت حذف شد',
            type: 'is-warning',
            position: 'is-bottom',
          })
        }

      })
    },
    editCourse(i) {
      this.$buefy.dialog.prompt({
        message: `What's your age?`,
        inputAttrs: {
          placeholder: 'Type your age',
          value: this.data[i]['id']
        },

        trapFocus: true,
        onConfirm: function (value) {
          this.$buefy.toast.open(`Your age is: ${value}`)

        }
      })
    },

      setPage: function(pageNumber) {
        this.currentPage = pageNumber

    }
  },
  computed: {
    totalPages: function() {
      return Math.ceil(this.resultCount / this.itemsPerPage)
    },
    paginate: function() {

      if (!this.data || this.data.length !== this.data.length) {
        return
      }
      this.resultCount = this.data.length
      if (this.currentPage >= this.totalPages) {
        this.currentPage = this.totalPages
      }
      if (this.search !== '') {
        return this.data.filter((item) => {
          return item.user.class_name.match(this.search);
        });
      }
      let index = this.currentPage * this.itemsPerPage - this.itemsPerPage
      return this.data.slice(index, index + this.itemsPerPage)
    },
  },
  components: {
    ClassCard,EditClass
  }
}
</script>