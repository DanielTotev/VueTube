<template>
  <div>
    <Spinner v-if="isFormSubmitted || !video" />
    <template v-else>
      <hr class="my-2" />
      <div class="text-center mb-3">
        <h1>Edit</h1>
      </div>
      <hr class="my-2" />
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="form-holder text-center">
            <form
              class="form-inline"
              enctype="multipart/form-data"
              @submit.prevent="handleSubmit"
            >
              <fieldset>
                <div class="control-group">
                  <label class="control-label h3 mb-2" for="title">Title</label>
                  <div class="controls">
                    <input
                      v-model="$v.video.title.$model"
                      type="text"
                      id="title"
                      name="title"
                      placeholder
                      class="input-xlarge"
                    />
                    <div
                      class="alert alert-danger"
                      v-if="$v.video.title.$error"
                    >Title should be at least 3 symbols long!</div>
                  </div>
                </div>
                <br />
                <div class="control-group">
                  <label class="control-label h3 mb-2" for="author">Author</label>
                  <div class="controls">
                    <input
                      v-model="$v.video.author.$model"
                      type="text"
                      id="author"
                      name="author"
                      placeholder
                      class="input-xlarge"
                    />
                    <div
                      class="alert alert-danger"
                      v-if="$v.video.author.$error"
                    >Author name should be at least 3 symbols long!</div>
                  </div>
                </div>
                <br />
                <div class="control-group">
                  <label class="control-label h3 mb-2" for="video">Video</label>
                  <div class="controls">
                    <input
                      type="file"
                      id="video"
                      name="video"
                      placeholder
                      class="input-xlarge"
                      @change="handleFileInputChange"
                    />
                  </div>
                </div>
                <br />
                <div class="control-group">
                  <label class="control-label h3 mb-2" for="thumbnail">Thumbnail</label>
                  <div class="controls">
                    <input
                      type="file"
                      id="thumbnail"
                      name="thumbnail"
                      placeholder
                      class="input-xlarge"
                      @change="handleFileInputChange"
                    />
                  </div>
                </div>
                <br />
                <div class="control-group">
                  <label class="control-label h3 mb-2" for="description">Description</label>
                  <div class="controls">
                    <textarea
                      id="description"
                      name="description"
                      placeholder
                      class="input-xlarge"
                      style="resize: none;"
                      cols="75"
                      rows="4"
                      v-model="$v.video.description.$model"
                    ></textarea>
                    <div
                      class="alert alert-danger"
                      v-if="$v.video.description.$error"
                    >Description should be at least 3 symbols long!</div>
                  </div>
                </div>
                <br />
                <div class="control-group">
                  <div class="controls">
                    <button class="btn btn-info" :disabled="$v.$invalid">Edit</button>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Spinner from "./../../components/common/Spinner";
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
    Spinner
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
    handleFileInputChange(event) {
      const name = event.target.name;
      this.video[name] = event.target.files[0];
    },
    handleSubmit() {
      const id = this.$route.params.id;
      this.isFormSubmitted = true;
      this.updateVideoById(id)
        .then(res => {
          this.showNotification("success", "Video updated successfully!");
          this.$router.push("/home");
        }).catch(err => {
          this.showNotification("error", err.response.data.message);
        });
    }
  },
  validations: {
    video: {
      title: {
        required,
        minLength: minLength(3)
      },
      author: {
        required,
        minLength: minLength(3)
      },
      description: {
        required,
        minLength: minLength(3)
      }
    }
  }
}
</script>