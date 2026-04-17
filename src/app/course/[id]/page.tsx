"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// TypeScript Interfaces based on your MongoDB structure
interface Lecture {
  title: string;
  duration: string;
}

interface Section {
  title: string;
  lectures: Lecture[];
}

interface Course {
  _id: string;
  title: string;
  subTitle: string;
  instructor: string;
  category: string;
  imgUrl: string;
  price: string;
  is_paid: boolean;
  tag: string;
  rating: number;
  students_enrolled: number;
  languages_available: string[];
  content_duration: string;
  number_of_lectures: number;
  requirments: string[];
  what_you_will_learn: string[];
  sections: Section[];
}

export default function SingleCoursePage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, token } = useAuth();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Accordion state handle karne ke liye (Kaunsa section open hai)
  const [openSectionIndex, setOpenSectionIndex] = useState<number>(0);

  const courseId = params.id as string;

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const res = await fetch(`http://localhost:4041/courses/${courseId}`);
        const data = await res.json();

        if (data.success) {
          setCourse(data.data);
        } else {
          setError(data.msg || "Course not found");
        }
      } catch (err) {
        setError("Failed to fetch course details.");
      } finally {
        setIsLoading(false);
      }
    };

    if (courseId) fetchCourseDetails();
  }, [courseId]);

  const handleAddToCart = async () => {
    // Logic: Agar login nahi hai toh login pe bhejo
    if (!isAuthenticated) {
      router.push("/login?message=Please log in to add to cart");
      return;
    }

    setIsAddingToCart(true);
    try {
      const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Token bhejna zaroori hai
        },
        body: JSON.stringify({ courseId: course?._id }),
      });
      const data = await res.json();

      if (data.success) {
        alert("Course added to cart successfully!");
        // Yahan tum chaho toh router.push('/cart') kar sakte ho aage chal ke
      } else {
        alert(data.message || "Failed to add to cart");
      }
    } catch (err) {
      alert("Server error while adding to cart.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-red-500 font-bold text-xl">{error || "Course not found"}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* --- HERO SECTION (Dark Theme like Udemy) --- */}
      <div className="bg-gray-900 text-white py-12 px-8 lg:px-24">
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 mb-4 text-sm font-bold text-purple-400">
            <span>{course.category}</span>
            <span>&gt;</span>
            <span>{course.tag}</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
          <p className="text-lg mb-6 text-gray-300">{course.subTitle}</p>
          
          <div className="flex items-center gap-4 mb-4 text-sm">
            <span className="text-yellow-400 font-bold">⭐ {course.rating} Rating</span>
            <span>({course.students_enrolled.toLocaleString()} students)</span>
          </div>
          
          <div className="mb-4 text-sm">
            Created by <span className="text-purple-400 underline cursor-pointer">{course.instructor}</span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <span>🌍 {course.languages_available.join(", ")}</span>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT & SIDEBAR GRID --- */}
      <div className="max-w-7xl mx-auto px-8 lg:px-24 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* LEFT COLUMN: Course Details */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* What you'll learn */}
          <div className="border border-gray-300 p-6 rounded-lg bg-gray-50">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">What you'll learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.what_you_will_learn?.map((item, index) => (
                <div key={index} className="flex gap-3 text-gray-700">
                  <span className="text-green-600">✔️</span>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Course Content (Accordion) */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Course content</h2>
            <div className="flex gap-4 text-sm text-gray-600 mb-4">
              <span>{course.sections?.length || 0} sections</span>
              <span>•</span>
              <span>{course.number_of_lectures} lectures</span>
              <span>•</span>
              <span>{course.content_duration} total length</span>
            </div>

            <div className="border border-gray-300 rounded-lg">
              {course.sections?.map((section, index) => (
                <div key={index} className="border-b border-gray-200 last:border-b-0">
                  <button 
                    onClick={() => setOpenSectionIndex(openSectionIndex === index ? -1 : index)}
                    className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 font-bold text-gray-900 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span>{openSectionIndex === index ? "▼" : "▶"}</span>
                      {section.title}
                    </div>
                    <span className="text-sm font-normal text-gray-600">
                      {section.lectures.length} lectures
                    </span>
                  </button>
                  
                  {/* Lectures List (Shows only if accordion is open) */}
                  {openSectionIndex === index && (
                    <div className="p-4 bg-white">
                      {section.lectures.map((lec, lecIndex) => (
                        <div key={lecIndex} className="flex justify-between items-center py-2 text-sm text-gray-700">
                          <div className="flex items-center gap-3">
                            <span className="text-gray-400">📺</span>
                            <span>{lec.title}</span>
                          </div>
                          <span className="text-gray-500">{lec.duration}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Floating Payment/Cart Card */}
        <div className="relative">
          <div className="sticky top-24 bg-white border border-gray-200 shadow-xl rounded-lg overflow-hidden">
            <img src={course.imgUrl} alt={course.title} className="w-full h-48 object-cover" />
            
            <div className="p-6">
              <div className="text-4xl font-bold mb-6 text-gray-900">
                ₹{course.price}
              </div>

              <div className="space-y-3 mb-6">
                <button 
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {isAddingToCart ? "Adding..." : "Add to cart"}
                </button>
                <button className="w-full bg-white border border-gray-900 text-gray-900 font-bold py-3 px-4 rounded hover:bg-gray-100 transition-colors">
                  Buy now
                </button>
              </div>

              <div className="text-center text-xs text-gray-500 mb-6">
                30-Day Money-Back Guarantee
              </div>

              <div className="space-y-2 text-sm text-gray-700">
                <h4 className="font-bold mb-2 text-gray-900">This course includes:</h4>
                <div className="flex items-center gap-2"><span>📺</span> {course.content_duration} on-demand video</div>
                <div className="flex items-center gap-2"><span>📱</span> Access on mobile and TV</div>
                <div className="flex items-center gap-2"><span>🏆</span> Certificate of completion</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- FLOATING AI COMPARE BUTTON --- */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 rounded-full shadow-2xl font-bold hover:scale-105 transition-transform">
          ✨ Compare with AI
        </button>
      </div>

    </div>
  );
}