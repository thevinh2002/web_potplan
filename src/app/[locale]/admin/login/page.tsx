"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useParams();
  const locale = (params.locale as string) || "en";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === "admin" && password === "admin") {
      localStorage.setItem("admin_session", JSON.stringify({ 
        isLoggedIn: true, 
        username: "admin",
        loginTime: Date.now() 
      }));
      router.push(`/${locale}/admin/dashboard`);
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#5c4a3d]">
          Admin Login
        </h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8b6914]"
              placeholder="Enter username"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8b6914]"
              placeholder="Enter password"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-[#8b6914] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#6d5210] transition-colors"
          >
            Login
          </button>
        </form>
        
        <p className="text-center text-gray-500 text-sm mt-4">
        </p>
      </div>
    </div>
  );
}
