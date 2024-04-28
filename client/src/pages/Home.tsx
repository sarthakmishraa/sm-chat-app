import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../config/firebase";

export const Home = () => {
    const [user] = useAuthState(auth);

    return(
        <div className="text-center">
            { user &&
                <h1 className="text-3xl font-bold pt-5">
                    Hi {user?.displayName}
                </h1>
            }
            <h1 className="text-3xl font-bold py-5">Welcome to Chat App</h1>
            <button className="bg-green-200 border-2 border-gray-300 rounded-lg p-1 hover:bg-green-400">
                <Link to="/generateRoom">Make A Room/Join A Room</Link>
            </button>
        </div>
    )
}