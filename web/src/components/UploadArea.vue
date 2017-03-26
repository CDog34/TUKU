<template>
  <div class="upload-area"
       v-on:click="clickBox"
       v-on:dragenter.stop.prevent
       v-on:dragover.stop.prevent
       v-on:drop.stop.prevent="handleFileDrop"
  >
    <img v-for='imageItem in uploadQueue' v-bind:src="imageItem.data" alt="" class="preview-image">
    {{msg}}
  </div>
</template>

<script>
  import config from 'config';
  import {testResource} from 'resource/test';

  (async() => {
    console.log(await testResource.list());// eslint-disable-line
  })();
  export default {
    name: config.appEnv,
    data () {
      return {
        msg: `图片上传区域`,
        uploadQueue: []
      };
    },
    created: function () {
      const dummyInput = document.createElement('input');
      dummyInput.setAttribute('type', 'file');
      dummyInput.setAttribute('accept', 'image/*');
      dummyInput.addEventListener('change', () => this.handleFileList(dummyInput.files));
      this.dummyInput = dummyInput;
    },
    methods: {
      clickBox: function () {
        this.dummyInput.click();
      },
      handleFileDrop: function (e) {
        const dt = e.dataTransfer;
        const {files} = dt;
        this.handleFileList(files);
      },
      handleFileList: async function (files) {
        console.log('[Dbg.jq:e]:', files); //eslint-disable-line
        const image = files[0];
        const data = await this.loadLocalImage(image);
        this.uploadQueue.push({data, image});
      },
      loadLocalImage(image){
        return new Promise((res, rej) => {
          try {
            const reader = new FileReader();
            reader.onload = (e) => res(e.target.result);
            reader.readAsDataURL(image);
          } catch (err) {
            rej(err);
          }
        });

      }
    }
  };
</script>

<style scoped>
  .upload-area {
    width: 80%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border: dashed 8px rgba(51, 51, 51, 0.42);
    color: rgba(51, 51, 51, 0.42);
  }

  .preview-image {
    height: 400px;
    display: inline-block;
  }
</style>
