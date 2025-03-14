import axios from "axios";

const GITHUB_API_URL = "https://api.github.com/users/";

const getUserData = async (username: string) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}${username}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getUserData;
