import axios from "axios";

// name, username, email, password, passMatch
const baseUrl = "http://localhost:4000/api/users";
// ? create User API
export const registerUserApi = async (userData) => {
  const { data } = await axios.post(
    `${baseUrl}/register`,
    {
      name: userData?.name,
      username: userData?.password,
      email: userData?.email,
      password: userData?.password,
      passMatch: userData.passMatch,
    },
    {
      withCredentials: true,
    }
  );

  return data;
};

// Login User API
export const loginUserApi = async (userData) => {
  const { data } = await axios.post(`${baseUrl}/login`, userData, {
    withCredentials: true,
  });
  return data;
};
