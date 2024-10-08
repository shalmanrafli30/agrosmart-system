import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Realtime",
    description: "AgroSmartSystem Realtime",
};

export default function Realtime() {
    return (
        <div className="p-6">
            <div className="bg-gray-600 flex-grow-[3] h-[500px] rounded-xl max-w-screen-2xl"></div>
        </div>
    )
}