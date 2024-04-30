import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import * as io from 'socket.io-client';

const socket = io.connect("http://localhost:3001/"); 

interface chatMessageSend {
    message: String,
    roomCode: String
}

export const Chat = () => {
    const [isJoined, setIsJoined] = useState<boolean>(false);
    const [roomCode, setRoomCode] = useState<String>("");
    const [message, setMessage] = useState<String>("");
    const [messageRecieved, setMessageRecieved] = useState<String>("");

    const [chatSend, setChatSend] = useState<chatMessageSend[]>([]);
    const [chatRecieved, setChatRecieved] = useState<chatMessageSend[]>([]);

    const joinRoom = () => {
        if(roomCode !== "") {
            console.log(`${socket.id} joined room: ${roomCode}`);
            socket.emit('join room', roomCode)
            setIsJoined(true);
        }
    };

    const sendMessage = () => {
        setChatSend([...chatSend, { message, roomCode }]);
        socket.emit('send message', { message, roomCode });
    };

    useEffect(() => {
        socket.on('recieved message', (data) => {
            // console.log(data);
            setChatRecieved(chatRecieved => [...chatRecieved, data]);
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
            <div className='border-2 border-gray-400 rounded-lg flex flex-col-reverse px-10 mb-3 space-y-2 font-semibold'>
                {
                    <h2 className='text-right flex flex-col'>{ chatSend.map((chat) => <h1>{ chat.message }</h1>) }</h2>
                }
                {
                    <h2 className='text-left flex flex-col'>{ chatRecieved.map((chat) => <h1>{ chat.message }</h1>) }</h2>
                }
            </div>
            <input type="text" placeholder="Type a message" className='border-2 border-gray-500 rounded-lg text-xl font-semibold p-1' onChange={(event) => {setMessage(event.target.value)}} />
            <button className='bg-green-200 border-2 border-gray-300 rounded-lg p-1 hover:bg-green-400' onClick={sendMessage}>Send</button>
        </div>
    )
}