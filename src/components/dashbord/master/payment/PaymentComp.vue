<template>
  <section>
    <div class="is-flex is-justify-content-flex-end">
      <div class="media-content">
        <small class="is-family-iranSans is-size-5 dir-ltr">افزایش اعتبار</small>
        <br>
      </div>
    </div>
    <div class="block is-flex is-justify-content-center">
      <div class="column  is-6-desktop">
    <b-field label="مبلغ شارژ(تومان)" :label-position="labelPosition">
      <b-input size="is-large"></b-input>
    </b-field>
        <div class="columns">
          <div class="column is-flex is-justify-content-center"><img class="image is-96x96" src="../../../../../public/img/zarinpal.png"></div>
          <div class="column is-flex is-justify-content-center"><img class="image is-96x96" src="../../../../../public/img/aap.png"></div>
        </div>
        <div class="columns">
          <div class="column is-flex is-justify-content-center"><b-radio v-model="radio" name="name" native-value="Flint"></b-radio></div>
          <div class="column is-flex is-justify-content-center"><b-radio v-model="radio" name="name" native-value="aap"></b-radio></div>
        </div>
        <div class="column is-flex is-justify-content-center"> <button class="button is-success is-rounded ">پرداخت</button></div>


      </div>

    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: 'on-border',
      radio: 'aap'
    }
  }
}
</script>
