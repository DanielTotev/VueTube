<template>
  <div>
    <VideoData :video-id="videoId" />
    <form @submit.prevent="handleSubmit">
      <div class="controls">
        <input type="submit" class="btn btn-large btn-danger" value="Delete">
      </div>
    </form>
  </div>
</template>

<script>
import VideoData from "./../../components/video/VideoData";
import { deleteVideo } from "./../../mixins/services/videoService";

export default {
  name: "video-delete",
  mixins: [deleteVideo],
  components: {
    VideoData
  },
  data() {
    return {
      videoId: this.$route.params.id,
    }
  },
  methods: {
    handleSubmit() {
      this.deleteVideoById(this.videoId)
        .then(() => {
          this.showNotification("success", "Video Deleted successfully!");
          this.$router.push("/home");
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
}
</script>

<style scoped>
  h2{
    color: red;
  }
</style>