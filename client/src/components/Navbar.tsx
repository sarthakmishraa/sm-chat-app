import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const signOutUser = async () => {
        await signOut(auth);
        navigate('/');
    }

    return(
        <div className="flex flex-row justify-around py-3 px-2">
            <div className="space-x-5">
                <button className="p-1 border-b-2 border-gray-600 rounded-md shadow-lg bg-green-200 hover:bg-green-400">
                    <Link to="/">Home</Link>
                </button>
                <button className="p-1 border-b-2 border-gray-600 rounded-md shadow-lg bg-green-200 hover:bg-green-400">
                    <Link to="/generateRoom">Get Started</Link>
                </button>
                <button className="p-1 border-b-2 border-gray-600 rounded-md shadow-lg bg-green-200 hover:bg-green-400">
                    <Link to="/chat">Join Room</Link>
                </button>
            </div>
            <div className="space-x-5">
                {
                    !user?(
                        <button className="p-1 border-b-2 border-gray-600 rounded-md shadow-lg bg-green-200 hover:bg-green-400">
                            <Link to="/login">Sign Up</Link>
                        </button>
                    ):(
                        <button onClick={signOutUser} className="p-1 border-b-2 border-gray-600 rounded-md shadow-lg bg-green-200 hover:bg-green-400">
                            Log Out
                        </button>
                    )
                }
            </div>
        </div>
    )
}