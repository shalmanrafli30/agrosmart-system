import type { Metadata } from "next";
import Chart from '../Components/Chart';
import Site from "../Components/dropdownSite";

export const metadata: Metadata = {
    title: "Riwayat",
    description: "AgroSmartSystem Realtime",
};

export default function page() {
    return (
        <div className="p-6">
            <div className="flex justify-between items-center w-full mb-4">
                {/* <Site /> */}
                <span className="text-right">Update Terakhir: 16/10/2024 21:35 PM</span>
            </div>
            <div className="mb-6 text-left">
                <form className="max-w-fit">
                    <div className="flex mb-4 w-fit">
                        <span className="inline-flex items-center px-3 text-sm text-black font-semibold bg-primary border border-e-0 border-primary rounded-s-md">
                            Area:
                        </span>
                        <select name="area" id="area" className="rounded-none rounded-e-lg bg-white border border-primary text-black block flex-1 min-w-0 w-full text-sm p-2.5 focus:ring-transparent">
                            <option value="Lingkungan">Lingkungan</option>
                            <option value="Padi">Sensor 1</option>
                            <option value="Padi">Sensor 2</option>
                        </select>
                    </div>
                    <div className="flex items-center space-x-5 mb-4">
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-black font-semibold bg-primary border border-e-0 border-primary rounded-s-md">
                                Dari:
                            </span>
                            <input type="datetime-local" name="dari" id="" className="rounded-none rounded-e-lg bg-white border border-primary text-black block flex-1 min-w-0 w-full text-sm p-2.5 focus:ring-transparent"/>
                        </div>
                        <span className="font-bold text-2xl">-</span>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-black font-semibold bg-primary border border-e-0 border-primary rounded-s-md">
                                Ke:
                            </span>
                            <input type="datetime-local" name="dari" id="" className="rounded-none rounded-e-lg bg-white border border-primary text-black block flex-1 min-w-0 w-full text-sm p-2.5 focus:ring-transparent"/>
                        </div>
                    </div>
                    <input type="submit" value="Kirim" className="bg-primary text-black font-semibold text-sm rounded-md p-3 cursor-pointer hover:bg-secondary w-2/12"/>
                </form>
            </div>
            <Chart />
        </div>
    )
}
