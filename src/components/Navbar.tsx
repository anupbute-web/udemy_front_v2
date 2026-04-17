"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  console.log(user,'hi')
  // Ye trick Next.js me hydration error (UI mismatch) ko rokne ke liye hoti hai
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-200 sticky top-0 bg-white z-50 shadow-sm">
      <Link href="/" className="text-2xl font-bold text-purple-700 tracking-tighter hover:text-purple-800 transition-colors">
        EduStream AI
      </Link>
      
      <div className="flex-1 max-w-xl mx-8 hidden md:block">
        <input 
          type="text" 
          placeholder="Search for anything..." 
          className="w-full px-4 py-2 border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
      </div>

      <div className="flex items-center gap-4">
        {/* Jab tak component mount na ho jaye tab tak kuch na dikhaye, isse refresh pe flicker nahi hoga */}
        {mounted && isAuthenticated ? (
          <div className="flex items-center gap-4 sm:gap-6">
            
            {/* --- USER AVATAR & DASHBOARD LINK --- */}
            <Link 
              href="/dashboard" 
              className="flex items-center gap-2 group"
              title="Go to Dashboard"
            >
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-sm group-hover:bg-purple-700 transition-colors border-2 border-transparent group-hover:border-purple-200">
                {/* Safe character extraction */}
                {user?.email ? user.email.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="hidden flex-col sm:flex">
                <span className="text-xs text-gray-500">Welcome,</span>
                <span className="text-sm font-bold text-gray-800 group-hover:text-purple-700 transition-colors">
                  {user?.name?.split(" ")[0] || "Student"}
                </span>
              </div>
            </Link>

            {/* --- CART ICON --- */}
            <Link href="/cart" className="text-xl hover:scale-110 transition-transform" title="Cart">
              🛒
            </Link>

            {/* --- LOGOUT BUTTON --- */}
            <button 
              onClick={logout} 
              className="px-4 py-2 text-sm text-red-600 font-bold hover:bg-red-50 rounded transition-colors border border-transparent hover:border-red-100"
            >
              Logout
            </button>
          </div>
        ) : mounted && !isAuthenticated ? (
          <>
            <Link href="/login" className="px-5 py-2 text-sm font-bold hover:text-purple-700 transition-colors">Log in</Link>
            <Link href="/register" className="px-5 py-2 text-sm bg-gray-900 text-white font-bold hover:bg-gray-800 transition-colors rounded">Sign up</Link>
          </>
        ) : null}
      </div>
    </nav>
  );
}