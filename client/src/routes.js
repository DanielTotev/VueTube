import Index from "./views/Index";
import Register from "./views/Register";
import Login from "./views/Login";
import Home from "./views/Home";
import UploadVideo from "./views/video/UploadVideo";

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
];