import type { Metadata } from "next";
import Back from '../../Components/backButton';

export const metadata: Metadata = {
    title: "Edit Sensor",
    description: "AgroSmartSystem Area",
};

export default function page() {
    return(
        <div className="p-6">
            {/* FORM */}
            <div className="mt-6 ml-6 bg-abu p-4">
                <h3 className="mb-5 text-center font-bold text-xl">Edit Sensor</h3>
                <form action="#" className="max-w-screen-md mx-0 space-y-10">
                    <div id="idArea" className="flex space-x-5 items-center mb-2">
                        <label htmlFor="idArea" className="text-black text-base font-bold w-32">ID</label>
                        <input type="text" name="idArea" id="" className="bg-white border border-abu3 text-black text-sm w-full p-2" value="hum" required/>
                    </div>
                    <div id="labelSensor" className="flex space-x-5 items-center mb-2">
                        <label htmlFor="labelSensor" className="text-black text-base font-bold w-32">Label</label>
                        <input type="text" name="labelSensor" id="" className="bg-white border border-abu3 text-black text-sm w-full p-2" value="Kelembapan Lingkungan" required/>
                    </div>
                    <div id="simbolSensor" className="flex space-x-5 items-center mb-2">
                        <label htmlFor="simbolSensor" className="text-black text-base font-bold w-32">Simbol</label>
                        <input type="text" name="simbolSensor" id="" className="bg-white border border-abu3 text-black text-sm w-full p-2" value="%" required/>
                    </div>
                    <div id="lokasi" className="flex space-x-5 items-center mb-2">
                        <label htmlFor="lokasi" className="text-black text-base font-bold w-32">Lokasi</label>
                        <select name="lokasi" id="" className="bg-white border border-abu3 text-black text-sm w-full p-2 font-bold" required>
                            <option value="Lingkungan">BPP SELAAWI - Lingkungan</option>
                            <option value="Lahan Padi">BPP SELAAWI - Lahan Padi</option>
                        </select>
                    </div>
                    <div id="status" className="flex space-x-5 items-center mb-2">
                        <label htmlFor="status" className="text-black text-base font-bold w-32">Lokasi</label>
                        <select name="status" id="" className="bg-white border border-abu3 text-black text-sm w-full p-2 font-bold" required>
                            <option value="Aktif">Aktif</option>
                            <option value="Aktif">Tidak Aktif</option>
                        </select>
                    </div>
                    <div id="BatasAtasSensor" className="flex space-x-5 items-center mb-2">
                        <label htmlFor="BatasAtasSensor" className="text-black text-base font-bold w-32">Batas Normal Atas</label>
                        <input type="text" name="BatasAtasSensor" id="" className="bg-white border border-abu3 text-black text-sm w-full p-2" value="70" required/>
                    </div>
                    <div id="BatasBawahSensor" className="flex space-x-5 items-center mb-2">
                        <label htmlFor="BatasBawahSensor" className="text-black text-base font-bold w-32">Batas Normal Bawah</label>
                        <input type="text" name="BatasBawahSensor" id="" className="bg-white border border-abu3 text-black text-sm w-full p-2" value="50" required/>
                    </div>
                    <div id="aksi" className="space-x-5 mt-6">
                        <Back route="/sensor"/>
                        <input type="submit" value="Simpan" className="bg-[#F9B300] text-white rounded-md p-3 cursor-pointer hover:bg-kuningCerah"/>
                    </div>
                </form>
            </div>
        </div>
    )
}