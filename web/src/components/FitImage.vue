<template>
  <a target="_blank"
     class="image-item-wrapper"
     v-bind:href="href"
     v-on:click.stop=""
     v-bind:style="{width:`${width/height *(minLineHeight ||100)}px`,flexGrow:width/height*(minLineHeight ||100),backgroundColor:placeHolderColor}"
  >
    <img
      class="image-item"
      v-bind:src="imageSource"
      v-bind:alt="image.name"
      v-bind:style="{opacity:loaded ? '1':'0'}">
    <i v-bind:style="{paddingBottom:`${height/width*100}%`}" class="item-spacer"></i>
  </a>
</template>
<script>
  import config from 'config';
  const CANDIDATE_COLOR = ['#666666', '#6699FF', '#66FFFF', '#66FF66', '#9966FF', '#99FF66', '#CC66FF', '#CC9966', '#FF6666', '#FF6699', '#CC9966', '#FFCC66', '#FFFF66'];

  export default {
    props: ['image', 'minLineHeight'],
    data(){
      return {
        height: 100,
        width: 200 + Math.round(Math.random() * 100 - 50),
        placeHolderColor: CANDIDATE_COLOR[Math.round(Math.random() * CANDIDATE_COLOR.length)],
        loaded: false,
      };
    },
    computed: {
      imageSource: function () {
        return config.apiBase + 'image/' + this.image._id + '?params=/fh/400&forceRedirect=✓';
      },
      href: function () {
        return config.apiBase + 'image/' + this.image._id;
      }
    },
    created: async function () {
      const imgSize = await this.getImageSize();
      this.height = imgSize.height;
      this.width = imgSize.width;
      this.loaded = true;
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
    transition: opacity .5s;
  }

  .item-spacer {
    display: block;
  }
</style>
