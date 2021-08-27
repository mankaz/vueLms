<template>
  <section>
    <div class="file is-info has-name">
      <label class="file-label">
        <input type="file" ref="fileName" class="file-upload" name="attachment[]" id="fileId" @change="onFileChange"  multiple>

        <span class="file-cta">
                          <span class="file-icon">
                            <i class="fas fa-upload"></i>
                          </span>
                          <span class="file-label is-size-7">
                           <slot></slot>
                          </span>
                      </span>
        <span class="file-name" v-if="fileName">
                    {{fileName}}
                         </span>
      </label>
    </div>

  </section>
</template>

<script>
  export default {
    data() {
      return {
        fileName : ''
      }
    },
    methods : {
      onFileChange(event){
        let fileData =  event.target.files[0];
        this.fileName=fileData.name;
      },
    }
  }
</script>
