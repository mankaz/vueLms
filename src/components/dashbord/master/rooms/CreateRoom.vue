<template>
  <section>
    <div class="block is-flex is-justify-content-center">
      <div class="column">
        <b-field label="عنوان اتاق" :label-position="labelPosition">
          <b-input size="is-medium" v-model="message"></b-input>
        </b-field>

        <b-field>

          <p class="control">
            <span id="testing-code2" class="button is-static urlCopy">http://conf.ir/{{message}}</span>
          </p>
          <p class="control">
            <b-button icon-right="link"  class="button is-success" @click="copyUrl"></b-button>
          </p>
        </b-field>

        <div class="column is-flex is-justify-content-center"> <button class="button is-success is-rounded ">ایجاد اتاق</button></div>


      </div>


    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: 'on-border',
      message : ''
    }
  },
  methods: {
    copyUrl () {

      let copyText = document.getElementById("testing-code2");
      let textArea = document.createElement("textarea");
      textArea.value = copyText.textContent;
      document.body.appendChild(textArea);
      textArea.select();
      let successful = document.execCommand("Copy");
      textArea.remove();

        let msg = successful ? 'ذخیره شد' : 'ذخیره نشد';
        this.$buefy.toast.open({
          message: 'لینک ' + msg,
          type: 'is-success'
        })



      // let textCopy = document.querySelector('#testing-code')
      // textCopy.setAttribute('type', 'text')
      // textCopy.select()
      //
      // try {
      //   let successful = document.execCommand('copy');
      //   let msg = successful ? 'ذخیره شد' : 'ذخیره نشد';
      //   this.$buefy.toast.open({
      //     message: 'لینک ' + msg,
      //     type: 'is-success'
      //   })
      // } catch (err) {
      //   alert('unable to copy');
      // }
    },
  },
}
</script>