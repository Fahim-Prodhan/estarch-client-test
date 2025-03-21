'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "@/components/services/baseUrl";

const TermsConditions = () => {
  const [termsContent, setTermsContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFooterContent = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/footer-contents`);
        console.log(response);
        
        setTermsContent(response.data?.termsConditions || "No content available.");
      } catch (error) {
        console.error("Error fetching Terms & Conditions content:", error);
        setTermsContent("Failed to load Terms & Conditions content.");
      } finally {
        setLoading(false);
      }
    };

    fetchFooterContent();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative w-full h-80 bg-cover bg-center" style={{ backgroundImage: "url('https://i.ibb.co.com/DPD4dyg0/horizontal-close-photo-african-businessman-260nw-1289842165.png')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Terms & Conditions</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 lg:px-20 py-12">
        <div className="bg-white shadow-xl rounded-lg p-8 md:p-12">
          {loading ? (
            <p className="text-center text-gray-500 animate-pulse">Loading content...</p>
          ) : (
            <div className="text-gray-700 text-lg leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: termsContent }}></div>
          )}
        </div>
      </div>

      {/* Key Sections with Collapsible Accordion */}
      {/* <div className="container mx-auto px-6 lg:px-20 pb-16">
        <div className="space-y-6">
          <details className="bg-gray-100 p-5 rounded-lg shadow-md">
            <summary className="text-xl font-semibold cursor-pointer">📌 User Agreement</summary>
            <p className="mt-2 text-gray-600">
              By accessing our services, you agree to comply with our terms and conditions.
            </p>
          </details>

          <details className="bg-gray-100 p-5 rounded-lg shadow-md">
            <summary className="text-xl font-semibold cursor-pointer">🔄 Changes to Terms</summary>
            <p className="mt-2 text-gray-600">
              We reserve the right to update these terms at any time, and continued use of the service implies acceptance.
            </p>
          </details>

          <details className="bg-gray-100 p-5 rounded-lg shadow-md">
            <summary className="text-xl font-semibold cursor-pointer">⚖️ Legal Compliance</summary>
            <p className="mt-2 text-gray-600">
              Users must adhere to all applicable laws and regulations while using our platform.
            </p>
          </details>

          <details className="bg-gray-100 p-5 rounded-lg shadow-md">
            <summary className="text-xl font-semibold cursor-pointer">📞 Contact Information</summary>
            <p className="mt-2 text-gray-600">
              For any questions regarding these terms, feel free to contact us at support@example.com.
            </p>
          </details>
        </div>
      </div> */}
    </div>
  );
};

export default TermsConditions;
