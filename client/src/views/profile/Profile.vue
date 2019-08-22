<template>
  <div>
    <div class="text-center mt-3">
      <h4 class="text-info text-center">{{email}}</h4>
    </div>
    <hr />
    <div class="container-fluid">
      <div class="row d-flex flex-column">
        <table class="table table-hover table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(video, index) in videos" :key="video._id">
              <td>{{index + 1}}</td>
              <td>{{video.title}}</td>
              <td>{{video.author}}</td>
              <td>
                <router-link :to="`/video/edit/${video._id}`" class="btn btn-info">Edit</router-link>
                <router-link :to="`/video/details/${video._id}`" class="btn btn-success">Details</router-link>
                <router-link :to="`/video/delete/${video._id}`" class="btn btn-danger">Delete</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { profileService } from "./../../services/profileService";

export default {
  name: "profile",
  data() {
    return {
      email: "",
      videos: ""
    };
  },
  mixins: [profileService],
  created() {
    this.getProfileData().then(res => {
      const { email, videos } = res.data;
      this.email = email;
      this.videos = videos;
    });
  }
};
</script>

<style>
</style>
