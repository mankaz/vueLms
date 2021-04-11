<template>
  <section>
    <b-field>
      <b-field class="file is-info"  :class="{'has-name': !!file2}">
        <b-upload v-model="file2" class="file-label" rounded>
                <span class="file-cta">
                    <b-icon class="file-icon" icon="upload"></b-icon>
                  <slot></slot>
                </span>
          <span class="file-name" v-if="file2">
                    {{ file2.name }}
                </span>
        </b-upload>
      </b-field>
    </b-field>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        file2 : null
      }
    },
  }
</script>
