<template>
  <div class="is-variable is-0">
    <div class="column  is-10-desktop is-9-tablet  is-12-mobile">
        <div class="columns is-variable">
          <div class="column is-12-desktop is-12-tablet is-10-mobile">
            <div class="box">
              <Ticket></Ticket>
            </div>
          </div>
        </div>
    </div>

  </div>


</template>

<script>
import Ticket from "../ticketing/Ticket";
export default {
  data(){
    return{

    }

  },
  components : {Ticket},

}
</script>