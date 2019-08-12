<template>
  <div>
    <template v-if="video == null">
      <Spinner />
    </template>
    <div class="container-fluid" v-else>
    <h2 class="text-center">Delete {{video.title}}</h2>
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
    <form @submit.prevent="handleSubmit">
      <div class="controls">
        <input type="submit" class="btn btn-large btn-danger" value="Delete">
      </div>
    </form>
  </div>
  </div>
</template>

<script>
import Spinner from "./../../components/common/Spinner";
import { getDetails, deleteVideo } from "./../../mixins/services/videoService";

export default {
  name: "video-delete",
  mixins: [getDetails, deleteVideo],
  components: {
    Spinner
  },
  data() {
    return {
      video: null
    }
  },
  methods: {
    handleSubmit() {
      const id = this.$route.params.id;
      this.deleteVideoById(id)
        .then(() => {
          this.showNotification("success", "Video Deleted successfully!");
          this.$router.push("/home");
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  created() {
    const id = this.$route.params.id;
    this.loadVideoDetailsById(id)
      .then(res => {
        this.video = res.data.video;
      });
  }
}
</script>

<style scoped>
  h2{
    color: red;
  }
</style>