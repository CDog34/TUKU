<template>
  <div class="upload-area"
       v-on:click="clickBox"
       v-on:dragenter.stop.prevent
       v-on:dragover.stop.prevent
       v-on:drop.stop.prevent="handleFileDrop"
  >
    <a v-bind:href='uploadedImage.redirectUrl'
       v-for='uploadedImage in uploadedImages'
       :key="uploadedImage.redirectUrl"
       v-on:click.stop=""
       target="_blank"
    >
      <img v-bind:src="uploadedImage.redirectUrl"
           alt="" class="preview-image">
    </a>

    <div class="upload-preview-container" v-if="uploadQueue.length > 0">
      <h2 class="upload-hint">队列中的上传 剩余：{{uploadQueue.length}}</h2>
      <div class="upload-image-wrapper">
        <img v-for='imageItem in uploadQueue' v-bind:src="imageItem.data" alt="" class="preview-image">
      </div>
    </div>
    <p class="hint">{{msg}}</p>
  </div>
</template>

<script>
  import config from 'config';
  import {testResource} from 'resource/test';
  import {UploadService} from 'service/upload';
  import _ from 'lodash';

  (async() => {
    console.log(await testResource.list());// eslint-disable-line
  })();
  export default {
    name: config.appEnv,
    data () {
      return {
        msg: `图片上床区域`,
        uploadQueue: [],
        uploading: false,
        uploadedImages: []
      };
    },
    created: function () {
      const dummyInput = document.createElement('input');
      dummyInput.setAttribute('type', 'file');
      dummyInput.setAttribute('accept', 'image/*');
      dummyInput.setAttribute('multiple', '');
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
      enqueueUpload: function (item) {
        this.uploadQueue.push(item);
        !this.uploading && this.processQueue();
      },
      processQueue: async function () {
        if (this.uploading || this.uploadQueue.length === 0)return null;
        this.uploading = true;
        const currentUpload = this.uploadQueue[0];
        const res = await UploadService.uploadSingleFile(currentUpload.image, (e) => console.log(e)); // eslint-disable-line
        this.uploadedImages.push(res);
        this.uploadQueue.shift();
        this.uploading = false;
        this.processQueue();
      },
      handleFileList: async function (files) {
        if (files.length > 20) {
          alert('一下子吃不下这么多图片啦，一次只能吃下20张');
        }
        _.forEach(files, async(image, i) => {
          if (i >= 20) return null;
          if (!this.isImage(image)) return alert(`文件${image.name}不是图片`);
          if (!this.isSizeOK(image)) return alert(`文件${image.name}太大`);
          if (this.isInQueue(image)) return null;
          const data = await this.loadLocalImage(image);
          this.enqueueUpload({data, image});
        });
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
      },
      isInQueue(file){
        return !!_.find(this.uploadQueue, item => item.image.name === file.name && item.image.size === file.size);
      },
      isImage(file){
        return file.type.indexOf('image') !== -1;
      },
      isSizeOK(file){
        return file.size <= 5 * 1024 * 1024;
      }
    }
  };
</script>

<style scoped>
  .upload-area {
    min-height: 400px;
    width: 80%;
    height: 80%;
    position: relative;
    border-radius: 8px;
    border: dashed 8px rgba(51, 51, 51, 0.42);
    color: rgba(51, 51, 51, 0.42);
    box-sizing: border-box;
    overflow-y: auto;
  }

  .preview-image {
    height: 100px;
    display: inline-block;
    margin: 4px;
    z-index: 1;
  }

  .upload-preview-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    margin: -4px 0;
    padding: 16px;
    background-image: linear-gradient(to top, white, rgba(255, 255, 255, 0.9));
    overflow: hidden;
    box-sizing: border-box;
  }

  .hint {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }

  .upload-image-wrapper {
    height: 100px;
    overflow: hidden;
    margin: -4px 0;
  }

  .upload-hint {
    margin-bottom: 8px;
  }
</style>