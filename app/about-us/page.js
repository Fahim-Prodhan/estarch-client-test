'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "@/components/services/baseUrl";

const AboutUs = () => {
  const [aboutUsContent, setAboutUsContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFooterContent = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/footer-contents`);
        setAboutUsContent(response.data?.aboutUs || "No content available.");
      } catch (error) {
        console.error("Error fetching About Us content:", error);
        setAboutUsContent("Failed to load About Us content.");
      } finally {
        setLoading(false);
      }
    };

    fetchFooterContent();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative w-full h-80 bg-cover bg-center" style={{ backgroundImage: "url('https://scontent.fdac24-2.fna.fbcdn.net/v/t39.30808-6/480307791_122210736386236477_4605903540606993582_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=sBChQ03BflEQ7kNvgHm95g4&_nc_oc=AdgEojt6P3_Km1nBfWupW_jV1z9B-IBctBwC5dmyOSLk_H9QCDoIKYes_qlCr5AuMYQ&_nc_zt=23&_nc_ht=scontent.fdac24-2.fna&_nc_gid=AjLDysF-29PVUfMWdhjq5Tp&oh=00_AYHnji_c0hPOc_MUqZoE_15tGWcxL7WXCpKtqHYpqArCrg&oe=67D8FCFF')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">About Us</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 lg:px-20 py-12">
        <div className="bg-white shadow-xl rounded-lg p-8 md:p-12">
          {loading ? (
            <p className="text-center text-gray-500 animate-pulse">Loading content...</p>
          ) : (
            <div className="text-gray-700 text-lg leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: aboutUsContent }}></div>
          )}
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="container mx-auto px-6 lg:px-20 pb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-6 md:p-10 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-blue-900">Our Mission</h2>
            <p className="text-gray-600 mt-2">
              To deliver high-quality products and services that exceed customer expectations and drive innovation in our industry.
            </p>
          </div>
          <div className="bg-green-50 p-6 md:p-10 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-green-900">Our Vision</h2>
            <p className="text-gray-600 mt-2">
              To be a global leader in our field, recognized for our commitment to excellence, sustainability, and customer satisfaction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
