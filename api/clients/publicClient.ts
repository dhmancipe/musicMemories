import axios,{ AxiosResponse } from "axios"
//import { APPCONFIG } from "../../utils/constants"

export interface HttpResponse<T> {
	success: boolean;
	data?: T | boolean;
	error?: string;
}
const API_KEY = 'c19c47264b0dfd0973d63aa54cb6788c';

 const PublicClient = axios.create({
	baseURL: `https://ws.audioscrobbler.com/2.0/`,
	timeout: 90000,
	headers: {
		'Content-Type': 'application/json',
	},
});

PublicClient.interceptors.request.use(config => {
  config.params = {
    ...config.params,
    api_key: API_KEY,
    format: 'json', 
  };
  return config;
});

PublicClient.interceptors.response.use(
    (response): AxiosResponse<HttpResponse<any>> => {
    
      return response;
    },
    (error): Promise<HttpResponse<any>> => {
       return Promise.reject({
        success: false,
        error: error?.response?.data?.message || 'No Network Connection',
      });
    }
  );

  export default PublicClient