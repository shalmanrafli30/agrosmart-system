'use client'

import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="flex h-screen bg-gray-900">
            {/* Kiri: Deskripsi */}
            <div
                className="w-1/2 bg-cover bg-center relative"
                style={{ backgroundImage: "url('/assets/img/sawah.jpg')" }}
            >
                <div className="absolute inset-0 bg-teal-800 bg-opacity-60 flex items-center justify-center p-10">
                    <div className="text-white max-w-lg text-center">
                        <h1 className="text-3xl font-bold mb-4">KawalTani</h1>
                        <p className="text-md leading-relaxed">
                            KawalTani adalah aplikasi berbasis web yang dikembangkan untuk mendukung pemantauan pertanian berbasis Digital Twin. Aplikasi ini menyediakan informasi real-time terkait lokasi, kondisi tanaman, dan kondisi lahan, serta memberikan peringatan dan rekomendasi tindakan. Dengan fitur visualisasi pola dan tren data, KawalTani dirancang untuk membantu petani dalam pengelolaan lahan secara lebih efisien dan berbasis data.
                        </p>
                    </div>
                </div>
            </div>

            {/* Kanan: Form Login */}
            <div className="w-1/2 bg-white flex items-center justify-center p-10">
                <div className="w-full max-w-md">
                    <h2 className="text-4xl text-center font-bold mb-6 text-gray-800">
                        Hai! Selamat datang di KawalTani
                    </h2>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1" htmlFor="username">
                                Nama Pengguna
                            </label>
                            <input
                                id="username"
                                type="text"
                                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        {/* Kata Sandi dengan toggle icon */}
                        <div className="mb-6 relative">
                            <label className="block text-gray-700 mb-1" htmlFor="password">
                                Kata Sandi
                            </label>
                            <div className='relative'>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                                    aria-label={showPassword ? "Sembunyikan kata sandi" : "Lihat kata sandi"}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full font-bold bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition duration-200"
                            >
                            MASUK
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
