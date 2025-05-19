import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const navLiks = [
    {name:'Dashboard', path:'/owner/dashboard', icon:assets.dashboardIcon},
    {name:'Add Room', path:'/owner/add-room', icon:assets.addIcon},
    {name:'List Room', path:'/owner/list-room', icon:assets.listIcon},
];

function Sidebar(){
    return (
        <div className="h-full w-[20%] lg:w-[15%] border-r-2 border-gray-300/50">
            <nav>
                <ul>
                    {
                        navLiks.map(link => (
                            <li key={link.name}>
                                <NavLink className={({isActive}) => `flex gap-1 w-full py-3 px-3 sm:px-5 hover:bg-blue-100 ${isActive && 'bg-blue-300/70 text-blue-500 border-r-4 border-blue-500'}`} to={link.path}><img className="inline-block min-h-4 min-w-4" src={link.icon} alt={link.name} /><span className={`hidden sm:block`}>{link.name}</span></NavLink>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;