import axios from "axios";

// axios.interceptors.response.use(function (response) {
//   return response;
// }, function(err) {
//   const { message } = err.response.data;
//   console.log(message);
//   return Promise.reject(err);
// });

const defaultHeaders = {
  'Content-Type': 'application/json'
};

const doGet =(url, headers) => {
  if(!headers) {
    headers = defaultHeaders;
  }

  const options = {
    method: "GET",
    headers,
    url
  };

  return axios(options);
}

const doPost = (url, headers, data) => {
  const options = {
    method: "POST",
    headers,
    data,
    url
  };

  return axios(options);
};

export default {
  doGet,
  doPost
};