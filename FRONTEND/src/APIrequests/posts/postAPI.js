import axios from "axios";

const baseUrl = "http://localhost:4000/api/posts";
// ? create Post API
export const createPostApi = async (postData) => {
  const { data } = await axios.post(`${baseUrl}/create`, postData,);
  // console.log(postData, data);
  return data;
};

export const fetchPostsApi = async () => {
  const { data } = await axios.get(`${baseUrl}`);
  // console.log(data);
  return data;
};

export const postDetailsApi = async (postId) => {
  const { data } = await axios.get(`${baseUrl}/${postId}`);
  // console.log(data);
  return data;
};

export const updatePostApi = async (updateData) => {
  const { data } = await axios.put(
    `${baseUrl}/${updateData?.postId}`,
    updateData
  );
  console.log(data);
  return data;
};

export const deletePostApi = async (postId) => {
  const { data } = await axios.delete(`${baseUrl}/${postId}`);
  console.log(data);
  return data;
};
