import requester from "./../../http/requester";
import { getAuthHeaders } from "./userService";

const VIDEO_UPLOAD_URL = "http://localhost:3000/api/videos/upload";
const VIDEO_GET_ALL_URL = "http://localhost:3000/api/videos/getAll";
const VIDEO_DETAILS_URL = "http://localhost:3000/api/videos/details/";
const VIDEO_DELETE_URL = "http://localhost:3000/api/videos/delete/";
const VIDEO_UPDATE_URL = "http://localhost:3000/api/videos/edit/";

export const buildVideoFormData = {
    methods: {
        buildFormData() {
            const formData = new FormData();
            formData.append('title', this.title);
            formData.append('author', this.author);
            formData.append('video', this.video, this.video.name);
            formData.append('thumbnail', this.thumbnail, this.thumbnail.name);
            formData.append('description', this.description);

            return formData;
        }
    }
}

export const uploadVideo = {
    methods: {
        postVideo(formData) {
            return requester.doPost(VIDEO_UPLOAD_URL, getAuthHeaders(), formData);
        }
    }
};

export const getVideos = {
    methods: {
        getAllVideos() {
            return requester.doGet(VIDEO_GET_ALL_URL, getAuthHeaders());
        }
    }
}

export const getDetails = {
    methods: {
        loadVideoDetailsById(id) {
            return requester.doGet(VIDEO_DETAILS_URL + id, getAuthHeaders());
        }
    }
}

export const deleteVideo = {
    methods: {
        deleteVideoById(id) {
            return requester.doDelte(VIDEO_DELETE_URL + id, getAuthHeaders());
        }
    }
}

export const updateVideo = {
    methods: {
        updateVideoById(id, formData) {
            return requester.doPut(VIDEO_UPDATE_URL + id, getAuthHeaders(), formData);
        }
    }
}