<template>
  <div>
    <Spinner v-if="isFormSubmitted" />
    <template v-else>
      <hr class="my-2" />
      <div class="text-center mb-3">
        <h1>Upload</h1>
      </div>
      <hr class="my-2" />
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="form-holder text-center">
            <form
              class="form-inline"
              enctype="multipart/form-data"
              @submit.prevent="handleFormSubmit"
            >
              <fieldset>
                <div class="control-group">
                  <label class="control-label h3 mb-2" for="title">Title</label>
                  <div class="controls">
                    <input
                      v-model="$v.title.$model"
                      type="text"
                      id="title"
                      name="title"
                      placeholder
                      class="input-xlarge"
                    />
                    <div
                      class="alert alert-danger"
                      v-if="$v.title.$error"
                    >Title should be at least 3 symbols long!</div>
                  </div>
                </div>
                <br />
                <div class="control-group">
                  <label class="control-label h3 mb-2" for="author">Author</label>
                  <div class="controls">
                    <input
                      v-model="$v.author.$model"
                      type="text"
                      id="author"
                      name="author"
                      placeholder
                      class="input-xlarge"
                    />
                    <div
                      class="alert alert-danger"
                      v-if="$v.author.$error"
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
                      v-model="$v.description.$model"
                    ></textarea>
                    <div
                      class="alert alert-danger"
                      v-if="$v.description.$error"
                    >Description should be at least 3 symbols long!</div>
                  </div>
                </div>
                <br />
                <div class="control-group">
                  <div class="controls">
                    <button class="btn btn-info" :disabled="$v.$invalid">Upload</button>
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
import { uploadVideo } from "./../../mixins/services/videoService";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "upload-video",
  data() {
    return {
      title: "",
      author: "",
      video: null,
      thumbnail: null,
      description: "",
      isFormSubmitted: false
    };
  },
  components: {
    Spinner
  },
  mixins: [uploadVideo],
  methods: {
    handleFileInputChange(event) {
      const name = event.target.name;
      this[name] = event.target.files[0];
    },
    handleFormSubmit() {
      this.isFormSubmitted = true;
      this.postVideo()
        .then(res => {
          console.log(res);
          this.showNotification("success", "Video created successfully!");
          this.$router.push("login");
        })
        .catch(err => {
          this.showNotification("error", err.response.data.message);
        });
    }
  },
  validations: {
    title: { minLength: minLength(3), required },
    author: { minLength: minLength(3), required },
    description: { minLength: minLength(3), required }
  }
};
</script>
