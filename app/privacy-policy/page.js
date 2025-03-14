'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "@/components/services/baseUrl";

const PrivacyPolicy = () => {
  const [policyContent, setPolicyContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFooterContent = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/footer-contents`);
        setPolicyContent(response.data?.privacyPolicy || "No content available.");
      } catch (error) {
        console.error("Error fetching Privacy Policy content:", error);
        setPolicyContent("Failed to load Privacy Policy content.");
      } finally {
        setLoading(false);
      }
    };

    fetchFooterContent();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      {/* <div className="relative w-full h-80 bg-cover bg-center" style={{ backgroundImage: "url('/privacy-policy-banner.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Privacy & Policy</h1>
        </div>
      </div> */}

      {/* Content Section */}
      <div className="container mx-auto px-6 lg:px-20 py-12">
        <div className="bg-white shadow-xl rounded-lg p-8 md:p-12">
          {loading ? (
            <p className="text-center text-gray-500 animate-pulse">Loading content...</p>
          ) : (
            <div className="text-gray-700 text-lg leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: policyContent }}></div>
          )}
        </div>
      </div>

      {/* Key Sections with Collapsible Accordion */}
      {/* <div className="container mx-auto px-6 lg:px-20 pb-16">
        <div className="space-y-6">
          <details className="bg-gray-100 p-5 rounded-lg shadow-md">
            <summary className="text-xl font-semibold cursor-pointer">🔒 Data Collection</summary>
            <p className="mt-2 text-gray-600">
              We collect personal data, including name, email, and preferences, to enhance user experience.
            </p>
          </details>

          <details className="bg-gray-100 p-5 rounded-lg shadow-md">
            <summary className="text-xl font-semibold cursor-pointer">🔐 How We Use Your Data</summary>
            <p className="mt-2 text-gray-600">
              Your data is used to improve our services, process transactions, and personalize experiences.
            </p>
          </details>

          <details className="bg-gray-100 p-5 rounded-lg shadow-md">
            <summary className="text-xl font-semibold cursor-pointer">📜 Third-Party Sharing</summary>
            <p className="mt-2 text-gray-600">
              We do not sell your personal data but may share limited information with trusted partners.
            </p>
          </details>

          <details className="bg-gray-100 p-5 rounded-lg shadow-md">
            <summary className="text-xl font-semibold cursor-pointer">🛠️ Security Measures</summary>
            <p className="mt-2 text-gray-600">
              We implement strict security protocols to protect your data from unauthorized access.
            </p>
          </details>
        </div>
      </div> */}
    </div>
  );
};

export default PrivacyPolicy;
