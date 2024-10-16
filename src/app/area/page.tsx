import type { Metadata } from "next";
import AddArea from '../Components/AddArea';
import edit from '../assets/Edit.svg';
import hapus from '../assets/Hapus.svg';

export const metadata: Metadata = {
    title: "Area",
    description: "AgroSmartSystem Area",
};

export default function page() {
    return (
        <div className="p-6">
            {/* <div className="text-end my-6">
                <span className="bg-primary text-white p-4 rounded-md text-lg font-bold hover:bg-secondary cursor-pointer">Tambah Area</span>
            </div> */}
            <AddArea />
            {/* Table */}
            <div>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-base text-left rtl:text-right text-gray-500">
                        <thead className="text-base text-black uppercase bg-abu2 border-2 border-abu3">
                            <tr>
                                <th scope="col" className="px-6 py-3 border-r-2 border-abu3">
                                    ID Area
                                </th>
                                <th scope="col" className="px-6 py-3 border-r-2 border-abu3">
                                    Lokasi
                                </th>
                                <th scope="col" className="px-6 py-3 border-r-2 border-abu3">
                                    Area
                                </th>
                                <th scope="col" className="px-6 py-3 border-r-2 border-abu3">
                                    Tipe
                                </th>
                                <th scope="col" className="px-6 py-3 border-r-2 border-abu3">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-2 border-abu3 text-black">
                                <th scope="row" className="px-6 py-4 border-r-2 border-abu3 font-normal">
                                    SITE001
                                </th>
                                <td className="px-6 py-4 border-r-2 border-abu3">
                                    BPP SELAAWI
                                </td>
                                <td className="px-6 py-4 border-r-2 border-abu3">
                                    Lingkungan
                                </td>
                                <td className="px-6 py-4 border-r-2 border-abu3">
                                    env
                                </td>
                                <td className="px-6 py-4 border-r-2 border-abu3">
                                    Aksi
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}