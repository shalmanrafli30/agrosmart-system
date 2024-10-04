import { useState } from "react";
import Garis from "../assets/3Garis.svg" ;

export default function Sidebar() {
    // const [open, setOpen] = useState(true);
    return(
        <div className="flex">
            <div className="w-72 h-screen bg-black px-6">
                {/* <img src="/3Garis.svg" alt="Menu Icon" className="w-8 h-8" /> */}
                <Garis />
                <h3 className="text-white py-6">Tes</h3>
            </div>
        </div>
    )
} 