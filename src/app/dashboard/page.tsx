"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  
  // Ye state check karegi ki page browser me load ho chuka hai ya nahi
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect logic ko safe banaya
  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push("/login?message=Please log in to view your dashboard");
    }
  }, [mounted, isAuthenticated, router]);

  // BULLETPROOF CHECK 1: Agar page mount nahi hua ya user null hai, 
  // toh neeche ka koi bhi HTML read hi mat karo, direct loader dikha do.
  if (!mounted || !user) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
      </div>
    );
  }

  // BULLETPROOF CHECK 2: Variables pehle hi nikal lo fallback ke sath
  const safeName = user.email.split('@')[0] || "Student";
  const initial = safeName.charAt(0).toUpperCase();
  const safeEmail = user.email || "No email provided";

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* --- LEFT SIDEBAR (Menu List) --- */}
        <aside className="w-full md:w-80 flex-shrink-0">
          <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
            
            {/* User Info Header */}
            <div className="p-6 text-center border-b border-gray-200 bg-gray-900 text-white">
              <div className="w-20 h-20 mx-auto bg-purple-600 rounded-full flex items-center justify-center text-3xl font-bold mb-3 shadow-lg border-4 border-gray-800">
                {/* Ab yahan kabhi undefined nahi aayega */}
                {initial}
              </div>
              <h2 className="text-xl font-bold">{safeName}</h2>
              <p className="text-sm text-gray-400">{safeEmail}</p>
            </div>

            {/* Menu Groups */}
            <nav className="flex flex-col text-gray-700">
              {/* Group 1: Learning & Cart */}
              <div className="py-2 border-b border-gray-100">
                <Link href="#" className="block px-6 py-3 hover:text-purple-700 hover:bg-purple-50 transition-colors">My learning</Link>
                <Link href="/cart" className="block px-6 py-3 hover:text-purple-700 hover:bg-purple-50 transition-colors">My cart</Link>
                <Link href="#" className="block px-6 py-3 hover:text-purple-700 hover:bg-purple-50 transition-colors">Wishlist</Link>
                <Link href="#" className="block px-6 py-3 hover:text-purple-700 hover:bg-purple-50 font-bold transition-colors">Teach on EduStream</Link>
              </div>

              {/* Group 2: Comms */}
              <div className="py-2 border-b border-gray-100">
                <Link href="#" className="block px-6 py-3 hover:text-purple-700 hover:bg-purple-50 transition-colors">Notifications</Link>
                <Link href="#" className="block px-6 py-3 hover:text-purple-700 hover:bg-purple-50 transition-colors">Messages</Link>
              </div>

              {/* Group 3: Account & Purchase */}
              <div className="py-2 border-b border-gray-100">
                <Link href="#" className="block px-6 py-3 hover:text-purple-700 hover:bg-purple-50 transition-colors">Account settings</Link>
                <Link href="#" className="block px-6 py-3 hover:text-purple-700 hover:bg-purple-50 transition-colors">Purchase history</Link>
              </div>

              {/* Group 4: Profile */}
              <div className="py-2 border-b border-gray-100">
                <Link href="#" className="block px-6 py-3 hover:text-purple-700 hover:bg-purple-50 transition-colors">Edit profile</Link>
              </div>

              {/* Group 5: Logout Action */}
              <div className="py-2 bg-gray-50">
                <button 
                  onClick={logout}
                  className="w-full text-left px-6 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 font-bold transition-colors"
                >
                  Log out
                </button>
              </div>
            </nav>
          </div>
        </aside>

        {/* --- RIGHT MAIN CONTENT AREA --- */}
        <main className="flex-1 bg-white shadow-sm border border-gray-200 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome to your Dashboard</h1>
          <p className="text-gray-600 mb-8">
            Select an option from the menu to view your learning progress, check your purchase history, or update your account settings.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="border border-gray-200 p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-purple-700 mb-2">0</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Active Courses</div>
            </div>
            <div className="border border-gray-200 p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-purple-700 mb-2">₹0.00</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Wallet Balance</div>
            </div>
            <div className="border border-gray-200 p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-purple-700 mb-2">0</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Certificates</div>
            </div>
          </div>
        </main>
        
      </div>
    </div>
  );
}