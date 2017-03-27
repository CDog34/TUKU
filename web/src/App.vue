<template>
  <div id="app">
    <nav>
      <h1>TUKU Image Hosting Service</h1>
    </nav>
    <router-view/>
  </div>
</template>

<script>
  import {SessionService} from 'service/session';
  export default {
    name: 'app',
    created: function () {
      SessionService.initSession();
    }
  };
</script>

<style scoped>
  #app {
    font-family: PingFang SC, RobotoDraft, Roboto, Helvetica Neue, Helvetica, Arial, STHeiti, 华文黑体, Microsoft YaHei, 微软雅黑, sans-serif;;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  nav {
    height: 80px;
    width: 100vw;
    background-color: #42b983;
    padding: 0 16px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
  }

  h1 {
    font-size: 32px;
    color: white;
  }
</style>
