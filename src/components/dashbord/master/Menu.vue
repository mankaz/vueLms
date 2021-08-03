<template>
    <div class="column is-12-desktop">

      <section class="section">
        <div class="columns">
          <div class="column control services-btn is-flex is-justify-content-left">
          </div>
          <div class="is-flex is-justify-content-flex-end">
            <div class="media-content">
              <small class="is-family-iranSans is-size-5">پیشخوان</small>
            </div>
          </div>
        </div>
            <div class="columns is-centered">
              <div class="column">
                <CardComponent class="card-success info-box">
                  <slot><div class="title is-size-7">دوره های شما</div></slot>
                  <slot>
                    <b-icon icon="certificate-outline" class="zmdi zmdi-upload" size="is-medium"></b-icon>
                  </slot>
                  <slot> <div class="value is-size-5">300 </div></slot>
                  <slot><div class="stat"><b>13</b>% increase</div></slot>
                </CardComponent>
              </div>
              <div class="column">
                <CardComponent  class="card-warning info-box">
                  <slot><div class="title is-size-7">کلاس های شما</div></slot>
                  <slot>
                    <b-icon icon="google-classroom" class="zmdi zmdi-upload" size="is-medium"></b-icon>
                  </slot>
                  <slot> <div class="value is-size-5">300 </div></slot>
                  <slot><div class="stat"><b>13</b>% increase</div></slot>
                </CardComponent>
              </div>
              <div class="column">
                <CardComponent class="card-info info-box">
                  <slot><div class="title is-size-7">شرکت کنندگان</div></slot>
                  <slot>
                    <b-icon icon="account-multiple" class="zmdi zmdi-upload" size="is-medium"></b-icon>
                  </slot>
                  <slot> <div class="value is-size-5">300 </div></slot>
                  <slot><div class="stat"><b>13</b>% increase</div></slot>
                </CardComponent>
              </div>
              <div class="column">
                <CardComponent class="card-danger info-box">
                  <slot><div class="title is-size-7">کل دانشجویان</div></slot>
                  <slot>
                    <b-icon icon="school" class="zmdi zmdi-upload" size="is-medium"></b-icon>
                  </slot>
                  <slot> <div class="value is-size-5">300 </div></slot>
                  <slot><div class="stat"><b>13</b>% increase</div></slot>
                </CardComponent>
              </div>
            </div>
        <div class="columns">
          <div class="column">
            <div class="box">
              <VueApexCharts type="bar" height="350" :options="chartOptions" :series="series"></VueApexCharts>
            </div>
          </div>
          <div class="column">
            <div class="box">
              <VueApexCharts type="area" height="350" :options="chartOptions" :series="series"></VueApexCharts>
            </div>
          </div>


        </div>
      </section>
      </div>
</template>

<script>
// import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import CardComponent from "./CardComponent";
import VueApexCharts from 'vue-apexcharts'
export default {
  data() {


    return {
      series: [{
        name: 'series1',
        data: [31, 40, 28, 51, 42, 109, 100]
      }, {
        name: 'series2',
        data: [11, 32, 45, 32, 34, 52, 41]
      }],
      chartOptions: {
        chart: {
          height: 350,
          type: 'area'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
      },

    }
  },
  components: {
    VueApexCharts,CardComponent
  }
}
</script>
