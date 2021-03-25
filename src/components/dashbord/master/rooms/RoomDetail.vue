<template>
  <section>

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

      <b-table-column field="user.first_name" label="عنوان" sortable v-slot="props">
        {{ props.row.user.room_name }}
      </b-table-column>

      <b-table-column field="user.last_name" label="سرویس" sortable v-slot="props">
        {{ props.row.user.service_name }}
      </b-table-column>

      <b-table-column field="date" label="وضعیت" sortable centered v-slot="props">
                <span class="tag is-success">
                    {{ props.row.user.situation }}
                </span>
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
  }
}
</script>