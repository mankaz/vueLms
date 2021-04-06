<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column container is-two-thirds is-max-desktop">
            <div  class="box login-box-padding">
              <div class="columns login-height">
                <div class="column login-border-rad auth-img is-flex  is-justify-content-center">
                  <p class="is-family-iranSans has-text-white is-flex is-align-items-center">به سامانه آموزش مجازی خوش آمدید</p>
                </div>
                <div class="column is-flex is-justify-content-center">
                  <div class="column">
                    <div class="column is-flex is-justify-content-flex-end">
                      <img class="image is-48x48" src="../../../../assets/img/logo.png">
                    </div>
                    <div class="field  is-family-iranSans is-flex is-justify-content-flex-end">
                      <label  class="label is-size-5">ورود به بی نام</label>
                    </div>
                    <div class="field is-family-iranSans is-flex is-justify-content-flex-end">
                      <label  class="label is-size-7">برای استفاده از خدمات بی نام، وارد حساب کاربری خود شوید</label>
                    </div>
                    <div class="field login-mobileNumber">
                      <div class="control has-icons-left">
                        <b-field  label="شماره همراه" :label-position="labelPosition">
                          <input @keyup="onKeyup" class="input" id="mobile" maxlength="11" icon-right="cellphone" size="is-normal">
                        </b-field>
                      </div>
                    </div>
                    <div class="field">
                      <div  class="column is-flex is-justify-content-center">
                        <b-button class="is-rounded is-success" @click="submitForm" >تأیید و ادامه</b-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data(){
    return {
      labelPosition: 'on-border',
      mobileNumber:null
    }

  },
  methods:{
    onKeyup(event) {
      event.target.value = event.target.value.replace(/[^0-9]/g, '')
    },
    submitForm () {
      let mobile = document.getElementById('mobile')
      if (mobile.value === '' || !(/^(\+98|0)?9\d{9}/g.test(mobile.value)) ) {
        this.$buefy.toast.open({
          message: 'شماره موبایل را وارد نمایید',
          type: 'is-warning',
          position: 'is-bottom',
        })
      } else {
        this.$router.push('/loginRequest')
      }
    },
  },
  created() {
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL);
    });
  },
  name: "login"
};
</script>