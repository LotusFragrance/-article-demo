<template>
  <div class="page-container">111</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  created () {
    this.getUserinfo()
  },
  methods: {
    ...mapActions(['getUserinfo'])
  }
}
</script>

<style>
</style>
