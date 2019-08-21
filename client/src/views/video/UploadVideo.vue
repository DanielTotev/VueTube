<template>
  <div>
    <Spinner v-if="isFormSubmitted" />
    <VideoDataForm v-else page-title="Upload Video" v-on:form-submited="handleFormSubmit" />
  </div>
</template>

<script>
import Spinner from "./../../components/common/Spinner";
import VideoDataForm from "./../../components/video/VideoDataForm";
import { uploadVideo } from "./../../mixins/services/videoService";

export default {
  name: "upload-video",
  data() {
    return {
      isFormSubmitted: false
    };
  },
  components: {
    Spinner,
    VideoDataForm
  },
  mixins: [uploadVideo],
  methods: {
    handleFormSubmit(formData) {
      this.isFormSubmitted = true;
      this.postVideo(formData)
        .then(res => {
          console.log(res);
          this.showNotification("success", "Video created successfully!");
          this.$router.push("/home");
        })
        .catch(err => {
          this.showNotification("error", err.response.data.message);
        });
    }
  }
};
</script>
