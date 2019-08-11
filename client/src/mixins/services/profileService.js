import requester from "./../../http/requester";
import { getAuthHeaders } from "./userService";

const PROFILE_URL = "http://localhost:3000/api/profile";

export const profileService = {
    methods: {
        getProfileData() {
            return requester.doGet(PROFILE_URL, getAuthHeaders());
        }
    }
}