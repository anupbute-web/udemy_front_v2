"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function OTPVerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Input focus shifting logic
  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;
    
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const fullOtp = otp.join("");
    
    try {
      const res = await fetch("http://localhost:4040/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token:email, otp: fullOtp }),
      });
      const data = await res.json();

      if (data.success) {
        // Success: Redirect to Login
        router.push("/login?message=Account verified successfully");
      } else {
        setError(data.msg || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Server error. Check your backend.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    
    setCanResend(false);
    setTimer(30); // Reset timer
    setError("");

    try {
      await fetch("http://localhost:4040/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      // Backend should trigger RabbitMQ/Email
    } catch (err) {
      setError("Failed to resend OTP.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md text-center border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify Email</h2>
        <p className="text-gray-600 mb-8 text-sm">
          We've sent a 6-digit code to <br />
          <span className="font-semibold text-gray-900">{email}</span>
        </p>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded">{error}</div>}

        <form onSubmit={handleVerify}>
          <div className="flex justify-between gap-2 mb-8">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !otp[index] && index > 0) {
                    inputRefs.current[index - 1]?.focus();
                  }
                }}
                className="w-12 h-14 border-2 border-gray-200 rounded-md text-center text-xl font-bold focus:border-purple-600 focus:outline-none transition-colors"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading || otp.some(v => v === "")}
            className="w-full bg-purple-600 text-white font-bold py-3 rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Verify & Continue"}
          </button>
        </form>

        <div className="mt-8">
          <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
          <button
            onClick={handleResend}
            disabled={!canResend}
            className={`font-bold transition-colors ${
              canResend ? "text-purple-600 hover:text-purple-700" : "text-gray-400"
            }`}
          >
            {canResend ? "Resend OTP" : `Resend in ${timer}s`}
          </button>
        </div>

        <Link href="/register" className="block mt-6 text-sm text-gray-500 hover:underline">
          &larr; Use another email
        </Link>
      </div>
    </div>
  );
}

// Suspense wrap for searchParams
export default function OTPVerifyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OTPVerifyContent />
    </Suspense>
  );
}