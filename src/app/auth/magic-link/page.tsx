"use client";

import { useState } from "react";
import Link from "next/link";

export default function MagicLinkPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("http://localhost:5000/api/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setMessage(data.message || "Failed to send link.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Server error.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Passwordless Sign In</h2>
        <p className="text-center text-gray-600 mb-6">We'll send a magic link to your email.</p>

        {status === "success" ? (
          <div className="text-center p-6 bg-green-50 rounded-md">
            <p className="text-green-800 font-medium">✨ Magic link sent!</p>
            <p className="text-sm text-green-600 mt-2">Check your inbox and click the link to log in.</p>
          </div>
        ) : (
          <form onSubmit={handleMagicLink} className="space-y-4">
            {status === "error" && <div className="p-3 bg-red-100 text-red-700 text-sm rounded">{message}</div>}
            <div>
              <input
                type="email"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 transition-colors"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-gray-900 text-white font-bold py-3 px-4 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "Sending..." : "Send Magic Link"}
            </button>
          </form>
        )}

        <p className="mt-8 text-center text-sm text-gray-600">
          <Link href="/login" className="font-medium text-purple-600 hover:text-purple-500">
            &larr; Back to standard login
          </Link>
        </p>
      </div>
    </div>
  );
}