"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// Typescript interface for Course data
interface Course {
  _id: string;
  title: string;
  instructorName: string;
  price: number;
  modulePrice: number;
  thumbnailUrl: string;
}

export default function HomePage() {
  const { user, token, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
 
  // Real API Fetch Logic 
  console.log('trying to connect')
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:4041/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Agar token hai, toh Authorization header me bhej do (Yehi tumhara doubt tha!)
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        
        const data = await res.json();
        console.log(data);
        
        if (res.ok && data.success) {
          setCourses(data.data); // Backend se courses array set kiya
        } else {
          setError(data.message || "Failed to load courses");
        }
      } catch (err) {
        console.log('hi')
        setError("Failed to connect to backend service.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [token]);

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* --- HERO SECTION --- */}
      <section className="bg-purple-900 text-white py-16 px-8">
        <div className="max-w-4xl">
          <h1 className="text-5xl font-bold mb-4">Learning that fits your wallet.</h1>
          <p className="text-xl mb-8 text-purple-100">
            Don't want the whole course? Buy just the <b>module</b> you need for as low as ₹20. 
          </p>
          {isAuthenticated && (
            <div className="flex gap-4">
               {/* Ye API call karega tera wallet balance laane ke liye aage chal ke */}
              <button className="border-2 border-white px-6 py-3 font-bold rounded-sm hover:bg-white hover:text-purple-900">
                View My Wallet
              </button>
            </div>
          )}
        </div>
      </section>

      {/* --- REAL COURSE LISTING --- */}
      <main className="p-8">
        <h2 className="text-2xl font-bold mb-6">Top Courses</h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 font-bold">{error}</div>
        ) : courses.length === 0 ? (
          <div className="text-gray-500">No courses available at the moment.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div key={course._id} onClick={() => router.push(`/course/${course._id}`)} className="group cursor-pointer border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <img src={course.thumbnailUrl || "https://via.placeholder.com/400x200"} alt={course.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 leading-tight group-hover:text-purple-700">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{course.instructorName}</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-bold text-xl">₹{course.price}</span>
                  </div>

                  <div className="space-y-2">
                    <button className="w-full py-2 bg-purple-600 text-white font-bold rounded hover:bg-purple-700 transition-colors">
                      Buy Full Course
                    </button>
                    <button className="w-full py-2 border border-purple-600 text-purple-600 font-bold rounded hover:bg-purple-50 transition-colors">
                      Unlock Module (${course.modulePrice})
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}