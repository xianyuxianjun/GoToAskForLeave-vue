import axios from 'axios';
// 创建axios实例
const service = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    const accessToken = useCookie('accessToken').value;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 解析数据如果它是JSON
    let parsedData = null;
    try {
      parsedData = JSON.parse(response.data);
    } catch (error) {
      // console.error('Error parsing response:', error);
      parsedData = response.data; // 如果解析失败，直接返回原始数据
    }
    return { ...response, data: parsedData };
  },
  error => {
    console.error("Response Error:", error);
    return Promise.reject(error);
  }
);

// 封装常用的HTTP方法
export const useApi = {
  get: (url, params) => service.get(url, { params }),
  post: (url, data) => service.post(url, data),
  put: (url, data) => service.put(url, data),
  delete: (url, params) => service.delete(url, { params })
};
