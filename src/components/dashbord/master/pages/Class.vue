<template>

  <div class="is-variable is-0">

    <div class="column  is-10-desktop is-10-tablet  is-12-mobile">

      <div class="p-1">

        <div class="columns is-variable">

          <div class="column is-12-desktop is-6-mobile is-11-tablet is-11-mobile">

<!--              <div courses="column">-->
<!--                <div courses="box">-->
<!--                  <span courses="tag is-success">اتاق ها</span>-->
<!--              <CreateRoom></CreateRoom>-->
<!--                </div>-->
<!--              </div>-->

                <div class="box">
                  <div class="column">
                    <Class></Class>
                  </div>

                </div>


          </div>
        </div>
      </div>
    </div>

  </div>


</template>

<script>
import Class from "../class/Class";
// import CreateRoom from "../courses/CreateRoom";
export default {
  data(){
    return{

    }

  },
  components : {Class},

}
</script>