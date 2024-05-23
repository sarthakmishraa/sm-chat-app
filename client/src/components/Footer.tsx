import { Link } from "react-router-dom";

export const Footer = () => {
    return(
        <div className="bg-green-200 px-2 pt-2 pb-4 flex flex-col md:flex-row md:justify-around fixed bottom-0 w-[100%]">
            <div>
                <h1 className="font-bold text-xl">
                    Chat App
                </h1>
            </div>
            <div className="text-center">   
                <h1 className="text-md font-semibold pb-3">
                    My Other Projects
                </h1>
                <div className="grid grid-cols-3 space-x-2 space-y-2">
                    <div className="bg-green-500 border-b-2 shadow-xl border-black rounded-lg p-1 space-x-5">
                        <p className="font-semibold">SM Chat App(This Project)</p>
                        <Link className="font-bold underline hover:text-gray-100" to="" target="_blank">GitHub</Link>
                        <Link className="font-bold underline hover:text-gray-100" to="" target="_blank">Live</Link>
                    </div>
                    <div className="bg-green-500 border-b-2 shadow-xl border-black rounded-lg p-1 space-x-5">
                        <p className="font-semibold">SM Social Media</p>
                        <Link className="font-bold underline hover:text-gray-100" to="https://github.com/sarthakmishraa/social-media-app" target="_blank">GitHub</Link>
                        <Link className="font-bold underline hover:text-gray-100" to="https://sm-socialmedia.netlify.app/" target="_blank">Live</Link>
                    </div>
                    <div className="bg-green-500 border-b-2 shadow-xl border-black rounded-lg p-1 space-x-5">
                        <p className="font-semibold">Career Crafter</p>
                        <Link className="font-bold underline hover:text-gray-100" to="https://github.com/sarthakmishraa/career-crafter" target="_blank">GitHub</Link>
                        <Link className="font-bold underline hover:text-gray-100" to="https://atsmatch.streamlit.app/" target="_blank">Live</Link>
                    </div>
                    <div className="bg-green-500 border-b-2 shadow-xl border-black rounded-lg p-1 space-x-5">
                        <p className="font-semibold">SM Sec</p>
                        <Link className="font-bold underline hover:text-gray-100" to="https://github.com/sarthakmishraa/SM_SEC" target="_blank">GitHub</Link>
                        <Link className="font-bold underline hover:text-gray-100" to="https://smsec.netlify.app/" target="_blank">Live</Link>
                    </div>
                    <div className="bg-green-500 border-b-2 shadow-xl border-black rounded-lg p-1 space-x-5">
                        <p className="font-semibold">Fluence</p>
                        <Link className="font-bold underline hover:text-gray-100" to="https://github.com/sarthakmishraa/fluence" target="_blank">GitHub</Link>
                        <Link className="font-bold underline hover:text-gray-100" to="https://flu-ence.netlify.app/" target="_blank">Live</Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col space-y-3">
                <h1 className="font-semibold text-md">Contact Me</h1>
                <Link className="font-bold underline hover:text-gray-100" to="mailto:mishra23@buffalo.edu" target="_blank">Email</Link>
                <Link className="font-bold underline hover:text-gray-100" to="https://www.linkedin.com/in/sarthakmishraa/" target="_blank">My LinkedIn</Link>
                <Link className="font-bold underline hover:text-gray-100" to="https://github.com/sarthakmishraa" target="_blank">My GitHub</Link>
                <Link className="font-bold underline hover:text-gray-100" to="http://sarthakmishra.lovestoblog.com/?i=2" target="_blank">My Portfolio</Link>
            </div>
        </div>
    )
}