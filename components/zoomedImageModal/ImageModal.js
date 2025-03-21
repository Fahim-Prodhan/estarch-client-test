import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import Image from "next/image";
import baseUrl from "../services/baseUrl";
import { Navigation, Pagination, Zoom } from "swiper/modules";

const ImageModal = ({ isOpen, onClose, images, initialIndex }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
            <div className="relative w-screen h-screen">
                <button
                    onClick={onClose}
                    className="z-50 custom-next absolute right-2 top-24 transform -translate-y-1/2 bg-white text-black p-2 rounded- text-sm"
                >
                    &times;
                </button>
                <Swiper
                    modules={[Navigation, Pagination, Zoom]}
                    navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
                    pagination={{ clickable: true }}
                    zoom
                    loop={true}
                    initialSlide={initialIndex}
                    className="w-full h-full"
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <div className="swiper-zoom-container">
                                <Image
                                    height={500}
                                    width={500}
                                    src={`${baseUrl}/${img}`}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full h-auto"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation Buttons */}
                <button className="z-50 custom-prev absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 text-sm">
                    ◀
                </button>
                <button className="z-50 custom-next absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded- text-sm">
                    ▶
                </button>

            </div>
        </div>
    );
};

export default ImageModal;