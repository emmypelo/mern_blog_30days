import axios from "axios";

const baseUrl = "http://localhost:4000/api/posts";
// ? create Post API
export const createPostApi = async (postData) => {
  const { data } = await axios.post(`${baseUrl}/create`, postData);
  console.log(postData, data);
  return data;
};
