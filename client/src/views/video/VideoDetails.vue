<template>
  <VideoData :video-id="videoId" />
</template>

<script>
import VideoData from "./../../components/video/VideoData";

export default {
  name: 'video-details',
  data() {
    return {
      videoId: this.$route.params.id
    }
  },
  components: {
    VideoData
  }
};
</script>

<style>
</style>
