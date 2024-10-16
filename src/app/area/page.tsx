import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Area",
    description: "AgroSmartSystem Area",
};

export default function page() {
    return (
        <div className="p-6">
            <div className="text-end mt-6">
                <span className="bg-primary text-white p-4 rounded-md text-lg font-bold hover:bg-secondary cursor-pointer">Tambah Area</span>
            </div>
            {/* Table */}
            
        </div>
    )
}