import axios from "axios";

const GITHUB_API_URL = "https://api.github.com/users/";

interface User {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  followers: number;
  public_repos: number;
}

const getUserData = async (username: string): Promise<User | null> => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}${username}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getUserData;
