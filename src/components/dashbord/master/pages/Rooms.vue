<template>

  <div class="is-variable is-0">

    <div class="column  is-10-desktop is-9-tablet  is-12-mobile">

      <div class="p-1">

        <div class="columns is-variable">

          <div class="column is-12-desktop is-12-tablet is-10-mobile">
            <div class="columns">
              <div class="column">
                <div class="box">
                  <span class="tag is-success">اتاق ها</span>
              <CreateRoom></CreateRoom>
                </div>
              </div>
              <div class="column">
                <div class="box">
                  <RoomDetail></RoomDetail>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>


</template>

<script>
import RoomDetail from "../rooms/RoomDetail";
import CreateRoom from "../rooms/CreateRoom";
export default {
  data(){
    return{

    }

  },
  components : {RoomDetail,CreateRoom},

}
</script>