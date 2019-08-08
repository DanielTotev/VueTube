import Index from "./components/Index";
import Register from "./components/Register";
import Login from "./components/Login";
import Test from "./components/Test";
import UploadVideo from "./components/video/UploadVideo";

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
        component: Test,
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