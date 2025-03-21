'use client'
import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faInstagram,
  faFacebook,
  faFacebookMessenger,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import bank_payment_logo from "../../public/images/payment-gateway.eb02d190.png";
import logo from "../../public/images/Logo Png 51.png";
import footer from "../../public/images/footer.jpg";
import Link from "next/link";
import { AuthContext } from "../context/AuthProvider";

export default function Footer() {

  const { globalLoading } = useContext(AuthContext);
  console.log(globalLoading);
  

  if(globalLoading) return 
  

  return (
    <div
      className="bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${footer.src})`,
        backgroundBlendMode: "overlay",
        opacity: 0.9,
      }}
    >
      <div className="bg-black bg-opacity-70 py-6 px-4">
        <footer className="grid grid-cols-1 md:grid-cols-3 gap-6 text-base-content">
          {/* Logo & Contact */}
          <div className="flex flex-col items-center text-center">
            <Image src={logo} alt="Logo" width={200} height={200} className="w-40 md:w-48" />
            <p className="text-lg font-bold mt-2 text-[#B89579]">+8801781813939</p>
            <p className="text-white text-sm mt-1">SUN - SAT, 10:30 AM - 10 PM</p>
            {/* Social Icons */}
            <div className="flex gap-3 mt-3">
              {[
                { href: "https://wa.me/01781813939", icon: faWhatsapp },
                { href: "https://www.instagram.com/estarch.com.bd", icon: faInstagram },
                { href: "https://www.facebook.com/Estarch.com.bd", icon: faFacebook },
                { href: "https://m.me/estarch.com.bd", icon: faFacebookMessenger },
              ].map((item, index) => (
                <Link key={index} href={item.href} target="_blank" rel="noopener noreferrer">
                  <div className="border border-[#B89579] rounded-full h-9 w-9 flex items-center justify-center">
                    <FontAwesomeIcon icon={item.icon} className="text-[#B89579] text-lg" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Information */}
          <nav className="text-center">
            <h6 className="text-xl font-bold text-[#B89579] mb-3">Information</h6>
            <ul className="text-white text-sm space-y-2">
              {["About Us", "Privacy Policy", "Terms & Conditions", "Return Policy", "Location"].map(
                (item, index) => (
                  <li key={index}>
                    <Link href={`/${item.toLowerCase().replace(/\s/g, "-")}`}>{item}</Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          {/* Contact Info */}
          <nav className="text-center">
            <h6 className="text-xl font-bold text-[#B89579] mb-3">Contact Info</h6>
            <p className="text-white text-sm">
              Shop Address - 19/A (Front gate of Masjid E Noor), Near Abul Hotel, Chowdhury Para,
              Malibag, Dhaka-1219
            </p>
            <p className="text-white text-sm mt-2">Estarchbd@gmail.com</p>
            <p className="text-white text-sm mt-1">01781813939 | 01779994888</p>
          </nav>
        </footer>
      </div>
    </div>
  );
}
