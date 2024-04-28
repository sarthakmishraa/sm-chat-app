import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import * as io from 'socket.io-client';

const socket = io.connect("http://localhost:3001/"); 

export const Chat = () => {
    const [isJoined, setIsJoined] = useState<boolean>(false);
    const [roomCode, setRoomCode] = useState<String>("");
    const [message, setMessage] = useState<String>("");
    const [messageRecieved, setMessageRecieved] = useState<String>("");

    const joinRoom = () => {
        if(roomCode !== "") {
            console.log(`${socket.id} joined room: ${roomCode}`);
            socket.emit('join room', roomCode)
            setIsJoined(true);
        }
    };

    const sendMessage = () => {
        socket.emit('send message', { message, roomCode });
    };

    useEffect(() => {
        socket.on('recieved message', (data) => {
            // console.log(data);
            setMessageRecieved(data.message);
        })
    }, [socket]);

    return(
        <div className='text-center space-x-5'>
            {
                isJoined ? (
                    <>
                        <h3 className='text-xl font-semibold py-5'>Room Joined: {roomCode}</h3>
                        <button className='bg-green-200 border-2 border-gray-300 rounded-lg p-1 hover:bg-green-400'>
                            <Link to="/generateRoom">Leave</Link>
                        </button>
                    </>
                ):(
                    <>
                        <h3 className='text-2xl font-semibold py-5'>Join a Room and Chat with your friends</h3>
                        <input type='number' className='border-2 border-gray-500 rounded-lg text-xl font-semibold p-1' placeholder='Enter room code' onChange={(event) => {setRoomCode(event.target.value)}} />
                        <button className='bg-green-200 border-2 border-gray-300 rounded-lg p-1 hover:bg-green-400' onClick={joinRoom}>Join Room</button>
                    </>
                )
            }
            <h2 className='text-xl font-semibold py-5'>Message: { messageRecieved }</h2>
            <input type="text" placeholder="Type a message" className='border-2 border-gray-500 rounded-lg text-xl font-semibold p-1' onChange={(event) => {setMessage(event.target.value)}} />
            <button className='bg-green-200 border-2 border-gray-300 rounded-lg p-1 hover:bg-green-400' onClick={sendMessage}>Send</button>
        </div>
    )
}