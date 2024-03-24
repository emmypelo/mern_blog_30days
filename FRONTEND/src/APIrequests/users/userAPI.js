import axios from "axios";

// name, username, email, password, passMatch
const baseUrl = "http://localhost:4000/api/users";
// ? create User API
export const registerUserApi = async (userData) => {
  const { data } = await axios.post(
    `${baseUrl}/register`,
    userData,

    {
      withCredentials: true,
    }
  );

  return data;
};

// Login
export const loginUserApi = async (userData) => {
  const { data } = await axios.post(`${baseUrl}/login`, userData, {
    withCredentials: true,
  });
  return data;
};
// Check Username
export const checkUserApi = async (email) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/check`,
      { email },
      {
        withCredentials: true,
      }
    );
    if (data.userExist === false) {
      // console.log(data);
      return data;
    } else {
      throw new Error("Email already in database");
    }
  } catch (error) {
    console.error("Error checking user existence:", error);
    return { exists: false };
  }
};

// Check Username
export const checkUsernameApi = async (username) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/checkusername`,
      { username },
      {
        withCredentials: true,
      }
    );
    if (data.userExist === false) {
      // console.log(data);
      return data;
    } else {
      throw new Error("Username already in database");
    }
  } catch (error) {
    console.error("Error checking user existence:", error);
    return { exists: false };
  }
};
