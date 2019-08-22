import requester from './../http/requester';

const REGISTER_URL = "/api/users/register";
const LOGIN_URL = "/api/users/login";

export const isAuthenticated  = () => localStorage.getItem('authtoken') != null;

export const registerUser = {
    methods: {
      register() {
				const { email, password } = this;
				return requester.doPost(REGISTER_URL, null, { email, password });
			}
    }
}

export const loginUser = {
  methods: {
    login() {
      const { email, password } = this;
      return requester.doPost(LOGIN_URL, null, { email, password });
    }
  }
}

export const saveUserCredentials = authtoken => localStorage.setItem('authtoken', authtoken.split(' ')[1]);

export const clearCredentials = () => localStorage.clear();

export const getAuthHeaders = () => ({
  "Authorization": `Bearer ${localStorage.getItem('authtoken')}`
});