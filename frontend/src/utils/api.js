import axios from 'axios';
// simple wrapper over axios
export function apiCall(config) {
  const { token } = localStorage;
  if (token)
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${token}`;
  const request = axios(config);
  return request;
}
