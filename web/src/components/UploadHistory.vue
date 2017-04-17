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
  import  _ from 'lodash';

  export default {
    name: 'uploadHistory',
    created: async function () {
      this.refresh();
      this.$root.$on('profileUpdate', this.refresh);
      this.$root.$on('v-scroll', this.checkLoad);
    },
    data() {
      return {
        images: [],
        state: 'init',
        marker: null,
        totalCount: 0
      };
    },
    computed: {
      message: function () {
        return !SessionService.isExist() ? '通过微博登录以保存记录' : '没有记录';
      }
    },
    methods: {
      loadMore: async function () {
        if (['ready', 'init'].indexOf(this.state) === -1)return null;
        this.state = 'load';
        const res = await ImageService.loadHistory({marker: this.marker || '', pageSize: 15});
        this.totalCount = res.count;
        this.marker = res.marker;
        this.images = _.uniqBy(this.images.concat(res.items), (item) => item._id);
        if (this.images.length >= this.totalCount) this.state = 'end';
        else this.state = 'ready';
      },
      refresh: async function () {
        this.images = [];
        this.state = 'init';
        this.marker = null;
        this.totalCount = 0;
        await this.loadMore();
      },
      checkLoad(scrollBottom){
        if (scrollBottom < 40 && this.state === 'ready') this.loadMore();
      }
    },
    beforeDestroy: function () {
      this.$root.$off('profileUpdate', this.refresh);
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
