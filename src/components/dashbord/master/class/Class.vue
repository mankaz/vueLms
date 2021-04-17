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


    <span >
<!-- v-for="(row, index) in data" :key="row"-->
    </span>
    <b-table

        :data="data"
        ref="table"
        paginated
        per-page="5"
        :opened-detailed="defaultOpenedDetails"
        detailed
        detail-key="id"
        :show-detail-icon="showDetailIcon"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page">

      <b-table-column  field="id" label="ردیف" width="40" numeric v-slot="props">
        {{ props.row.id }}
      </b-table-column>

      <b-table-column field="user.first_name" label="دوره" sortable v-slot="props">
        <template v-if="showDetailIcon">
          {{ props.row.user.courses_name }}
        </template>
        <template v-else>
          <a @click="props.toggleDetails(props.row)">
            {{ props.row.user.first_name }}
          </a>
        </template>
      </b-table-column>

      <b-table-column field="user.first_name" label="عنوان کلاس" sortable v-slot="props">
        <template v-if="showDetailIcon">
          {{ props.row.user.courses_name }}
        </template>
        <template v-else>
          <a @click="props.toggleDetails(props.row)">
            {{ props.row.user.first_name }}
          </a>
        </template>
      </b-table-column>

      <b-table-column field="date" label="زمان شروع" sortable centered v-slot="props">
                <span class="tag is-light is-info">
                   {{ props.row.start_date }}
                </span>
      </b-table-column>
      <b-table-column field="date" label="زمان پایان" sortable centered v-slot="props">
                <span class="tag is-light is-danger">
                   {{ props.row.end_date }}
                </span>
      </b-table-column>

      <template #detail="props" >
        <article class="media">

          <div class="card">
            <div class="card-image">
              <figure>
                <p class="image is-4by3  is-flex  is-justify-content-center is-align-items-center is-128x128">
                  <img class="image is-flex is-align-items-center courses-img is-128x128" :src="`img/${props.row.user.courses_img}`" >
                </p>
              </figure>
            </div>
          </div>
          <div class="media-content">
            <small class="description-detail">توضیحات کلاس:</small>
              <p>{{ props.row.description }}</p>
            <br>
            <div class="description-detail">
              <small class=" user-count">تعداد شرکت کنندگان:</small>
              <span class="tag is-info">
               {{ props.row.user.user_count }} نفر
            </span>
              <div class="columns is-flex is-justify-content-flex-end">
                <div class="column is-2 is-flex is-justify-content-flex-start">
                    <b-button
                        rounded
                        size="is-small"
                        label="مشاهده"
                        class="nav-btn-space action-btn"
                        type="is-success"
                        icon-right="play-circle-outline"/>
                </div>
                <div class="column is-1 is-flex is-justify-content-flex-end">
                    <b-button
                        rounded
                        size="is-small"
                        label="حذف"
                        class="nav-btn-space action-btn"
                        type="is-danger"
                        icon-right="delete"
                        @click="deleteRow()"
                    />
                </div>
              </div>
            </div>
          </div>
        </article>
      </template>
    </b-table>

  </section>
</template>

<script>

const data = require('../../../../sample.json')

export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
      data,
      defaultOpenedDetails: [1],
      showDetailIcon: true,

    }
  },
  methods: {
    deleteRow() {
      // for(let i=0; i<this.data.length ; i++) {
      //   alert(this.data[i]['id'])
      // }
      let $vm = this;
      this.$buefy.dialog.confirm({
        title: 'حذف کلاس',
        message: `آیا از حذف این کلاس اطمینان دارید؟`,
        cancelText: 'انصرف',
        confirmText: 'بله',
        type: 'is-danger',
        onConfirm:function ()
      {

        for(let a=0; a<$vm.data.length ; a++) {
          // console.log($vm.data[a]['id'])
          $vm.data.splice(a, 1);
        }
        this.$buefy.toast.open({
          message: 'کلاس مورد نظر با موفقیت حذف شد',
          type: 'is-warning',
          position: 'is-bottom',
        })
      }
      })

    }
  },
  computed: {
  }
}
</script>