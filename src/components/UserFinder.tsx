import React, { useState } from "react";
import getUserData from "../api/githubApi";

interface User {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  followers: number;
}

const UserFinder = () => {
  const [username, setUsername] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");

  const handleSearch = async () => {
    if (!username) {
      setError("Username must be defined");
      return; // Return early to avoid unnecessary code execution
    }

    const data = await getUserData(username);

    if (data) {
      setUser(data);
      setError(""); // Clear any previous errors
    } else {
      setError("User not found.");
      setUser(null); // Ensure the user state is reset when no data is found
    }
  };

  return (
    <section className="p-4">
      <input
        type="text"
        value={username}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUsername(e.target.value)
        }
        placeholder="Enter GitHub username"
        className="border p-2 rounded"
      />
      <button
        onClick={handleSearch}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Search
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {user && (
        <div className="mt-4">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="rounded-full w-32 h-32"
          />
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
          <p>Followers: {user.followers}</p>
        </div>
      )}
    </section>
  );
};

export default UserFinder;
