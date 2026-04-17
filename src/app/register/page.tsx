"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLinkSent, setIsLinkSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Yahan tera backend call hoga jo DB me unverified user banayega aur email bhejega
      const res = await fetch("http://localhost:4040/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
 
      if (data.success) {
        router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
      } else {
        setError(data.msg || "Registration failed.");
      }
    } catch (err) {
      setError("Server error. Please check your backend.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuth = (provider: string) => {
    // Backend OAuth routes par redirect
    window.location.href = `http://localhost:4040/auth/${provider}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Sign up and start learning</h2>
        
        {isLinkSent ? (
          <div className="text-center p-6 bg-green-50 rounded-md border border-green-200">
            <div className="text-4xl mb-4">📧</div>
            <h3 className="text-lg font-bold text-green-900 mb-2">Check your email</h3>
            <p className="text-sm text-green-700">
              We've sent a verification link to <b>{email}</b>. Please click the link to activate your account.
            </p>
          </div>
        ) : (
          <>
            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded">{error}</div>}

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-800">Full Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block text-gray-800 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  className="mt-1 block text-gray-800 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  required
                  className="mt-1 block text-gray-800 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? "Signing up..." : "Sign Up"}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleOAuth('google')}
                  className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg mr-2">🇬</span> Google
                </button>
                <button
                  onClick={() => handleOAuth('github')}
                  className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-gray-900 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
                >
                  <span className="text-lg mr-2">🐙</span> GitHub
                </button>
              </div>
            </div>
          </>
        )}

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-purple-600 hover:text-purple-500">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}