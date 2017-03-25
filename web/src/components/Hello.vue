<template>
  <div class="hello">
    {{msg}}
  </div>
</template>

<script>
  import config from 'config';
  export default {
    name: config.appEnv,
    data () {
      return {
        msg: `Current Env: ${config.appEnv}`
      };
    }
  };
</script>

<style scoped>
  .hello {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
