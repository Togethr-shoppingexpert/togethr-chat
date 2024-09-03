// pages/login.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { config } from "../../constants";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // Redirect to Google login endpoint
      window.location.href = `https://${config.url}/api/oauth2/login/google`;
    } catch (error) {
      console.error("Error during Google login:", error);
      setLoading(false);
      // Optionally show an error message to the user
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out"
          disabled={loading}
        >
          <FaGoogle className="mr-2" />
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6H4zm10 0a6 6 0 00-6 6h2a4 4 0 014-4v-2zm2-6v2a8 8 0 018 8h-2a6 6 0 00-6-6V4zm-4 4v2a6 6 0 006 6h2a8 8 0 00-8-8z"
                ></path>
              </svg>
              "Redirecting..."
            </>
          ) : (
            "Sign in with Google"
          )}
        </button>
      </div>
    </div>
  );
}
