import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {

    const user = useSelector((store) => store.user);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
          await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
          dispatch(removeUser());
          return navigate("/login");
        } catch (err) {
          // Error logic maybe redirect to error page
          console.log(err);
        }
    };
    
    return (
        <div class="navbar bg-base-200 shadow-sm">
            <div class="flex-1">
                <Link to="/" class="btn btn-ghost text-xl">Dev Tinder</Link>
            </div>
            <div class="flex gap-2">
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
                            <Link to="/profile" class="justify-between">
                                Profile
                                <span class="badge">New</span>
                            </Link>
                        </li>
                        <li><Link to="/connections">Connections</Link></li>
                        <li>
                            <Link to="/requests">Requests</Link>
                        </li>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavBar;