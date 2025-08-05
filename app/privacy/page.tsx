import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-20 px-4 bg-gray-50"> 
      <h1 className="text-5xl font-extrabold text-gray-900 mb-8 text-center">Privacy Policy</h1> 
      <p className="text-xl text-gray-700 mb-10 text-center max-w-3xl leading-relaxed"> 
        This is a placeholder for our Privacy Policy. We are committed to protecting your privacy.
        More detailed information will be provided here soon.
      </p>
      <Link href="/" className="text-blue-600 hover:underline text-lg font-medium"> 
        Go back to Home
      </Link>
    </div>
  );
}
