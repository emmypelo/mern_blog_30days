import axios from "axios";

const baseUrl = "http://localhost:4000/api/users";
// ? create User API
export const createUserApi = async (userData) => {
  const { data } = await axios.post(`${baseUrl}/register`, userData, {
    withCredentials: true,
  });
  return data;
};

// Login User API
export const loginUserApi = async (userData) => {
  const { data } = await axios.post(`${baseUrl}/login`, userData, {
    withCredentials: true,
  });
  return data;
};
