import Link from "next/link";
import React from "react"; // This import is not strictly necessary for a functional component in Next.js 13+, but it doesn't hurt.


export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-20 px-4 bg-gray-50"> 
      <h1 className="text-5xl font-extrabold text-gray-900 mb-8 text-center">Terms of Service</h1> 
      <p className="text-xl text-gray-700 mb-10 text-center max-w-3xl leading-relaxed"> 
        These are the placeholder Terms of Service. Please review them carefully.
        Detailed terms and conditions will be available here shortly.
      </p>
      <Link href="/" className="text-blue-600 hover:underline text-lg font-medium"> 
        Go back to Home
      </Link>
    </div>
  );
}
