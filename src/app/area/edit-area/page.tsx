import type { Metadata } from "next";
import { MdArrowBackIos } from "react-icons/md";
import Back from '../../Components/backButton';

export const metadata: Metadata = {
    title: "Edit Area",
    description: "AgroSmartSystem Area",
};

export default function page() {
    return(
        <div className="p-6">
            {/* <div className="flex space-x-0 items-center">
                <MdArrowBackIos className="text-2xl"/>
                <h3 className="text-xl font-bold">Tambah Area</h3>
            </div> */}
            {/* FORM */}
            <div className="mt-6 ml-6 bg-abu p-4">
                <h3 className="mb-5 text-center font-bold text-xl">Edit Area</h3>
                <form action="#" className="max-w-screen-md mx-0 space-y-10">
                    <div id="idArea" className="flex space-x-5 items-center mb-2">
                        <label htmlFor="idArea" className="text-black text-base font-bold w-32">ID</label>
                        <input type="text" name="idArea" id="" className="bg-white border border-abu3 text-black text-sm w-full p-2" value="SITE001" required/>
                    </div>
                    <div id="namaArea" className="flex space-x-5 items-center mb-2">
                        <label htmlFor="namaArea" className="text-black text-base font-bold w-32">Nama Area</label>
                        <input type="text" name="namaArea" id="" className="bg-white border border-abu3 text-black text-sm w-full p-2" value="Lingkungan" required/>
                    </div>
                    <div id="lokasi" className="flex space-x-5 items-center mb-2">
                        <label htmlFor="lokasi" className="text-black text-base font-bold w-32">Lokasi</label>
                        <select name="lokasi" id="" className="bg-white border border-abu3 text-black text-sm w-full p-2 font-bold" required>
                            <option value="BPP SELAAWI">BPP SELAAWI</option>
                        </select>
                    </div>
                    <div id="tipe" className="flex space-x-5 items-center mb-2">
                        <label htmlFor="tipe" className="text-black text-base font-bold w-32">Tipe</label>
                        <select name="tipe" id="" className="bg-white border border-abu3 text-black text-sm w-full p-2 font-bold" required>
                            <option value="env">env</option>
                            <option value="soil">soil</option>
                        </select>
                    </div>
                    <div id="aksi" className="space-x-5 mt-6">
                        <Back route="/area"/>
                        <input type="submit" value="Simpan" className="bg-[#F9B300] text-white rounded-md p-3 cursor-pointer hover:bg-kuningCerah"/>
                    </div>
                </form>
            </div>
        </div>
    )
}