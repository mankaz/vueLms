<template>
  <section>


      <div class="control services-btn is-justify-content-center">

<!--        <b-button type="is-info" rounded-->
<!--                  icon-right="plus-thick">-->
<!--          سرویس جدید-->
<!--        </b-button>-->
<!--        <b-button type="is-danger" rounded-->
<!--                  icon-right="arrow-up-bold">-->
<!--          ارتقاء سرویس-->
<!--        </b-button>-->
<!--        <b-button type="is-success" rounded-->
<!--                  icon-right="battery-charging-90">-->
<!--          شارژ اضافه-->
<!--        </b-button>-->
<!--        <b-button type="is-warning" rounded-->
<!--                  icon-right="history">-->
<!--          تمدید سرویس-->
<!--        </b-button>-->
      </div>

    <div class="pricing-table">
      <div class="pricing-plan">
        <div class="plan-header">پلان 50 نفر آنلاین</div>
        <div class="plan-price"><span class="plan-price-amount"><span class="plan-price-currency">هزارتومان</span>20</span>/ماهانه</div>
        <div class="plan-items">
          <div class="plan-item">زمان برگزاری نامحدود</div>
          <div class="plan-item">تا 3 ویدئو همزمان</div>
          <div class="plan-item">قابلیت حضور و غیاب</div>
          <div class="plan-item">نامحدود کلاس ایجاد کنید</div>
        </div>
        <div class="plan-footer">
          <button class="button is-fullwidth">خرید سرویس</button>
        </div>
      </div>

      <div class="pricing-plan is-warning">
        <div class="plan-header">پلان 100 نفر آنلاین</div>
        <div class="plan-price"><span class="plan-price-amount"><span class="plan-price-currency">هزارتومان</span>40</span>/ماهانه</div>
        <div class="plan-items">
          <div class="plan-item">زمان برگزاری نامحدود</div>
          <div class="plan-item">تا 3 ویدئو همزمان</div>
          <div class="plan-item">قابلیت حضور و غیاب</div>
          <div class="plan-item">نامحدود کلاس ایجاد کنید</div>
        </div>
        <div class="plan-footer">
          <button class="button is-fullwidth">خرید سرویس</button>
        </div>
      </div>

      <div class="pricing-plan is-active">
        <div class="plan-header">پلان 200 نفر آنلاین</div>
        <div class="plan-price"><span class="plan-price-amount"><span class="plan-price-currency">هزارتومان</span>60</span>/ماهانه</div>
        <div class="plan-items">
          <div class="plan-item">زمان برگزاری نامحدود</div>
          <div class="plan-item">تا 3 ویدئو همزمان</div>
          <div class="plan-item">قابلیت حضور و غیاب</div>
          <div class="plan-item">نامحدود کلاس ایجاد کنید</div>
        </div>
        <div class="plan-footer">
          <button class="button is-fullwidth">خرید سرویس</button>
        </div>
      </div>

      <div class="pricing-plan is-danger">
        <div class="plan-header">پلان 300 نفر آنلاین</div>
        <div class="plan-price"><span class="plan-price-amount"><span class="plan-price-currency">هزارتومان</span>100</span>/ماهانه</div>
        <div class="plan-items">
          <div class="plan-item">زمان برگزاری نامحدود</div>
          <div class="plan-item">تا 3 ویدئو همزمان</div>
          <div class="plan-item">قابلیت حضور و غیاب</div>
          <div class="plan-item">نامحدود کلاس ایجاد کنید</div>
        </div>
        <div class="plan-footer">
          <button class="button is-fullwidth">خرید سرویس</button>
        </div>
      </div>
    </div>
<!--    <b-table-->
<!--        :data="data"-->
<!--        ref="table"-->
<!--        paginated-->
<!--        per-page="5"-->
<!--        :opened-detailed="defaultOpenedDetails"-->
<!--        detailed-->
<!--        detail-key="id"-->
<!--        :show-detail-icon="showDetailIcon"-->
<!--        aria-next-label="Next page"-->
<!--        aria-previous-label="Previous page"-->
<!--        aria-page-label="Page"-->
<!--        aria-current-label="Current page">-->

<!--      <b-table-column field="id" label="ردیف" width="40" sortable numeric v-slot="props">-->
<!--        {{ props.row.id }}-->
<!--      </b-table-column>-->

<!--      <b-table-column field="user.first_name" label="عنوان سرویس" sortable v-slot="props">-->
<!--        <template v-if="showDetailIcon">-->
<!--          {{ props.row.user.service_name }}-->
<!--        </template>-->
<!--        <template v-else>-->
<!--          <a @click="props.toggleDetails(props.row)">-->
<!--            {{ props.row.user.first_name }}-->
<!--          </a>-->
<!--        </template>-->
<!--      </b-table-column>-->

<!--      <b-table-column field="user.last_name" label="انقضاء سرویس" sortable v-slot="props">-->
<!--        <span class="tag is-success"> {{ props.row.end_date }}</span>-->
<!--      </b-table-column>-->

<!--      <b-table-column field="date" label="وضعیت" sortable centered v-slot="props">-->
<!--                <span class="tag is-info">-->
<!--                    {{ props.row.user.situation }}-->
<!--                </span>-->
<!--      </b-table-column>-->

<!--      <b-table-column v-slot="props">-->
<!--                <span>-->
<!--                    <b-icon pack="fas"-->
<!--                            :icon="props.row.user.situation === 'فعال' ? 'check' : 'times'">-->
<!--                    </b-icon>-->
<!--                    {{ props.row.gender }}-->
<!--                </span>-->
<!--      </b-table-column>-->

<!--      <template #detail="props">-->
<!--        <article class="media is-centered">-->

<!--          <div class="media-content is-centered">-->
<!--            <div class="content is-centered">-->

<!--&lt;!&ndash;                <strong>{{ props.row.user.first_name }} {{ props.row.user.last_name }}</strong>&ndash;&gt;-->
<!--&lt;!&ndash;                <small>@{{ props.row.user.first_name }}</small>&ndash;&gt;-->
<!--&lt;!&ndash;                <small>31m</small>&ndash;&gt;-->
<!--                <br>-->
<!--              <table class="table is-centered">-->
<!--                <tbody>-->
<!--                <tr>-->
<!--                  <td>وضعیت سرویس:-->
<!--                  </td>-->
<!--                  <th><span class="tag is-success">{{ props.row.user.situation }}</span></th>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                  <td>تعداد کاربر آنلاین:-->
<!--                  </td>-->
<!--                  <th>{{ props.row.user.user_count }}</th>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                  <td>محدودیت تعداد ویدیوی همزمان:-->
<!--                  </td>-->
<!--                  <th>1</th>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                  <td>تاریخ شروع:-->
<!--                  </td>-->
<!--                  <th>{{ props.row.start_date }}</th>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                  <td>تاریخ پایان:-->
<!--                  </td>-->
<!--                  <th>{{ props.row.end_date }}</th>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                  <td>زمان (نفر/ساعت):-->
<!--                  </td>-->
<!--                  <th>1</th>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                  <td>محدودیت زمانی:-->
<!--                  </td>-->
<!--                  <th>1</th>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                  <td>زمان مصرف شده:-->
<!--                  </td>-->
<!--                  <th>1</th>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                  <td>زمان باقی مانده:-->
<!--                  </td>-->
<!--                  <th>1</th>-->
<!--                </tr>-->
<!--                </tbody>-->
<!--              </table>-->

<!--            </div>-->
<!--          </div>-->
<!--        </article>-->
<!--      </template>-->
<!--    </b-table>-->

  </section>
</template>

<script>
const data = require('../../../../sample.json')

export default {
  data() {
    return {
      data,
      defaultOpenedDetails: [1],
      showDetailIcon: true
    }
  }
}
</script>