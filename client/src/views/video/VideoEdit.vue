<template>
  <div>
    <Spinner v-if="isFormSubmitted || !video" />
    <template v-else>
      <VideoDataForm page-title="Edit video" :video-data="video" v-on:form-submited="handleSubmit" />
    </template>
  </div>
</template>

<script>
import Spinner from "./../../components/common/Spinner";
import VideoDataForm from "./../../components/video/VideoDataForm";
import { required, minLength } from "vuelidate/lib/validators";
import { getDetails, uploadVideo, updateVideo } from "./../../mixins/services/videoService";

export default {
  name: 'video-edit',
  data() {
    return {
      video: null,
      isFormSubmitted: false
    }
  },
  components: {
    Spinner,
    VideoDataForm
  },
  mixins: [getDetails, updateVideo],
  created() {
    const id = this.$route.params.id;
    this.loadVideoDetailsById(id)
      .then(res => {
        this.video = res.data.video;
      })
  },
  methods: {
    handleSubmit(formData) {
      const id = this.$route.params.id;
      this.isFormSubmitted = true;
      this.updateVideoById(id, formData)
        .then(res => {
          this.showNotification("success", "Video updated successfully!");
          this.$router.push("/home");
        }).catch(err => {
          this.showNotification("error", err.response.data.message);
        });
    }
  },
}
</script>