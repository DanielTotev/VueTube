import requester from "./../../http/requester";
import { getToken } from "./userService";

const authHeader = {
    "Authorization": `Bearer ${getToken()}`
};

const VIDEO_UPLOAD_URL = "http://localhost:3000/api/videos/upload";

export const uploadVideo = {
    methods: {
        postVideo() {
            const formData = new FormData();
            formData.append('title', this.title);
            formData.append('author', this.author);
            formData.append('video', this.video, this.video.name);
            formData.append('thumbnail', this.thumbnail, this.thumbnail.name);
            formData.append('description', this.description);

            return requester.doPost(VIDEO_UPLOAD_URL, authHeader, formData);
        }
    }
};