'use client'
import { useState } from 'react'

// Tipe hasil deteksi dari API
type FaseKey = 'fase_v1' | 'fase_v2' | 'fase_g1' | 'fase_g2'

type ResultType = {
    fase?: FaseKey
    error?: string
}

// Mapping rekomendasi berdasarkan fase
const rekomendasiPemupukan: Record<FaseKey, string> = {
    fase_v1: 'Gunakan pupuk NPK seimbang.',
    fase_v2: 'Tambah pupuk nitrogen.',
    fase_g1: 'Gunakan pupuk kalium.',
    fase_g2: 'Kurangi pupuk, fokus pada air.',
}

const rekomendasiHama: Record<FaseKey, string> = {
    fase_v1: 'Pantau wereng dan penggerek batang.',
    fase_v2: 'Waspada ulat dan hama daun.',
    fase_g1: 'Walang sangit saat malai terbentuk.',
    fase_g2: 'Cegah serangan tikus dan burung.',
}

export default function Page() {
    const [image, setImage] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [result, setResult] = useState<ResultType | null>(null)
    const [loading, setLoading] = useState(false)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setImage(file)
        setPreview(URL.createObjectURL(file))
        setResult(null)
    }

    const handleUpload = async () => {
        if (!image) return
        setLoading(true)
        const formData = new FormData()
        formData.append('file', image)

        try {
            const res = await fetch('http://127.0.0.1:8080/deteksi-fase/', {
            method: 'POST',
            body: formData,
            })
            const data = await res.json()
            setResult(data)
        } catch (err) {
            setResult({ error: 'Gagal menghubungi server' })
        } finally {
            setLoading(false)
        }
    }

    const handleReset = () => {
        setImage(null)
        setPreview(null)
        setResult(null)
    }

    const getFaseLabel = (faseKey: FaseKey | undefined) => {
        switch (faseKey) {
            case 'fase_v1': return 'Fase Vegetatif Awal (V1)'
            case 'fase_v2': return 'Fase Vegetatif Akhir (V2)'
            case 'fase_g1': return 'Fase Reproduktif (G1)'
            case 'fase_g2': return 'Fase Pematangan (G2)'
            default: return '-'
    }
    }

    return (
        <div className="px-6 py-10">
            <div className="grid grid-cols-4 gap-3 h-screen">
                <div className="bg-abu p-6 rounded-xl overflow-y-scroll col-span-1">
                    <h3 className="font-bold text-2xl text-black text-center mb-6">Fase Pertumbuhan</h3>
                    {/* 1 */}
                    <div className="bg-white rounded-md overflow-hidden mb-3">
                        <div className="overflow-hidden w-full bg-blue-300 mb-4">
                            <img src="assets/img/deteksi-fase/v1.jpg" alt="Fase Vegetatif Awal (V1)" className="object-cover object-center w-full h-40"/>
                        </div>
                        <div className="text-center px-4 pb-4">
                            <h3 className="font-bold text-md mb-3">Fase Vegetatif Awal (V1)</h3>
                            <span className="text-sm">Tanaman mulai tumbuh daun dan akar dengan pesat (0-35 hari)</span>
                        </div>
                    </div>
                    {/* 2 */}
                    <div className="bg-white rounded-md overflow-hidden mb-3">
                        <div className="overflow-hidden w-full bg-blue-300 mb-4">
                            <img src="assets/img/deteksi-fase/v2.jpg" alt="Fase Vegetatif Awal (V1)" className="object-cover object-center w-full h-40"/>
                        </div>
                        <div className="text-center px-4 pb-4">
                            <h3 className="font-bold text-md mb-3">Fase Vegetatif Akhir (V2)</h3>
                            <span className="text-sm">Tunas baru dan daun bertambah (35-55 hari)</span>
                        </div>
                    </div>
                    {/* 3 */}
                    <div className="bg-white rounded-md overflow-hidden mb-3">
                        <div className="overflow-hidden w-full bg-blue-300 mb-4">
                            <img src="assets/img/deteksi-fase/g1.jpg" alt="Fase Vegetatif Awal (V1)" className="object-cover object-center w-full h-40"/>
                        </div>
                        <div className="text-center px-4 pb-4">
                            <h3 className="font-bold text-md mb-3">Fase Reproduktif (G1)</h3>
                            <span className="text-sm">Malai mulai terbentuk, penting menuju pembungaan (55-58 hari)</span>
                        </div>
                    </div>
                    {/* 4 */}
                    <div className="bg-white rounded-md overflow-hidden mb-3">
                        <div className="overflow-hidden w-full bg-blue-300 mb-4">
                            <img src="assets/img/deteksi-fase/g2.jpg" alt="Fase Vegetatif Awal (V1)" className="object-cover object-center w-full h-40"/>
                        </div>
                        <div className="text-center px-4 pb-4">
                            <h3 className="font-bold text-md mb-3">Fase Pematangan (G2)</h3>
                            <span className="text-sm">Gabah menguning, persiapan panen (85+ hari)</span>
                        </div>
                    </div>
                </div>

                {/* Form Upload */}
                <div className="bg-abu p-6 rounded-xl col-span-2 flex flex-col items-center">
                    <h3 className="font-bold text-2xl text-black text-center mb-6">🌾 Unggah Gambar 🌾</h3>

                    <div className="bg-white w-full border-2 border-dashed border-gray-400 rounded-lg p-8 flex flex-col items-center justify-center text-center h-80">
                        {preview ? (
                            <img src={preview} className="max-h-full object-cover rounded-lg" />
                        ) : (
                            <>
                                <label htmlFor="upload" className="cursor-pointer">
                                    <div className="bg-primary text-white px-6 py-2 rounded-md shadow-md font-semibold flex items-center gap-2 hover:bg-secondary transition">
                                        <span>📷</span> Pilih Gambar
                                    </div>
                                    <input id="upload" type="file" onChange={handleImageChange} className="hidden" />
                                </label>
                                <p className="mt-5 text-gray-500 text-sm w-3/4">
                                    Unggah gambar sawah untuk dideteksi fase pertumbuhannya 🌱
                                </p>
                            </>
                        )}
                    </div>

                    <div className="flex justify-center gap-3 mt-6">
                        <button
                            onClick={handleUpload}
                            disabled={!image || loading || result !== null}
                            className={`px-6 py-2 rounded-md text-white font-semibold ${
                            !image || loading || result !== null
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-primary hover:bg-secondary'
                            }`}
                        >
                            {loading ? 'Mengirim...' : 'Kirim'}
                        </button>

                        {preview && (
                            <button
                            onClick={handleReset}
                            className="px-6 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                            >
                            Ganti
                            </button>
                        )}
                    </div>
                </div>

                {/* Output Deteksi */}
                <div className="bg-abu p-6 rounded-xl flex flex-col gap-4">
                    <h3 className="font-bold text-2xl text-black text-center">Hasil Deteksi</h3>
                    <div className="p-4 rounded-md text-center h-auto bg-primary text-white font-bold text-xl">
                        {result?.fase ? getFaseLabel(result.fase) : '-'}
                    </div>

                    <h3 className="font-bold text-2xl text-black text-center mt-4">Rekomendasi</h3>

                    <div className="bg-white rounded-md p-4 text-center">
                        <h3 className="font-bold text-base mb-2">Pemupukan:</h3>
                        <span className="text-base">{result?.fase ? rekomendasiPemupukan[result.fase] : '-'}</span>
                    </div>

                    <div className="bg-white rounded-md p-4 text-center">
                        <h3 className="font-bold text-base mb-2">Penanganan Hama:</h3>
                        <span className="text-base">{result?.fase ? rekomendasiHama[result.fase] : '-'}</span>
                    </div>

                    {result?.error && (
                        <p className="text-red-500 text-center text-sm mt-2">{result.error}</p>
                    )}
                </div>
            </div>
        </div>
    )
}
