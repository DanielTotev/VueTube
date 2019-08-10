import requester from "./../../http/requester";
import { getToken } from "./userService";

const authHeader = {
    "Authorization": `Bearer ${getToken()}`
};

const PROFILE_URL = "http://localhost:3000/api/profile";

export const profileService = {
    methods: {
        getProfileData() {
            return requester.doGet(PROFILE_URL, authHeader);
        }
    }
}