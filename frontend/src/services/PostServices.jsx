import api from "./api";

const getAllPosts = async () => {
  const response = await api.get("/posts");
  return response.data.data;
};

const getPostById = async (id) => {
  const response = await api.get(`/posts/${id}`);
  return response.data.data;
};

const createPost = async (postData) => {
  const response = await api.post("/posts", postData);
  return response.data;
};

const updatePost = async (id, data) => {
  const response = await api.put(`/posts/${id}`, data);
  return response.data;
};

const deletePost = async (id) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};

export default {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
}; 