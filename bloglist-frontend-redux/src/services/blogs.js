import axios from "axios";
const baseUrl = "http://localhost:8000/";
let token = localStorage.getItem("token");

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  localStorage.setItem("token", token);
};

const getAll = async () => {
  const response = await axios.get(baseUrl + "api/blogs");
  return response.data;
};

const createBlog = async (newBlog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.post(baseUrl + "api/blogs", newBlog, config);
  return response.data;
};

const likear = async (blogUpdated, id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.put(
    baseUrl + "api/blogs/" + id,
    blogUpdated,
    config,
  );
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.delete(baseUrl + "api/blogs/" + id, config);
  return response.data;
};

export default { getAll, setToken, createBlog, likear, deleteBlog };
