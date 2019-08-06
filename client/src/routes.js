import Index from './components/Index';
import Register from './components/Register';
import Login from './components/Login';
import Test from './components/Test';

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
    
];