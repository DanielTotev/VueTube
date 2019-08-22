<template>
  <div class="container-fluid" v-if="video">
    <h2 class="text-center" :class="{'danger-heading': isInDeletePage}">{{pageTitle}}</h2>
    <div class="row">
      <div class="col-md-6 my-5">
        <div class="embed-responsive embed-responsive-16by9">
          <iframe class="embed-responsive-item" :src="video.link" allowfullscreen frameborder="0"></iframe>
        </div>
      </div>
      <div class="col-md-6 my-5">
        <h1 class="text-center text-info">{{video.author}}</h1>
        <h3 class="text-center text-info">{{video.views}} Views</h3>
        <div class="h5 my-5 text-center">{{video.description}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDetails } from "./../../services/videoService";

export default {
  name: "video-data",
  data() {
    return {
      video: null
    }
  },
  props: {
    videoId: {
      type: String,
      required: true
    }
  },
  mixins: [getDetails],
  created() {
    this.loadVideoDetailsById(this.videoId)
      .then(res => {
        this.video = res.data.video;
      })
  },
  computed: {
    isInDeletePage() {
      return this.$route.path.includes('delete')
    },
    pageTitle() {
      if(this.isInDeletePage) {
        return `Delete ${this.video.title}`;
      }

      return this.video.title;
    }
  }
};
</script>

<style scoped>
  .danger-heading{
    color: red;
  }
</style>