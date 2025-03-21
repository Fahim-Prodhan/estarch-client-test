'use client'
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "@/components/services/baseUrl";
import { AuthContext } from "@/components/context/AuthProvider";

const ReturnPolicy = () => {
  const [returnPolicyContent, setReturnPolicyContent] = useState("");
  const [loading, setLoading] = useState(true);
  const {setGlobalLoading} = useContext(AuthContext)


  useEffect(() => {
    const fetchFooterContent = async () => {
      setGlobalLoading(true)
      try {
        const response = await axios.get(`${baseUrl}/api/footer-contents`);
        setReturnPolicyContent(response.data?.returnPolicy || "No content available.");
        setGlobalLoading(false)
      } catch (error) {
        console.error("Error fetching Return Policy content:", error);
        setReturnPolicyContent("Failed to load Return Policy content.");
      } finally {
        setLoading(false);
        setGlobalLoading(false)

      }
    };

    fetchFooterContent();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      {/* <div className="relative w-full h-80 bg-cover bg-center" style={{ backgroundImage: "url('https://media.istockphoto.com/id/1185890990/photo/return-policy-online-store-orders-company-policies-and-good-service-concept.jpg?s=612x612&w=0&k=20&c=AMENLMzTiiUSR2x6ezYy6IXPRLG_K3Kfptn1CYMp6zw=')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Return Policy</h1>
        </div>
      </div> */}

      {/* Content Section */}
      <div className="container mx-auto px-6 lg:px-20 py-12">
        <div className="bg-white shadow-xl rounded-lg p-8 md:p-12">
          {loading ? (
            <p className="text-center text-gray-500 animate-pulse">Loading content...</p>
          ) : (
            <div className="text-gray-700 text-lg leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: returnPolicyContent }}></div>
          )}
        </div>
      </div>

      {/* Key Sections with Collapsible Accordion */}
      {/* <div className="container mx-auto px-6 lg:px-20 pb-16">
        <div className="space-y-6">
          <details className="bg-gray-100 p-5 rounded-lg shadow-md">
            <summary className="text-xl font-semibold cursor-pointer">🔄 Return Eligibility</summary>
            <p className="mt-2 text-gray-600">
              Items must be returned within 30 days of purchase in their original condition with the receipt.
            </p>
          </details>

          <details className="bg-gray-100 p-5 rounded-lg shadow-md">
            <summary className="text-xl font-semibold cursor-pointer">📦 How to Return an Item</summary>
            <p className="mt-2 text-gray-600">
              To initiate a return, contact our support team or visit our returns portal.
            </p>
          </details>

          <details className="bg-gray-100 p-5 rounded-lg shadow-md">
            <summary className="text-xl font-semibold cursor-pointer">💰 Refund Processing</summary>
            <p className="mt-2 text-gray-600">
              Refunds will be processed within 5-7 business days after the item is received and inspected.
            </p>
          </details>

          <details className="bg-gray-100 p-5 rounded-lg shadow-md">
            <summary className="text-xl font-semibold cursor-pointer">📞 Customer Support</summary>
            <p className="mt-2 text-gray-600">
              If you have any questions, feel free to reach out to our support team at support@example.com.
            </p>
          </details>
        </div>
      </div> */}
    </div>
  );
};

export default ReturnPolicy;
