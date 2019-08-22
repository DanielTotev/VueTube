<template>
  <div>
    <Spinner v-if="isFormSubmitted" />
    <VideoDataForm v-else page-title="Upload Video" v-on:form-submited="handleFormSubmit" />
  </div>
</template>

<script>
import Spinner from "./../../components/common/Spinner";
import VideoDataForm from "./../../components/video/VideoDataForm";
import { uploadVideo } from "./../../services/videoService";

export default {
  name: "video-upload",
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
          this.notifyWithRedirect("Video created successfully!", "/home");
        })
        .catch(err => {
          this.showNotification("error", err.response.data.message);
        });
    }
  }
};
</script>
