<template>
  <div class="history-container">
    <h2>历史记录</h2>
    <p class="no-history" v-if="!images || !images.length">{{message}}</p>
    <div class="image-container" v-if="!!images && images.length">
      <a v-for="image in images" v-bind:href="urlPrefix + image.remoteKey" target="_blank">
        <img
          class="image-item"
          v-bind:src="urlPrefix + image.remoteKey+'!/fh/200' + (webp ? '/format/webp' : '')"
          v-bind:alt="image.name">
      </a>

    </div>
  </div>
</template>

<script>
  import {ImageService} from 'service/image';
  import {SessionService} from 'service/session';

  export default {
    name: 'uploadHistory',
    created: function () {
      this.fetchHistory();
      this.$root.$on('profileUpdate', this.fetchHistory);
    },
    data() {
      return {
        images: null,
        urlPrefix: '//tuku.izhai.net/',
        webp: false
      };
    },
    computed: {
      message: function () {
        return !SessionService.isExist() ? '通过微博登录以保存记录' : '没有记录';
      }
    },
    methods: {
      fetchHistory: async function () {
        this.webp = await ImageService.checkWebp();
        this.images = await ImageService.loadHistory();
      }
    },
    beforeDestroy: function () {
      this.$root.$off('profileUpdate', this.fetchHistory);
    }
  };
</script>

<style scoped>
  .history-container {
    margin-top: 48px;
  }

  h2 {
    font-size: 22px;
    color: rgba(0, 0, 0, 0.54);

    margin-bottom: 24px;
  }

  .no-history {
    text-align: center;
    color: rgba(0, 0, 0, 0.32);
    font-size: 18px;
  }

  .image-item {
    height: 100px;
    margin: 4px;
    display: inline-block;
  }
</style>
