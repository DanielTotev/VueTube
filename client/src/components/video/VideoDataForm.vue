<template>
  <div>
    <hr class="my-2" />
    <div class="text-center mb-3">
      <h1>{{pageTitle}}</h1>
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
  </div>
</template>

<script>
import { buildVideoFormData } from "./../../services/videoService";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "video-data-form",
  data() {
    return {
      title: "",
      author: "",
      video: null,
      thumbnail: null,
      description: ""
    }
  },
  props: {
    pageTitle: {
      type: String,
      required: true
    },
    videoData: {
      type: Object
    },
  },
  validations: {
    title: { minLength: minLength(3), required },
    author: { minLength: minLength(3), required },
    description: { minLength: minLength(3), required }
  },
  mixins: [buildVideoFormData],
  created() {
    if(this.videoData) {
      this.title = this.videoData.title;
      this.author = this.videoData.author;
      this.description = this.videoData.description;
    }
  },
  methods: {
    handleFormSubmit() {
      const formData = this.buildFormData();
      this.$emit('form-submited', formData);
    },
    handleFileInputChange(event) {
      const name = event.target.name;
      this[name] = event.target.files[0];
    },
  }
};
</script>