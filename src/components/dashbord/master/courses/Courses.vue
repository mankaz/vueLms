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

    <b-table
        :data="data"
        :paginated="isPaginated"
        :per-page="perPage"
        :current-page.sync="currentPage"
        :pagination-simple="isPaginationSimple"
        :pagination-position="paginationPosition"
        :default-sort-direction="defaultSortDirection"
        :pagination-rounded="isPaginationRounded"
        :sort-icon="sortIcon"
        :sort-icon-size="sortIconSize"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page">

      <b-table-column field="id" label="ردیف" width="40" sortable numeric v-slot="props">
        {{ props.row.id }}
      </b-table-column>

      <b-table-column field="user.first_name" label="عنوان دوره" sortable v-slot="props">
        {{ props.row.user.class_name }}
      </b-table-column>

      <b-table-column field="user.last_name" label="سرویس" sortable v-slot="props">
        {{ props.row.user.service_name }}
      </b-table-column>

      <b-table-column field="date" label="عملیات" sortable centered>
        <b-tooltip label="مشاهده"
                   position="is-top">
          <b-button
              rounded
              class="is-light nav-btn-space action-btn"
              type="is-link"
              icon-right="play-circle-outline"/>
        </b-tooltip>

        <b-tooltip label="حذف"
                   position="is-top">
          <b-button
              rounded
              class="is-light nav-btn-space"
              type="is-danger"
              icon-right="delete"
              @click="confirmCustom"
          />
        </b-tooltip>

      </b-table-column>


    </b-table>
  </section>
</template>

<script>
const data = require('../../../../sample.json')

export default {
  data() {
    return {
      data,
      isPaginated: true,
      isPaginationSimple: false,
      isPaginationRounded: false,
      paginationPosition: 'bottom',
      defaultSortDirection: 'desc',
      sortIcon: 'arrow-up',
      sortIconSize: 'is-small',
      currentPage: 1,
      perPage: 5
    }
  },
  methods : {
    confirmCustom() {
      this.$buefy.dialog.confirm({
        title: 'حذف کلاس',
        message: `آیا از حذف این کلاس اطمینان دارید؟`,
        cancelText: 'انصرف',
        confirmText: 'بله',
        type: 'is-danger',
        onConfirm: () => this.$buefy.toast.open('حذف با موفقیت انجام شد')
      })

    }
  }
}
</script>