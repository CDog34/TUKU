<template>
  <a target="_blank"
     class="image-item-wrapper"
     v-bind:href="href"
     v-on:click.stop=""
     v-bind:style="{width:`${1/heightWidthRatio *(minLineHeight ||100)}px`,flexGrow:1/heightWidthRatio*(minLineHeight ||100),backgroundColor:placeHolderColor}"
  >
    <img
      class="image-item"
      v-bind:src="imageSource"
      v-bind:alt="image.name"
      v-bind:style="{opacity:loaded ? '1':'0'}">
    <i v-bind:style="{paddingBottom:`${heightWidthRatio*100}%`}" class="item-spacer"></i>
  </a>
</template>
<script>
  import config from 'config';

  export default {
    props: ['image', 'minLineHeight'],
    data(){
      return {
        height: 100,
        width: 200 + Math.round(Math.random() * 100 - 50),
        placeHolderColor: '#dddddd',
        loaded: false,
      };
    },
    computed: {
      imageSource: function () {
        return config.apiBase + 'image/' + this.image._id + '?params=/fh/200&forceRedirect=✓';
      },
      href: function () {
        return config.apiBase + 'image/' + this.image._id;
      },
      heightWidthRatio: function () {
        if (this.loaded) return (this.height / this.width);
        return this.image.heightWidthRatio || (this.height / this.width);
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
    transition: all .5s;
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
