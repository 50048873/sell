<template>
  <div>
  	我是ratings
  	<div>
        <input type="file" accept="image/*" capture="camera">
        <input type="file" accept="video/*" capture="camcorder">
        <input type="file" accept="audio/*" capture="microphone">
    </div>
  </div>
</template>

<script>
export default {
  name: 'ratings',
  data () {
    return {
      msg: 'ratings'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
