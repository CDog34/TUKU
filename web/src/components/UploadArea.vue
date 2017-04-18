<template>
  <div class="upload-area"
       v-on:click="clickBox"
       v-on:dragenter.stop.prevent=""
       v-on:dragover.stop.prevent=""
       v-on:drop.stop.prevent="handleFileDrop"
  >
    <transition-group name="image-upload-transition" tag="div" class="image-container">
      <fit-image
        v-for='uploadedImage in uploadedImages'
        :key="uploadedImage.image._id"
        v-bind:image="uploadedImage.image"></fit-image>
    </transition-group>
    <transition name="slide-fade">
      <div class="upload-preview-container" v-if="uploadQueue.length > 0">
        <h2 class="upload-hint">队列中的上传 剩余：{{uploadQueue.length}}</h2>
        <div class="upload-image-wrapper">
          <transition-group name="image-upload-transition" tag="div">
            <div class="image-item-wrapper" v-for='imageItem in uploadQueue' :key="imageItem.image.name">
              <img v-bind:src="imageItem.data" alt="" class="preview-image">
              <i class="upload-mask" v-bind:style="{transform: 'scaleY('+(1-imageItem.progress)+')'}"></i>
            </div>
          </transition-group>
        </div>
      </div>
    </transition>
    <p class="hint">{{msg}}</p>
  </div>
</template>

<script>
  import config from 'config';
  import {UploadService} from 'service/upload';
  import _ from 'lodash';
  import  FitImage from 'component/FitImage';

  export default {
    name: config.appEnv,
    data () {
      return {
        msg: `图片上传区域`,
        uploadQueue: [],
        uploading: false,
        uploadedImages: [],
        imageViewBase: config.apiBase + 'image/'
      };
    },
    created: async function () {
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
        const res = await UploadService.uploadSingleFile(currentUpload.image, (e) => currentUpload.progress = e.loaded / e.total); // eslint-disable-line
        this.uploadedImages.push(res);
        this.uploadQueue.shift();
        this.uploading = false;
        this.processQueue();
      },
      handleFileList: async function (files) {
        if (files.length > 20) {
          alert('一下子吃不下这么多图片啦，一次只能吃下20张');
        }
        _.forEach(files, async (image, i) => {
          if (i >= 20) return null;
          if (!this.isImage(image)) return alert(`文件${image.name}不是图片`);
          if (!this.isSizeOK(image)) return alert(`文件${image.name}太大`);
          if (this.isInQueue(image)) return null;
          const data = await this.loadLocalImage(image);
          this.enqueueUpload({data, image, progress: 0});
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
    },
    components: {
      'fit-image': FitImage
    }
  };
</script>

<style scoped>
  .upload-area {
    height: 55vh;
    min-height: 400px;
    position: relative;
    border-radius: 8px;
    border: dashed 8px rgba(0, 0, 0, .32);
    color: rgba(0, 0, 0, .24);
    box-sizing: border-box;
    overflow-y: auto;
  }

  .image-container {
    display: flex;
    flex-wrap: wrap;
  }

  .image-container:after {
    content: '';
    flex-grow: 999999999;
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

  .image-item-wrapper {
    position: relative;
    display: inline-block;
    margin: 4px;
  }

  .image-item-wrapper img {
    margin: 0;
  }

  .upload-mask {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .6);
    transform-origin: 0 0;
    transform: scaleY(1);
    transition: transform .1s linear;
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .3s ease;
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(10px);
    opacity: 0;
  }

  .image-upload-transition-enter-active, .image-upload-transition-leave-active {
    transition: all 1s;
  }

  .image-upload-transition-enter {
    opacity: 0;
    transform: translateY(30px);
  }

  .image-upload-transition-leave-to {
    opacity: 0;
    margin-left: -140px;
  }

</style>
