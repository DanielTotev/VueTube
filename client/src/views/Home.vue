<template>
  <div>
		 <div class="text-center mt-3">
        <h4 class="h4 text-info">Welcome to our Home page :)</h4>
    </div>
    <hr class="my-4">
    <div class="container">
			<div class="row">
				<div class="col col-md-4"  v-for="video in videos" :key="video._id">
					<VideoHomePage :video="video" />
				</div>
			</div>
    </div>
	</div>
</template>

<script>
import VideoHomePage from "@/components/video/VideoHomePage"
import { getVideos } from "./../mixins/services/videoService";

export default {
	name: 'home',
	data() {
		return {
			videos: []
		}
  },
  components: {
    VideoHomePage
  },
	mixins: [getVideos],
	created() {
		this.getAllVideos()
			.then(res => {
				this.videos = res.data;
			});
	}
}
</script>

<style>

</style>
