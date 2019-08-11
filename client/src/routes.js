import Index from "./views/Index";
import Register from "./views/Register";
import Login from "./views/Login";
import Home from "./views/Home";
import UploadVideo from "./views/video/UploadVideo";
import VideoDetails from "./views/video/VideoDetails";
import VideoDelete from "./views/video/VideoDelete";
import Profile from "./views/profile/Profile";

export const routes = [
    {
        path: '',
        component: Index,
        meta: {
            guest: true
        }
    },
    {
        path: '/register',
        component: Register,
        meta: {
            guest: true
        }
    },
    {
        path: '/login',
        component: Login,
        meta: {
            guest: true
        }
    },
    {
        path: '/home',
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/video-upload',
        component: UploadVideo,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/video/details/:id',
        component: VideoDetails,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/video/delete/:id',
        component: VideoDelete,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/profile',
        component: Profile,
        meta: {
            requiresAuth: true
        }
    },
];