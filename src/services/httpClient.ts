import axios, { type InternalAxiosRequestConfig, type AxiosError } from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;
const apimKey = import.meta.env.VITE_APIM_AUTH_SUBSCRIPTION_KEY;

let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

const httpClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ===============================
   REQUEST INTERCEPTOR
================================ */

httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (apimKey) {
      config.headers["Ocp-Apim-Subscription-Key"] = apimKey;
    }

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* ===============================
   RESPONSE INTERCEPTOR (RETRY)
================================ */

httpClient.interceptors.response.use(
  // ✅ If the request succeeds, just return the response
  (response) => response,

  // ❌ If the request fails, handle the error here
  async (error: AxiosError) => {
    // Grab the request configuration (every Axios request has one)
    const config = error.config as InternalAxiosRequestConfig & {
      __retryCount?: number;
    };

    // If no config exists, we can't retry → just reject
    if (!config) {
      return Promise.reject(error);
    }

    // If retry count is not set yet, start at 0
    config.__retryCount = config.__retryCount || 0;

    // Decide if this error is worth retrying:
    const shouldRetry =
      !error.response || // network error (no response at all)
      error.response.status === 408 || // timeout
      (error.response.status >= 500 && error.response.status < 600); // server errors

    // Retry only if conditions are met AND we haven't retried more than 2 times
    if (shouldRetry && config.__retryCount < 2) {
      config.__retryCount++; // increase retry count

      // Wait a little before retrying (backoff: 500ms, then 1000ms)
      const delay = config.__retryCount * 500;
      await new Promise((resolve) => setTimeout(resolve, delay));

      // Retry the request with the same config
      return httpClient(config);
    }

    // If not retrying, just reject the error
    return Promise.reject(error);
  }
);

export default httpClient;
