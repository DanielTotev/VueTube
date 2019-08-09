<template>
  <div class="container-fluid" v-if="video">
    <h2 class="text-center">{{video.title}}</h2>
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
import { getDetails } from "@/mixins/services/videoService"

export default {
  name: 'video-details',
  data() {
    return {
      video: null
    }
  },
  mixins: [getDetails],
  created() {
    const id = this.$route.params.id;
    this.loadVideoDetailsById(id)
      .then(res => {
        this.video = res.data.video;
      })
  }
};
</script>

<style>
</style>
