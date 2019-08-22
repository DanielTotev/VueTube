<template>
  <div class="card" style="width: 18rem">
    <router-link :to="detailsUrl">
      <img class="card-img-top" height="160px" :src="video.thumbnail" alt="Card image cap" />
    </router-link>
    <div class="card-body">
      <p class="card-text">
        {{video.title}}
        <br />
        {{video.author}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "video-homepage",
  props: {
    video: {
      type: Object,
      required: true
    }
  },
  computed: {
    detailsUrl() {
      return `/video/details/${this.video._id}`;
    }
  }
};
</script>

<style>
</style>
