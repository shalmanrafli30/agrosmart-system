import { MdDashboard } from "react-icons/md";
import { AiFillDashboard } from "react-icons/ai";
import { Ri24HoursLine } from "react-icons/ri";
import { PiPlantFill } from "react-icons/pi";
import { MdOutlineSensors } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoChatbubbleSharp } from "react-icons/io5";
import { RiPlantFill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { FaLocationDot } from "react-icons/fa6";
import Garis from "../assets/3Garis.svg";
import Silang from "../assets/Silang.svg";
import Link from "next/link"; // Import Link dari Next.js

interface SidebarProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    activePage: string;
    setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen, activePage, setActivePage }) => {
    const pathname = usePathname();

    const Menus = [
        { title: "Dashboard", path: "/dashboard", icon: <MdDashboard /> },
        { title: "Realtime", path: "/realtime", icon: <AiFillDashboard /> },
        { title: "Riwayat", path: "/riwayat", icon: <Ri24HoursLine /> },
        { title: "Lahan", path: "/lahan", icon: <FaLocationDot />, spacing: true  },
        { title: "Tanaman", path: "/plant", icon: <PiPlantFill /> },
        { title: "Sensor", path: "/sensor", icon: <MdOutlineSensors /> },
        { title: "Chatbot", path: "/chatbot", icon: <IoChatbubbleSharp />, spacing: true  },
        { title: "Deteksi Fase Padi", path: "/deteksi-fase-padi", icon: <RiPlantFill /> },
    ];
    const currentPage = Menus.find(menu => pathname.startsWith(menu.path))?.title;

    return (
        <div className={`${open ? "w-72" : "w-20"} h-screen bg-darkCustom duration-300 flex flex-col fixed top-0 left-0`}>
            <div className="px-6">
                {open ? (
                    <Silang className="w-6 py-6 text-white cursor-pointer" onClick={() => setOpen(!open)} />
                ) : (
                    <Garis className="w-8 py-6 text-white cursor-pointer" onClick={() => setOpen(!open)} />
                )}
            </div>

            {/* DAFTAR MENU */}
            <div className="flex-grow">
                <ul className="pt-2">
                    {Menus.map((menu, index) => (
                        <li
                        key={index}
                        className={`items-center cursor-pointer text-white hover:text-primary hover:bg-[#344154] duration-300 py-2 px-6 ${menu.spacing ? "mt-10" : "mt-3"}`}
                        >
                            <Link href={menu.path} passHref>
                                <div className="flex items-center w-full" onClick={() => setActivePage(menu.title)}>
                                    <span className={`block text-3xl ${currentPage === menu.title ? "text-primary" : ""}`}>
                                        {menu.icon}
                                    </span>
                                    <span className={`text-xl font-medium flex ${!open && "hidden"} ${currentPage === menu.title ? "text-primary" : ""} ml-4`}>
                                        {menu.title}
                                    </span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* PROFILE */}
            <div
                className={`items-center cursor-pointer text-white hover:text-primary hover:bg-[#344154] duration-300 py-4 px-6 ${activePage === "Profil" ? "text-primary" : ""}`}
                onClick={() => setActivePage("Profil")}
            >
                <Link href="/profil" passHref>
                    <div className="flex items-center w-full">
                        <span className={`block float-left text-3xl ${activePage === "Profil" ? "text-primary" : ""}`}>
                            <CgProfile />
                        </span>
                        <span className={`text-xl font-medium flex ml-4 ${!open && "hidden"} ${activePage === "Profil" ? "text-primary" : ""}`}>
                            Profil
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;