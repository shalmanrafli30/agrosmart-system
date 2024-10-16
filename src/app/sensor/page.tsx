import type { Metadata } from "next";
import AddSensor from '../Components/AddButton';
import EditArea from '../Components/editData';
import Hapus from '../assets/Hapus.svg';

export const metadata: Metadata = {
    title: "Sensor",
    description: "AgroSmartSystem Area",
};

export default function page() {
    return (
        <div className="p-6">
            <AddSensor route="/sensor/tambah-sensor" title="Tambah Sensor"/>
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
                                    Label
                                </th>
                                <th scope="col" className="px-6 py-3 border-r-2 border-abu3">
                                    Simbol
                                </th>
                                <th scope="col" className="px-6 py-3 border-r-2 border-abu3">
                                    Lokasi
                                </th>
                                <th scope="col" className="px-6 py-3 border-r-2 border-abu3">
                                    Area
                                </th>
                                <th scope="col" className="px-6 py-3 border-r-2 border-abu3">
                                    Batas Normal Atas
                                </th>
                                <th scope="col" className="px-6 py-3 border-r-2 border-abu3">
                                    Batas Normal Bawah
                                </th>
                                <th scope="col" className="px-6 py-3 border-r-2 border-abu3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 border-r-2 border-abu3">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-2 border-abu3 text-black">
                                <th scope="row" className="px-6 py-4 border-r-2 border-abu3 font-normal">
                                    hum
                                </th>
                                <td className="px-6 py-4 border-r-2 border-abu3">
                                    Kelembapan Lingkungan
                                </td>
                                <td className="px-6 py-4 border-r-2 border-abu3 w-4">
                                    %
                                </td>
                                <td className="px-6 py-4 border-r-2 border-abu3">
                                    BPP SELAAWI
                                </td>
                                <td className="px-6 py-4 border-r-2 border-abu3">
                                    Lingkungan
                                </td>
                                <td className="px-6 py-4 border-r-2 border-abu3 w-48">
                                    70
                                </td>
                                <td className="px-6 py-4 border-r-2 border-abu3 w-48">
                                    50
                                </td>
                                <td className="px-6 py-4 border-r-2 border-abu3">
                                    Aktif
                                </td>
                                <td className="px-6 py-4 border-r-2 border-abu3 w-2">
                                    <div className="flex space-x-2">
                                        {/* <Edit className="cursor-pointer text-[#F9B300] hover:text-kuningCerah"/> */}
                                        <EditArea route="/sensor/edit-sensor"/>
                                        <Hapus className="cursor-pointer text-warningSecondary hover:text-warning"/>
                                    </div>
                                </td>
                            </tr>
                            <tr className="bg-white border-2 border-abu3 text-black">
                                <th scope="row" className="px-6 py-4 border-r-2 border-abu3 font-normal">
                                    ilum
                                </th>
                                <td className="px-6 py-4 border-r-2 border-abu3">
                                    Kecerahan
                                </td>
                                <td className="px-6 py-4 border-r-2 border-abu3 w-4">
                                    L
                                </td>
                                <td className="px-6 py-4 border-r-2 border-abu3">
                                    BPP SELAAWI
                                </td>
                                <td className="px-6 py-4 border-r-2 border-abu3">
                                    Lingkungan
                                </td>
                                <td className="px-6 py-4 border-r-2 border-abu3 w-48">
                                    150
                                </td>
                                <td className="px-6 py-4 border-r-2 border-abu3 w-48">
                                    50
                                </td>
                                <td className="px-6 py-4 border-r-2 border-abu3">
                                    Aktif
                                </td>
                                <td className="px-6 py-4 border-r-2 border-abu3 w-2">
                                    <div className="flex space-x-2">
                                        {/* <Edit className="cursor-pointer text-[#F9B300] hover:text-kuningCerah"/> */}
                                        <EditArea route="/sensor/edit-sensor"/>
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