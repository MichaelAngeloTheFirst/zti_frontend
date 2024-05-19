import axios from "axios";
import { useAuth } from "oidc-react";

export const useAxiosClient = () => {
  const auth = useAuth();

  const client = axios.create({
    headers: {
      "Content-Type": "application/json",
    },
  });

  client.interceptors.request.use(
    (config) => {
      const token = auth.userData?.access_token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return client;
};
