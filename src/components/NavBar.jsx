import { useSelector } from "react-redux";

const NavBar = () => {

    const user = useSelector((store) => store.user);
    console.log(user);
    return (
        <div class="navbar bg-base-200 shadow-sm">
            <div class="flex-1">
                <a class="btn btn-ghost text-xl">Dev Tinder</a>
            </div>
            <div class="flex gap-2">
                {/* <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" /> */}
                <div class="dropdown dropdown-end mx-5">
                    {user &&
                        
                        <div className="flex items-center gap-2">   
                            <p className="text-sm font-medium">Welcome, {user.firstName}</p>
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div class="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src={user.photoUrl} />
                                </div>
                            </div>
                        </div>
                    }
                    <ul
                        tabindex="0"
                        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <a class="justify-between">
                                Profile
                                <span class="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavBar;