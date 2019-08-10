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
                <a href="#" class="btn btn-info">Edit</a>
                <a href="#" class="btn btn-success">Details</a>
                <a href="#" class="btn btn-danger">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { profileService } from "./../../mixins/services/profileService";

export default {
  name: "profile",
  data() {
    return {
      email: "",
      videos: ""
    }
  },
  mixins: [profileService],
  created() {
    this.getProfileData()
      .then(res => {
        const  { email, videos } = res.data;
        this.email = email;
        this.videos = videos;
      })
  }
};
</script>

<style>
</style>
