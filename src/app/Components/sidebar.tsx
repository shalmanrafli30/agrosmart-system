import { MdDashboard } from "react-icons/md";
import { AiFillDashboard } from "react-icons/ai";
import { Ri24HoursLine } from "react-icons/ri";
import { PiMapPinAreaFill } from "react-icons/pi";
import { MdOutlineSensors } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import Garis from "../assets/3Garis.svg";
import Silang from "../assets/Silang.svg";

interface SidebarProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
    const Menus = [
        { title: "Dashboard", icon: <MdDashboard /> },
        { title: "Realtime", icon: <AiFillDashboard />, spacing: true },
        { title: "Riwayat", icon: <Ri24HoursLine /> },
        { title: "Area", icon: <PiMapPinAreaFill />, spacing: true },
        { title: "Sensor", icon: <MdOutlineSensors /> },
    ];

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
                        <li key={index} className={`items-center cursor-pointer text-white hover:text-primary hover:bg-[#344154] duration-200 py-2 px-6 gap-x-4 flex ${menu.spacing ? "mt-10" : "mt-3"}`}>
                            <span className="block float-left text-3xl">
                                {menu.icon}
                            </span>
                            <span className={`text-xl font-medium flex ${!open && "hidden"}`}>{menu.title}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* PROFILE */}
            <div className="items-center cursor-pointer text-white hover:text-primary hover:bg-[#344154] duration-200 py-4 gap-x-4 flex px-6">
                <span className="block float-left text-3xl">
                    <CgProfile />
                </span>
                <span className={`text-xl font-medium flex ${!open && "hidden"}`}>Profil</span>
            </div>
        </div>
    );
};

export default Sidebar;