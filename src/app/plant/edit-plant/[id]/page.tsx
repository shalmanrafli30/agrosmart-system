import type { Metadata } from "next";
import { Suspense } from "react";
import Back from '../../../Components/backButton';
import EditPlantFormClient from "./editPlantForm";

export const metadata: Metadata = {
    title: "Edit Tanaman",
    description: "AgroSmartSystem Tanaman",
};

interface PlantData {
    pl_id: string;
    dev_id: string;
    pl_name: string;
    pl_desc: string;
    pl_area: string;
    pl_date_planting: string;
    pl_lat: number;
    pl_lon: number;
}

async function fetchPlantData(plantId: string): Promise<PlantData | null> {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
        const response = await fetch(`${API_URL}/api/tanaman/${plantId}`, {
            cache: "no-store", // Pastikan mendapatkan data terbaru
        });

        if (!response.ok) {
            console.error(`Failed to fetch plant data. Status: ${response.status}`);
            return null;
        }

        const result = await response.json();

        // Pastikan mengambil data dari properti "data"
        return result.data as PlantData;
    } catch (error) {
        console.error("Error fetching plant data:", error);
        return null;
    }
}


export default async function EditPlantPage({
    params: asyncParams,
} : {
    params: Promise<{ id: string }>
}) {
    const params = await asyncParams;
    const plantId = params.id;

    const plantData = await fetchPlantData(plantId);

    if (!plantData) {
        return (
            <section>
                <p className="text-red-500 text-center mt-4">
                    Data tanaman dengan ID "{plantId}" tidak ditemukan. Mohon cek ulang ID atau coba lagi lain waktu.
                </p>
            </section>
        )
    }

    return (
        <section>
            <Suspense fallback={<p>Loading...</p>}>
                <EditPlantFormClient plantData={plantData} />
            </Suspense>
        </section>
    )
}

// export default function page() {
//     return(
//         <div className="p-6">
//             {/* <div className="flex space-x-0 items-center">
//                 <MdArrowBackIos className="text-2xl"/>
//                 <h3 className="text-xl font-bold">Tambah Area</h3>
//             </div> */}
//             {/* FORM */}
//             <div className="mt-6 ml-6 bg-abu p-4">
//                 <h3 className="mb-5 text-center font-bold text-xl">Edit Area</h3>
//                 <form action="#" className="max-w-screen-md mx-0 space-y-10">
//                     <div id="idPlant" className="flex space-x-5 items-center mb-2">
//                         <label htmlFor="idPlant" className="text-black text-base font-bold w-32">ID Tanaman</label>
//                         <input type="text" name="idPlant" id="" className="bg-gray-200 border border-abu3 text-black text-sm w-full p-2" value="SITE001" required disabled/>
//                     </div>
//                     <div id="idDevice" className="flex space-x-5 items-center mb-2">
//                         <label htmlFor="idDevice" className="text-black text-base font-bold w-32">ID Device</label>
//                         <input type="text" name="idDevice" id="" className="bg-gray-200 border border-abu3 text-black text-sm w-full p-2" value="SITE001" required disabled/>
//                     </div>
//                     <div id="namaPlant" className="flex space-x-5 items-center mb-2">
//                         <label htmlFor="namaPlant" className="text-black text-base font-bold w-32">Nama Tanaman</label>
//                         <input type="text" name="namaPlant" id="" className="bg-white border border-abu3 text-black text-sm w-full p-2" value="Lingkungan" required/>
//                     </div>
//                     <div id="poktan" className="flex space-x-5 items-center mb-2">
//                         <label htmlFor="poktan" className="text-black text-base font-bold w-32">Poktan</label>
//                         <input type="text" name="poktan" id="" className="bg-white border border-abu3 text-black text-sm w-full p-2" value="Lingkungan" required/>
//                     </div>
//                     <div id="alamat" className="flex space-x-5 items-center mb-2">
//                         <label htmlFor="alamat" className="text-black text-base font-bold w-32">Alamat</label>
//                         <input type="text" name="alamat" id="" className="bg-white border border-abu3 text-black text-sm w-full p-2" value="Lingkungan" required/>
//                     </div>
//                     <div id="plantDateTime" className="flex space-x-5 items-center mb-2">
//                         <label htmlFor="plantDateTime" className="text-black text-base font-bold w-32">Tanggal Tanam</label>
//                         <input type="datetime-local" name="plantDateTime" id="plantDateTime" className="bg-white border border-abu3 text-black text-sm w-full p-2" value="2024-08-08T00:00" required/>
//                     </div>
//                     <div id="lokasi" className="flex space-x-5 items-center mb-2">
//                         <label htmlFor="lokasi" className="text-black text-base font-bold w-32">Lokasi</label>
//                         <select name="lokasi" id="" className="bg-white border border-abu3 text-black text-sm w-full p-2 font-bold" required>
//                             <option value="BPP SELAAWI">BPP SELAAWI</option>
//                         </select>
//                     </div>
//                     <div id="latitude" className="flex space-x-5 items-center mb-2">
//                         <label htmlFor="latitude" className="text-black text-base font-bold w-32">Latitude</label>
//                         <input type="text" name="latitude" id="" className="bg-white border border-abu3 text-black text-sm w-full p-2" value="Lingkungan" required/>
//                     </div>
//                     <div id="longtitude" className="flex space-x-5 items-center mb-2">
//                         <label htmlFor="longtitude" className="text-black text-base font-bold w-32">Longtitude</label>
//                         <input type="text" name="longtitude" id="" className="bg-white border border-abu3 text-black text-sm w-full p-2" value="Lingkungan" required/>
//                     </div>
//                     <div id="aksi" className="space-x-5 mt-6">
//                         <Back route="/plant"/>
//                         <input type="submit" value="Simpan" className="bg-[#F9B300] text-white rounded-md p-3 cursor-pointer hover:bg-kuningCerah"/>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }