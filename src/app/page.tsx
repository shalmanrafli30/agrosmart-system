import type { Metadata } from "next";
import { useState } from "react";
import IndikatorSuhu from "./Components/indikator/indikatorSuhu";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "AgroSmartSystem Dashboard",
};

export const indikator = [
  {suhu: 19},
]

export default function HomePage() {
  return (
    <div className="p-6">
      <div className="flex gap-2">
        <div className="bg-gray-600 flex-grow-[3] h-[500px] rounded-xl w-1/2"></div>
        <div className="flex-grow">
          {/* All sections wrapped in a single column container with gap */}
          <div className="flex flex-col gap-y-2">
            {/* Tanaman & Umur Tanam - SECTION 1 */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex-grow bg-abu p-2 rounded-md">
                <h5 className="mb-5 font-medium">Tanaman</h5>
                <span className="font-bold text-xl">Padi Hibrida</span>
              </div>
              <div className="flex-grow bg-abu p-2 rounded-md">
                <h5 className="mb-5 font-medium">Umur Tanam</h5>
                <span className="font-bold text-xl">46 HST</span>
              </div>
            </div>

            {/* Tanggal Tanam - SECTION 2 */}
            <div className="bg-abu p-2 rounded-md">
              <h5 className="mb-5 font-medium">Tanggal Tanam</h5>
              <span className="font-bold text-xl">2024-08-08 07:00:00</span>
            </div>
            
            {/* Fase Tanam - SECTION 3 */}
            <div className="bg-abu p-2 rounded-md">
              <h5 className="mb-5 font-medium">Fase Tanam</h5>
              <span className="font-bold text-xl">Fase 4</span>
            </div>
            
            {/* Waktu Panen - SECTION 4 */}
            <div className="bg-primary p-2 rounded-md text-white">
              <h5 className="mb-7 font-medium">Waktu Menuju Panen</h5>
              <span className="font-bold text-xl">52 Hari</span>
            </div>
          </div>
        </div>
      </div>
      {/* Indikator */}
      <div className="flex gap-2 mt-2">
        <div className="grid grid-cols-2 gap-2 flex-grow">
          {/* Indikator 1 */}
          <IndikatorSuhu suhu={indikator[0].suhu}/>
          {/* Indikator 2 */}
          <IndikatorSuhu suhu={indikator[0].suhu}/>
        </div>
        <div className="bg-abu flex-grow-[2]"></div>
      </div>
    </div>


  );
}
