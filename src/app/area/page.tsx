import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Area",
    description: "AgroSmartSystem Area",
};

export default function page() {
    return (
        <div className="p-6">
            <h3>Area</h3>
        </div>
    )
}