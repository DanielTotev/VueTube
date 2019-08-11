import axios from "axios";

const defaultHeaders = {
  'Content-Type': 'application/json'
};

const doRequest = (method, url, headers, data) => {  
  if(!headers) {
    headers = defaultHeaders;
  }

  const options = {
    method: method,
    headers,
    url,
    data
  };

  return axios(options);
}

const doGet =(url, headers) => doRequest("GET", url, headers);

const doPost = (url, headers, data) => doRequest("POST", url, headers, data);

const doDelte = (url, headers, data) => doRequest("DELETE", url, headers, data);

export default {
  doGet,
  doPost,
  doDelte
};