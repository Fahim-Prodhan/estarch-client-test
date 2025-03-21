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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="relative bg-white p-12 rounded-lg max-w-4xl w-full">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-2xl text-gray-700 hover:text-gray-900 z-50 "
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
                <button className="z-50 custom-prev absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full text-sm">
                    ◀
                </button>
                <button className="z-50 custom-next absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full text-sm">
                    ▶
                </button>
            </div>
        </div>
    );
};

export default ImageModal;
