<template>
  <a v-bind:href="loginUrl" v-if="!myProfile" class="login-btn">
    微博登录
  </a>
  <div class="info-container" v-else-if="!!myProfile">
    <div class="avatar"
         v-bind:style="{backgroundImage:`url(${myProfile.avatarUrl})`}"></div>
    <div class="info">
      <p class="name">{{myProfile.name}}</p>
      <p class="desc">{{myProfile.description}}</p>
    </div>
  </div>

</template>

<script>
  import config from 'config';
  import {ProfileService} from 'service/profile';

  export default {
    name: config.appEnv,
    data () {
      return {
        myProfile: null,
        loginUrl: config.apiBase + 'weibo/auth'
      };
    },
    created: function () {
      this.$root.$on('profileUpdate', this.loadProfile);
    },
    methods: {
      loadProfile: async function () {
        this.data = await ProfileService.getMyProfile();
      }
    },
    beforeDestroy: function () {
      this.$root.$off('profileUpdate', this.loadProfile);
    }
  };
</script>

<style scoped>
  .login-btn {
    color: white;
    font-size: 20px;
    display: inline-block;
    border-bottom: 1px solid white;
    padding-bottom: 2px;
    text-decoration: none;
  }

  .info-container {
    display: flex;
    align-items: center;
  }

  .avatar {
    width: 60px;
    height: 60px;
    background-position: center;
    background-size: cover;
    border-radius: 30px;
    border: 3px solid white;
  }

  .info {
    color: white;
    margin-left: 8px;
  }

  .name {
    font-size: 18px;
    margin-bottom: 8px;
  }

  .desc {
    font-size: 14px;
  }
</style>
