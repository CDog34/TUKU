<template>
  <div class="content-container">
    <UploadArea/>
  </div>
</template>

<script>
  import config from 'config';
  import UploadArea from 'component/UploadArea';
  import {WeiboService} from 'service/weibo';
  import {SessionService} from 'service/session';

  export default {
    name: config.appEnv,
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
        const res = await WeiboService.loginFromWeibo(code);
        SessionService.startSession(res);
      }
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
