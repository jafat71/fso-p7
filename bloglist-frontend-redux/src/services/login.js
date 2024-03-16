import axios from "axios";
const baseUrl = "http://localhost:8000/";

const login = async (username, password) => {
  const credentials = {
    username,
    password,
  };

  const response = await axios.post(baseUrl + "api/auth/login", credentials);
  return response.data;
};

export default { login };
