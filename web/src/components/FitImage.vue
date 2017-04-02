<template>
  <a target="_blank"
     class="image-item-wrapper"
     v-bind:href="urlPrefix + image.remoteKey"
     v-bind:style="{width:`${width/height *(minLineHeight ||100)}px`,flexGrow:width/height*(minLineHeight ||100)}"
  >
    <img
      class="image-item"
      v-bind:src="imageSource"
      v-bind:alt="image.name">
    <i v-bind:style="{paddingBottom:`${height/width*100}%`}" class="item-spacer"></i>
  </a>
</template>
<script>

  export default {
    props: ['image', 'urlPrefix', 'webp', 'minLineHeight'],
    data(){
      return {
        height: 0,
        width: 0
      };
    },
    computed: {
      imageSource: function () {
        return this.urlPrefix + this.image.remoteKey + '!/fh/400' + (this.webp ? '/format/webp' : '');
      }
    },
    created: async function () {
      const imgSize = await this.getImageSize();
      this.height = imgSize.height;
      this.width = imgSize.width;
    },
    methods: {
      getImageSize: function () {
        return new Promise((res) => {
          let img = new Image();
          img.src = this.imageSource;
          img.addEventListener('load', function () {
            res({
              height: this.height,
              width: this.width
            });
          });
        });


      }
    }
  };
</script>

<style scoped>
  .image-item-wrapper {
    display: block;
    position: relative;
    margin: 4px;
    transition: transform .5s, box-shadow .5s;
  }

  .image-item-wrapper:hover {
    z-index: 9;
    transform: scale(1.05);
    box-shadow: rgba(0, 0, 0, 0.67) 1px 0 10px;
  }

  .image-item {
    position: absolute;
    top: 0;
    width: 100%;
    vertical-align: bottom;
  }

  .item-spacer {
    display: block;
  }
</style>
