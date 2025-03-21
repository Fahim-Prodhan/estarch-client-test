'use client'
import React from "react";

const Location = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative w-full h-80 bg-cover bg-center" style={{ backgroundImage: "url('https://i.ibb.co.com/Hfx7qww6/481044357-122212110230236477-9058567861746781843-n.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Our Location</h1>
        </div>
      </div>

      {/* Contact & Map Section */}
      <div className="container mx-auto px-6 lg:px-20 py-12">
        <div className="bg-white shadow-xl rounded-lg p-8 md:p-12 flex flex-col md:flex-row gap-10">
          {/* Contact Info */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Visit Us</h2>
            <p className="text-gray-700 text-lg">
              Our office is located in a prime location. Click the map below to open in Google Maps.
            </p>

            <div className="space-y-3">
              <p className="flex items-center text-gray-600">
                📍 <span className="ml-2">19/A (Front gate of Masjid E Noor) , Near Abul Hotel, Chowdhury Para,Malibag,Dhaka-1219</span>
              </p>
              <p className="flex items-center text-gray-600">
                📞 <span className="ml-2">01781813939 | 01779994888</span>
              </p>
              <p className="flex items-center text-gray-600">
                ✉️ <span className="ml-2">Estarchbd@gmail.com</span>
              </p>
            </div>
          </div>

          {/* Clickable Google Map */}
          <div className="w-full md:w-1/2">
            <a 
              href="https://maps.app.goo.gl/w5ARQZR92KTu2fz47" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block transition-transform transform hover:scale-105"
            >
              <iframe
                title="Google Map Location"
                className="w-full h-80 rounded-lg shadow-lg"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.762499611792!2d90.41351077537968!3d23.755847278666643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b90065798097%3A0xbe19d56fd5adb0d1!2sEstarch!5e0!3m2!1sen!2sbd!4v1741896124847!5m2!1sen!2sbd"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
