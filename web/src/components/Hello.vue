<template>
  <div class="content-container">
    <UploadArea/>
  </div>
</template>

<script>
  import config from 'config';
  import UploadArea from 'component/UploadArea';

  export default {
    name: config.appEnv,
    data () {
      return {
        msg: `Current Env: ${config.appEnv}`
      };
    },
    components: {UploadArea}
  };
</script>

<style scoped>
  .content-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
    overflow-y: auto;
    flex-shrink: 0;
    position: relative;
  }
</style>
