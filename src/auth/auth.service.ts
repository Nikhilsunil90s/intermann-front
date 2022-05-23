import axios, { Axios } from 'axios';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../config/serverApiConfig';
import { getCookie, setCookie, deleteCookie } from "./cookie";

export const token = {
  get: () => {
    return getCookie(ACCESS_TOKEN_NAME);
  },
  set: (token: any) => {
    return setCookie(ACCESS_TOKEN_NAME, token);
  },
  remove: () => {
    return deleteCookie(ACCESS_TOKEN_NAME);
  },
};

export const login = async (loginData: {
  email: string,
  password: string
}) => {
  try {
    const response = await axios.post(API_BASE_URL, loginData)
    return {
      success: true,
      user: response.data.user,
      token: response.data.token,
    }
  } catch (err) {
    return {
      success: false,
      user: null,
      message: err
    }
  }
}

export const logout = () => {
  token.remove();
};