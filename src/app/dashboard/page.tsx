// "use client";

// import { useAuth } from "@/context/AuthContext";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function DashboardPage() {
//   const { user, isAuthenticated, logout } = useAuth();
//   const router = useRouter();
  
//   // Ye state check karegi ki page browser me load ho chuka hai ya nahi
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // Redirect logic ko safe banaya
//   useEffect(() => {
//     if (mounted && !isAuthenticated) {
//       router.push("/login?message=Please log in to view your dashboard");
//     }
//   }, [mounted, isAuthenticated, router]);

//   // BULLETPROOF CHECK 1: Agar page mount nahi hua ya user null hai, 
//   // toh neeche ka koi bhi HTML read hi mat karo, direct loader dikha do.
//   if (!mounted || !user) {
//     return (
//       <div className="min-h-screen flex justify-center items-center bg-gray-50">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
//       </div>
//     );
//   }

//   // BULLETPROOF CHECK 2: Variables pehle hi nikal lo fallback ke sath
//   const safeName = user.email.split('@')[0] || "Student";
//   const initial = safeName.charAt(0).toUpperCase();
//   const safeEmail = user.email || "No email provided";

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        
//         {/* --- LEFT SIDEBAR (Menu List) --- */}
//         <aside className="w-full md:w-80 flex-shrink-0">
//           <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
            
//             {/* User Info Header */}
//             <div className="p-6 text-center border-b border-gray-200 bg-gray-900 text-white">
//               <div className="w-20 h-20 mx-auto bg-purple-600 rounded-full flex items-center justify-center text-3xl font-bold mb-3 shadow-lg border-4 border-gray-800">
//                 {/* Ab yahan kabhi undefined nahi aayega */}
//                 {initial}
//               </div>
//               <h2 className="text-xl font-bold">{safeName}</h2>
//               <p className="text-sm text-gray-400">{safeEmail}</p>
//             </div>

//             {/* Menu Groups */}
//             <nav className="flex flex-col text-gray-700">
//               {/* Group 1: Learning & Cart */}
//               <div className="py-2 border-b border-gray-100">
//                 <Link href="#" className="block px-6 py-3 hover:text-purple-700 hover:bg-purple-50 transition-colors">My learning</Link>
//                 <Link href="/cart" className="block px-6 py-3 hover:text-purple-700 hover:bg-purple-50 transition-colors">My cart</Link>
//                 <Link href="#" className="block px-6 py-3 hover:text-purple-700 hover:bg-purple-50 transition-colors">Wishlist</Link>
//                 <Link href="#" className="block px-6 py-3 hover:text-purple-700 hover:bg-purple-50 font-bold transition-colors">Teach on EduStream</Link>
//               </div>

//               {/* Group 2: Comms */}
//               <div className="py-2 border-b border-gray-100">
//                 <Link href="#" className="block px-6 py-3 hover:text-purple-700 hover:bg-purple-50 transition-colors">Notifications</Link>
//                 <Link href="#" className="block px-6 py-3 hover:text-purple-700 hover:bg-purple-50 transition-colors">Messages</Link>
//               </div>

//               {/* Group 3: Account & Purchase */}
//               <div className="py-2 border-b border-gray-100">
//                 <Link href="#" className="block px-6 py-3 hover:text-purple-700 hover:bg-purple-50 transition-colors">Account settings</Link>
//                 <Link href="#" className="block px-6 py-3 hover:text-purple-700 hover:bg-purple-50 transition-colors">Purchase history</Link>
//               </div>

//               {/* Group 4: Profile */}
//               <div className="py-2 border-b border-gray-100">
//                 <Link href="#" className="block px-6 py-3 hover:text-purple-700 hover:bg-purple-50 transition-colors">Edit profile</Link>
//               </div>

//               {/* Group 5: Logout Action */}
//               <div className="py-2 bg-gray-50">
//                 <button 
//                   onClick={logout}
//                   className="w-full text-left px-6 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 font-bold transition-colors"
//                 >
//                   Log out
//                 </button>
//               </div>
//             </nav>
//           </div>
//         </aside>

//         {/* --- RIGHT MAIN CONTENT AREA --- */}
//         <main className="flex-1 bg-white shadow-sm border border-gray-200 rounded-lg p-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome to your Dashboard</h1>
//           <p className="text-gray-600 mb-8">
//             Select an option from the menu to view your learning progress, check your purchase history, or update your account settings.
//           </p>

//           {/* Quick Stats Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//             <div className="border border-gray-200 p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
//               <div className="text-3xl font-bold text-purple-700 mb-2">0</div>
//               <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Active Courses</div>
//             </div>
//             <div className="border border-gray-200 p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
//               <div className="text-3xl font-bold text-purple-700 mb-2">₹0.00</div>
//               <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Wallet Balance</div>
//             </div>
//             <div className="border border-gray-200 p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
//               <div className="text-3xl font-bold text-purple-700 mb-2">0</div>
//               <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Certificates</div>
//             </div>
//           </div>
//         </main>
        
//       </div>
//     </div>
//   );
// }





// "use client";

// import { useAuth } from "@/context/AuthContext";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// // Types for your backend data
// interface DashboardData {
//   name: string;
//   email: string;
//   role: "student" | "instructor"; // Backend se aayega
//   // Baki data jaise bio, links jab aayega tab interface update kar lenge
// }

// export default function DashboardPage() {
//   const { user, isAuthenticated, logout, token } = useAuth();
//   const router = useRouter();
  
//   const [mounted, setMounted] = useState(false);
//   const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
  
//   // Yahi state decide karegi ki right side me kya dikhana hai
//   const [activeTab, setActiveTab] = useState("my-learning"); 

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // Authentication Check
//   useEffect(() => {
//     if (mounted && !isAuthenticated) {
//       router.push("/login?message=Please log in to view your dashboard");
//     }
//   }, [mounted, isAuthenticated, router]);

//   // Fetch Full Dashboard Data from Backend
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       if (!token) return;
//       try {
//         const res = await fetch("http://localhost:4040/user/dashboard", {
//           method: "GET",
//           credentials: "include"
//         });
//         const data = await res.json();
        
//         if (data.success) {
//           setDashboardData(data.data);
//           // Agar instructor hai, toh default tab 'my-courses' rakh sakte hain
//           if (data.data.role === "instructor") {
//              setActiveTab("my-courses");
//           }
//         }
//       } catch (err) {
//         console.error("Failed to fetch dashboard data", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (mounted && isAuthenticated) {
//       fetchDashboardData();
//     }
//   }, [mounted, isAuthenticated, token]);

//   if (!mounted || !user || isLoading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center bg-gray-50">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
//       </div>
//     );
//   }

//   // Safe variables fallback
//   const safeName = dashboardData?.name || user.name || "User";
//   const initial = safeName.charAt(0).toUpperCase();
//   const safeEmail = dashboardData?.email || user.email || "";
//   const role = dashboardData?.role || "student"; // Default to student

//   // Sidebar Button Component for clean code
//   const SidebarButton = ({ label, tabName }: { label: string, tabName: string }) => (
//     <button
//       onClick={() => setActiveTab(tabName)}
//       className={`w-full text-left px-6 py-3 transition-colors ${
//         activeTab === tabName 
//           ? "bg-purple-100 text-purple-800 font-bold border-l-4 border-purple-700" 
//           : "hover:bg-gray-100 text-gray-700"
//       }`}
//     >
//       {label}
//     </button>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        
//         {/* --- LEFT SIDEBAR --- */}
//         <aside className="w-full md:w-72 flex-shrink-0">
//           <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden sticky top-24">
            
//             {/* User Profile Header */}
//             <div className="p-6 text-center border-b border-gray-200 bg-gray-900 text-white">
//               <div className="w-20 h-20 mx-auto bg-purple-600 rounded-full flex items-center justify-center text-3xl font-bold mb-3 shadow-lg border-4 border-gray-800">
//                 {initial}
//               </div>
//               <h2 className="text-xl font-bold">{safeName}</h2>
//               <p className="text-sm text-gray-400">{safeEmail}</p>
//               <div className="mt-2 inline-block px-3 py-1 bg-gray-800 rounded-full text-xs font-bold text-gray-300 uppercase tracking-wider">
//                 {role}
//               </div>
//             </div>

//             {/* Dynamic Navigation Menu */}
//             <nav className="flex flex-col py-2">
              
//               {/* Group 1: Learning & Content */}
//               {role === "instructor" && <SidebarButton label="My Courses" tabName="my-courses" />}
//               <SidebarButton label="My Learning" tabName="my-learning" />
//               <SidebarButton label="My Cart" tabName="my-cart" />
//               <SidebarButton label="Wishlist" tabName="wishlist" />
//               {role === "student" && <SidebarButton label="Teach on EduStream" tabName="teach-on-udemy" />}

//               <hr className="my-2 border-gray-100" />

//               {/* Group 2: Communications */}
//               <SidebarButton label="Notifications" tabName="notifications" />
//               {role === "instructor" && <SidebarButton label="Messages" tabName="messages" />}

//               <hr className="my-2 border-gray-100" />

//               {/* Group 3: Account & Settings */}
//               <SidebarButton label="Account Settings" tabName="account-settings" />
//               <SidebarButton label="Purchase History" tabName="purchase-history" />
//               <SidebarButton label="Edit Profile" tabName="edit-profile" />

//               <hr className="my-2 border-gray-100" />

//               {/* Logout Action */}
//               <button 
//                 onClick={logout}
//                 className="w-full text-left px-6 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 font-bold transition-colors"
//               >
//                 Log out
//               </button>
//             </nav>
//           </div>
//         </aside>

//         {/* --- RIGHT MAIN CONTENT AREA (DYNAMIC) --- */}
//         <main className="flex-1 bg-white shadow-sm border border-gray-200 rounded-lg p-8 min-h-[600px]">
          
//           {/* Ye Switch Case decide karega ki kya dikhana hai */}
//           {activeTab === "my-courses" && (
//             <div>
//               <h1 className="text-2xl font-bold mb-4">Instructor Dashboard</h1>
//               <p className="text-gray-500">Your created courses will appear here. (Code coming soon...)</p>
//             </div>
//           )}

//           {activeTab === "my-learning" && (
//             <div>
//               <h1 className="text-2xl font-bold mb-4">My Learning</h1>
//               <p className="text-gray-500">Enrolled courses will be listed here. (Code coming soon...)</p>
//             </div>
//           )}

//           {activeTab === "my-cart" && (
//             <div>
//               <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
//               <p className="text-gray-500">Cart items will appear here. (Code coming soon...)</p>
//             </div>
//           )}

//           {activeTab === "wishlist" && (
//             <div>
//               <h1 className="text-2xl font-bold mb-4">Wishlist</h1>
//               <p className="text-gray-500">Saved courses will appear here. (Code coming soon...)</p>
//             </div>
//           )}

//           {activeTab === "teach-on-udemy" && (
//             <div>
//               <h1 className="text-2xl font-bold mb-4">Become an Instructor</h1>
//               <p className="text-gray-500">Registration form for instructors. (Code coming soon...)</p>
//             </div>
//           )}

//           {activeTab === "notifications" && (
//             <div>
//               <h1 className="text-2xl font-bold mb-4">Notifications</h1>
//               <p className="text-gray-500">System and course notifications. (Code coming soon...)</p>
//             </div>
//           )}

//           {activeTab === "messages" && (
//             <div>
//               <h1 className="text-2xl font-bold mb-4">Messages</h1>
//               <p className="text-gray-500">Messages from enrolled students. (Code coming soon...)</p>
//             </div>
//           )}

//           {activeTab === "account-settings" && (
//             <div>
//               <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
//               <p className="text-gray-500">Change Email & Password forms will go here. (Code coming soon...)</p>
//             </div>
//           )}

//           {activeTab === "purchase-history" && (
//             <div>
//               <h1 className="text-2xl font-bold mb-4">Purchase History</h1>
//               <p className="text-gray-500">List of past transactions. (Code coming soon...)</p>
//             </div>
//           )}

//           {activeTab === "edit-profile" && (
//             <div>
//               <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
//               <p className="text-gray-500">Form to update Name, Bio, Links. (Code coming soon...)</p>
//             </div>
//           )}

//         </main>
        
//       </div>
//     </div>
//   );
// }



"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Backend se aane wale dashboard data ka structure
interface DashboardData {
  name: string;
  email: string;
  role: "student" | "instructor";
}

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  
  const [mounted, setMounted] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Right side content switch karne ke liye state
  const [activeTab, setActiveTab] = useState("my-learning"); 

  useEffect(() => {
    setMounted(true);
  }, []);

  // 1. Redirect logic: Agar login nahi hai toh login page pe bhej do
  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push("/login?message=Please log in to view your dashboard");
    }
  }, [mounted, isAuthenticated, router]);

  // 2. Data Fetching Logic (Cookie-based)
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user/dashboard", {
          method: "GET",
          // Token header ki ab zaroorat nahi hai
          credentials: "include", // 👈 Ye cookies automatically bhej dega
        });
        const data = await res.json();
        
        if (data.success) {
          setDashboardData(data.data);
          // Instructor ke liye default tab set karna
          if (data.data.role === "instructor") {
             setActiveTab("my-courses");
          }
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (mounted && isAuthenticated) {
      fetchDashboardData();
    }
  }, [mounted, isAuthenticated]);

  // 3. Crash Prevention: Jab tak data ya mounting na ho, spinner dikhao
  if (!mounted || !isAuthenticated || isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
      </div>
    );
  }

  // Safe variables calculation (No charAt errors)
  const safeName = dashboardData?.name || user?.name || "Student";
  const initial = safeName.charAt(0).toUpperCase();
  const safeEmail = dashboardData?.email || user?.email || "";
  const role = dashboardData?.role || "student";

  // Sidebar Button Component
  const SidebarButton = ({ label, tabName }: { label: string, tabName: string }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`w-full text-left px-6 py-3 transition-all ${
        activeTab === tabName 
          ? "bg-purple-50 text-purple-800 font-bold border-l-4 border-purple-700 shadow-sm" 
          : "hover:bg-gray-50 text-gray-600"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* --- LEFT SIDEBAR (Sticky) --- */}
        <aside className="w-full md:w-72 flex-shrink-0">
          <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden sticky top-24">
            
            <div className="p-6 text-center border-b border-gray-100 bg-gray-900 text-white">
              <div className="w-20 h-20 mx-auto bg-purple-600 rounded-full flex items-center justify-center text-3xl font-bold mb-3 shadow-lg border-4 border-gray-800">
                {initial}
              </div>
              <h2 className="text-xl font-bold">{safeName}</h2>
              <p className="text-sm text-gray-400 truncate">{safeEmail}</p>
              <span className="mt-2 inline-block px-3 py-1 bg-gray-800 rounded-full text-[10px] font-bold text-gray-300 uppercase">
                {role}
              </span>
            </div>

            <nav className="flex flex-col py-2">
              {/* Role-based options */}
              {role === "instructor" && <SidebarButton label="My Courses" tabName="my-courses" />}
              <SidebarButton label="My Learning" tabName="my-learning" />
              <SidebarButton label="My Cart" tabName="my-cart" />
              <SidebarButton label="Wishlist" tabName="wishlist" />
              {role === "student" && <SidebarButton label="Teach on EduStream" tabName="teach-on-udemy" />}

              <hr className="my-2 border-gray-100" />
              <SidebarButton label="Notifications" tabName="notifications" />
              {role === "instructor" && <SidebarButton label="Messages" tabName="messages" />}

              <hr className="my-2 border-gray-100" />
              <SidebarButton label="Account Settings" tabName="account-settings" />
              <SidebarButton label="Purchase History" tabName="purchase-history" />
              <SidebarButton label="Edit Profile" tabName="edit-profile" />

              <hr className="my-2 border-gray-100" />
              <button 
                onClick={logout}
                className="w-full text-left px-6 py-3 text-red-600 hover:bg-red-50 font-bold transition-colors"
              >
                Log out
              </button>
            </nav>
          </div>
        </aside>

        {/* --- RIGHT CONTENT AREA --- */}
        <main className="flex-1 bg-white shadow-sm border border-gray-200 rounded-lg p-8 min-h-[600px]">
          
          {/* Content Switch Case */}
          {activeTab === "my-courses" && (
            <div>
              <h1 className="text-2xl font-bold mb-4">My Courses (Instructor)</h1>
              <p className="text-gray-500">API: GET /instructor/courses</p>
            </div>
          )}

          {activeTab === "my-learning" && (
            <div>
              <h1 className="text-2xl font-bold mb-4">My Learning</h1>
              <p className="text-gray-500">API: GET /users/learnings</p>
            </div>
          )}

          {activeTab === "my-cart" && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
              <p className="text-gray-500">API: GET /users/cart</p>
            </div>
          )}

          {activeTab === "wishlist" && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Wishlist</h1>
              <p className="text-gray-500">API: GET /users/wishlist</p>
            </div>
          )}

          {activeTab === "account-settings" && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
              <div className="space-y-4 text-gray-500">
                <p>Option 1: Change Email (OTP Required)</p>
                <p>Option 2: Change Password</p>
              </div>
            </div>
          )}

          {activeTab === "edit-profile" && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
              <p className="text-gray-500">Basic Info, Bio, Social Links... (PATCH /users/basic-info)</p>
            </div>
          )}

          {/* Fallback for other tabs */}
          {!["my-courses", "my-learning", "my-cart", "wishlist", "account-settings", "edit-profile"].includes(activeTab) && (
            <div>
              <h1 className="text-2xl font-bold mb-4 capitalize">{activeTab.replace("-", " ")}</h1>
              <p className="text-gray-500">Component for {activeTab} will load here.</p>
            </div>
          )}

        </main>
        
      </div>
    </div>
  );
}