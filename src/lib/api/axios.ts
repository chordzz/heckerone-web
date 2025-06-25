

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_API_BASE_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL,
  // headers: {
  //     'Content-Type': 'application/json',
  // },
  
})

axiosInstance.interceptors.request.use( config => {
        // const token = localStorage.getItem('heckerOneAccessToken');

        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }

        // return config
        if (typeof window !== "undefined") {
          const token = localStorage.getItem('heckerOneAccessToken');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.request.use((req) => {
  if (req.data instanceof FormData) {
    return req;
  }
  if (req.method === 'post' || req.method === 'put') {
    req.headers['Content-Type'] = 'application/json';
  }
  return req;
});

axiosInstance.interceptors.response.use( response => 
  response,
  async error => {
    if (error.response.status === 401) {
      // const newToken = await refreshToken();
      // localStorage.setItem('authToken', newToken);

      localStorage.removeItem('heckerOneAccessToken');
      localStorage.removeItem('heckerOneUserLoggedIn');

      // Retry the original request
      return axios(error.config);
    }
    return Promise.reject(error);
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleApiError = async (error: any) => {
  try {
    let errorMessage;

    if (error.status === 401) {
        errorMessage = error.response?.data?.data?.detail || error.response?.data?.detail || error.response?.data?.message || 'An unexpected error occurred'
        const data = null;
        if (window.location.pathname !== '/') {
          window.location.href = '/';
        }  throw { error: errorMessage, data };
    }

    errorMessage = error.response?.data?.detail  || error.response?.data?.message || 'An  unexpected error occurred';
    const data = null;
    throw { error: errorMessage, data };

  } catch (error) {
    throw (error);
    // if (typeof error === 'object' && error !== null && 'error' in error) {
    //   throw { error: (error as any).error || 'An unexpected error occurred.' };
    // } else {
    //   throw { error: 'An unexpected error occurred.' };
    // }
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleApiSuccess = async (response: any) => {
  try {
    const data = response.data;
    const error = null;
    return { data, error };
  } catch (error) {
    console.error(error)
    throw new Error('An unexpected error occurred');
  }
};


export default axiosInstance;