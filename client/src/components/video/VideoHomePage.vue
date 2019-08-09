<template>
  <div class="card" style="width: 18rem">
    <a href="/tube/details">
      <img class="card-img-top" height="160px" :src="video.thumbnail" alt="Card image cap" />
    </a>
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
  }
};
</script>

<style>
</style>
