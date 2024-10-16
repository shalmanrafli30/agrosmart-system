import type { Metadata } from "next";
import AddArea from '../Components/AddButton';
import EditArea from '../Components/editData';
import Edit from '../assets/Edit.svg';
import Hapus from '../assets/Hapus.svg';

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
            <AddArea route="/area/tambah-area" title="Tambah Area"/>
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
                                <td className="px-6 py-4 border-r-2 border-abu3 w-2">
                                    <div className="flex space-x-2">
                                        {/* <Edit className="cursor-pointer text-[#F9B300] hover:text-kuningCerah"/> */}
                                        <EditArea route="/area/edit-area"/>
                                        <Hapus className="cursor-pointer text-warningSecondary hover:text-warning"/>
                                    </div>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}