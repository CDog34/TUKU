<template>
  <div class="history-container">
    <h2>历史记录</h2>
    <p class="no-history" v-if="!images || !images.length">{{message}}</p>
    <div class="image-container" v-if="!!images && images.length">
      <fit-image
        v-for="image in images"
        :key="image._id"
        v-bind:image="image"></fit-image>

    </div>
  </div>
</template>

<script>
  import {ImageService} from 'service/image';
  import {SessionService} from 'service/session';
  import  FitImage from 'component/FitImage';

  export default {
    name: 'uploadHistory',
    created: async function () {
      this.fetchHistory();
      this.$root.$on('profileUpdate', this.fetchHistory);
    },
    data() {
      return {
        images: null
      };
    },
    computed: {
      message: function () {
        return !SessionService.isExist() ? '通过微博登录以保存记录' : '没有记录';
      }
    },
    methods: {
      fetchHistory: async function () {
        this.images = await ImageService.loadHistory();
      }
    },
    beforeDestroy: function () {
      this.$root.$off('profileUpdate', this.fetchHistory);
    },
    components: {
      'fit-image': FitImage
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

  .image-container {
    display: flex;
    flex-wrap: wrap;
  }

  .image-container:after {
    content: '';
    flex-grow: 999999999;
  }

</style>
