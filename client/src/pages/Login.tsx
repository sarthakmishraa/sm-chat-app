import { provider, auth } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import icon from "../media/icon.png";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result);
            navigate("/generateRoom");
        }
        catch (error) {
            console.log(error);
        }
    }
    return(
        <div className="text-center">
            <h1 className="text-2xl font-semibold py-5">Login Page</h1>
            <div className="flex justify-center">
                <button onClick={signInWithGoogle} className="flex flex-row items-center border-2 border-gray-700 p-1 rounded-3xl hover:bg-gray-200">
                    <img className="w-8 mr-1" src={icon} alt="" />
                    Sign in with Google
                </button>
            </div>
        </div>
    )
}