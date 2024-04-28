import { useState } from 'react';
import { Link } from "react-router-dom";

export const GenerateRoom = () => {
    const [randomRoomCode, setRandomRoomCode] = useState<String | null>(null);

    const generateRoomCode = () => {
        setRandomRoomCode((Math.floor(Math.random() * 100) + 1).toString());
    }
    return(
        <div className='text-center space-x-5'>
            <h1 className='text-2xl font-semibold py-5'>Make a room & chat with your buddies</h1>
            <button onClick={generateRoomCode} className='bg-green-200 border-2 border-gray-300 rounded-lg p-1 hover:bg-green-400'>Generate Room Code</button>
            <button className='bg-green-200 border-2 border-gray-300 rounded-lg p-1 hover:bg-green-400'><Link to="/chat">Join Room using a Code</Link></button>
            {
                randomRoomCode &&
                <>
                    <h3 className='text-xl font-semibold py-5'>Share this code with your friends: {randomRoomCode}</h3>
                    <button className='bg-green-200 border-2 border-gray-300 rounded-lg p-1 hover:bg-green-400'><Link to="/chat">Chat with your friends</Link></button>
                </>
            }
        </div>
    )
}