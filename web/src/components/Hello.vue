<template>
  <div class="scroll-wrapper">
    <div class="content-container">
      <UploadArea/>
      <UploadHistory/>
    </div>
  </div>
</template>

<script>
  import config from 'config';
  import UploadArea from 'component/UploadArea';
  import UploadHistory from 'component/UploadHistory';
  import {SessionService} from 'service/session';

  export default {
    name: 'index',
    created: function () {
      this.checkWeiboCode();
    },
    data () {
      return {
        msg: `Current Env: ${config.appEnv}`
      };
    },
    methods: {
      checkWeiboCode: async function () {
        const code = this.$route.query.code;
        if (!code) return null;
        this.$router.replace(this.$route.path);
        await SessionService.createForWeibo(code);
      }
    },
    components: {UploadArea, UploadHistory}
  };
</script>

<style scoped>
  .scroll-wrapper {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
  }

  .content-container {
    position: relative;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 48px 20px;
    box-sizing: border-box;
  }
</style>
