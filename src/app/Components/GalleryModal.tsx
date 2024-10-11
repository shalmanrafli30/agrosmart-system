// src/app/Components/FloatingGallery.tsx
'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.min.css'; // Import the bundle CSS
import 'swiper/css'; // Import core styles
import { IoMdClose } from 'react-icons/io';
import { IoMdPhotos } from "react-icons/io";

const images = [
    '/assets/img/Lahan/Lahan3.jpg',
    '/assets/img/Lahan/Lahan2.jpg',
    '/assets/img/Lahan/Lahan.jpg'
];

const FloatingGallery = () => {
    const [showGallery, setShowGallery] = useState(false);

    const toggleGallery = () => {
        setShowGallery(!showGallery);
    };

    return (
        <>
        <div
            onClick={toggleGallery}
            className="p-2 bg-abu text-white bg-opacity-40 rounded-full absolute right-4 top-4 cursor-pointer hover:bg-primary hover:text-black duration-150"
        >
            <IoMdPhotos className="w-7 h-auto" />
        </div>

        {/* Floating Card (Gallery Modal) */}
        {showGallery && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-xl p-4 w-[80%] h-[70%] relative">
                    <button
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full"
                    onClick={toggleGallery}
                    >
                        <IoMdClose />
                    </button>
                    {/* Image Slider */}
                    <div className='mt-10'>
                        <Swiper spaceBetween={10} slidesPerView={3} onSlideChange={() => console.log('slide change')} onSwiper={(swiper) => console.log(swiper)}>
                            {images.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <img src={image} alt={`Lahan ${index + 1}`} className="w-full h-[400px] object-cover rounded-lg" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        )}
        </>
    );
};

export default FloatingGallery;
