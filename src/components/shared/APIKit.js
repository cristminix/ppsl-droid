import axios from 'axios';

// Create axios client, pre-configured with baseURL
let APIKit = axios.create({
  baseURL: 'http://127.0.0.1:8080/ppsl_api/',
  timeout: 10000,
});

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = token => {
  APIKit.interceptors.request.use(function(config) {
    config.headers['X-API-KEY'] = '9c05c647d185d704fa3b5add357dd08777d05b99';
    config.headers['XX-APP-ID'] = 'ppsl-droid';
    return config;
  });
};

export default APIKit;
