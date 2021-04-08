<template>
  <section>

    <div class="control services-btn is-flex is-justify-content-left">
      <b-button tag="router-link" :to="{ path: '/AddCourses' }" exact type="is-info" rounded
                icon-right="plus-thick">
        ایجاد دوره جدید
      </b-button>
    </div>

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

      <b-table-column field="id" label="ردیف" width="40" numeric v-slot="props">
        {{ props.row.id }}
      </b-table-column>

      <b-table-column field="user.first_name" label="عنوان دوره" sortable v-slot="props">
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
                <span class="tag is-success">
                   {{ props.row.start_date }}
                </span>
      </b-table-column>

      <b-table-column label="Gender" v-slot="props">
                <span>
                    <b-icon pack="fas"
                            :icon="props.row.gender === 'Male' ? 'mars' : 'venus'">
                    </b-icon>
                    {{ props.row.gender }}
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
            <small class="description-detail">توضیحات دوره:</small>
              <p>{{ props.row.description }}</p>
            <br>
            <div class="description-detail">
            <small>کلاس های برگزار شده در این دوره:</small>
            <span class="tag is-info">
               {{ props.row.class_count }} کلاس
            </span>
            <small class=" user-count">تعداد شرکت کنندگان:</small>
            <span class="tag is-info">
               {{ props.row.user.user_count }} نفر
            </span>
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
      showDetailIcon: true
    }
  },
  methods: {
    getImgUrl(i) {
      if (i >= 1) {
        return data[i]['user']['courses_img'];
      }
    },
    onError(e) {
      let defaultURL = data;
      if (e.target.src !== defaultURL) {
        e.target.src = defaultURL;
      }
    }

    // getImageUrl(){
    //   for(let i = 0 ; i<Object.keys(data).length; i++ ) {
    //     console.log(data[i]['user']['courses_img'])
    //     if (data[i]){
    //      return  require (`@/assets/img/${data[i]['user']['courses_img']}` + '.png')
    //     }
    //
    //   }


    // Object.keys(data).forEach(function(key) {
    //   console.log(data[key]['user']['courses_img'])
    //   return require (`@/assets/img/${data[key]['user']['courses_img']}` + '.png')
    // })


  },

  computed: {
    // transitionName() {
    //   if (this.useTransition) {
    //     return 'fade'
    //   }
    // }
  }
}
</script>