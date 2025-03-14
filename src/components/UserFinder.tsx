import React, { useState } from "react";
import getUserData from "../api/githubApi";

interface User {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  followers: number;
  public_repos: number;
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
      setError("User not found");
      setUser(null); // Ensure the user state is reset when no data is found
    }
  };

  return (
    <section className="p-8 flex items-center justify-center flex-col bg-gradient-to-r from-purple-500 to-blue-500 min-h-screen">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl transform transition duration-500 hover:scale-105">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          GitHub User Finder
        </h1>

        {/* Input field with modern styles */}
        <div className="flex mb-6">
          <input
            type="text"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            placeholder="Enter GitHub username"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
          >
            Search
          </button>
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* User data display */}
        {user && (
          <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
            <div className="flex flex-col md:flex-row items-center mb-4">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="rounded-full w-32 h-32 border-4 border-purple-600 transform transition duration-300 hover:scale-110"
              />
              <div className="ml-4 mt-4 md:mt-0">
                <h2 className="text-2xl font-bold text-gray-800 truncate">
                  {user.name}
                </h2>
                <p className="text-sm text-gray-600 truncate">@{user.login}</p>
              </div>
            </div>

            <p className="text-lg text-gray-700 break-words">
              {user.bio || "No bio available"}
            </p>
            <p className="mt-4 text-gray-600">Followers: {user.followers}</p>
            <p className="mt-4 text-gray-600">
              Repositories: {user.public_repos}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserFinder;
