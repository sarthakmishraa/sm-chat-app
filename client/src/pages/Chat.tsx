import { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import * as io from 'socket.io-client';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

// const BACKEND_URL = "http://localhost:3001/";
const BACKEND_URL = "https://sm-chat-app-9pbk.onrender.com/";

const socket = io.connect(BACKEND_URL);

interface chatMessagesType {
    userId: String,
    message: String,
    roomCode: String
}

export const Chat = () => {
    const [isJoined, setIsJoined] = useState<boolean>(false);
    const [roomCode, setRoomCode] = useState<String>("");
    const [message, setMessage] = useState<String>("");
    const [messageRecieved, setMessageRecieved] = useState<String>("");

    const [chatMessages, setChatMessages] = useState<chatMessagesType[]>([]);

    const inputMessageRef = useRef<any>(null);

    const userId:String = socket.id || "";

    const [user] = useAuthState(auth);

    const joinRoom = () => {
        if(roomCode !== "") {
            // console.log(`${socket.id} joined room: ${roomCode}`);
            socket.emit('join room', roomCode)
            setIsJoined(true);
        }
    };

    const sendMessage = () => {
        socket.emit('send message', { message, roomCode, userId });
        setChatMessages(chatMessages => [...chatMessages, { message, roomCode, userId }]);
        inputMessageRef.current.value= "";
        setMessage("");
    };

    useEffect(() => {
        socket.on('recieved message', (data) => {
            // console.log(data);
            setMessageRecieved(data.message);
            setChatMessages(chatMessages => [...chatMessages, data]);

        })
    }, [socket]);

    return(
        <div className='text-center space-x-5 min-h-screen'>
            {
                user ? (
                    <div>
                    {
                        isJoined ? (
                            <>
                                <h3
                                    className='text-xl font-semibold py-5'>
                                        Room Joined: {roomCode}
                                </h3>
                                <button
                                    className='bg-green-200 border-2 border-gray-300 rounded-lg p-1 hover:bg-green-400'
                                >
                                    <Link to="/generateRoom">
                                        Leave
                                    </Link>
                                </button>
                                </>
                            ):(
                                <>
                                    <h3
                                        className='text-2xl font-semibold py-5'>
                                            Join a Room and Chat with your friends
                                    </h3>
                                    <input
                                        type='number'
                                        className='border-2 border-gray-500 rounded-lg text-xl font-semibold p-1'
                                        placeholder='Enter room code'
                                        onChange={(event) => {setRoomCode(event.target.value)}}
                                    />
                                    <button
                                        type='submit'
                                        className='bg-green-200 border-2 border-gray-300 rounded-lg p-1 hover:bg-green-400'
                                        onClick={joinRoom}>
                                            Join Room
                                    </button>
                                </>
                            )
                        }
                        <h2
                            className='text-xl font-semibold py-5'>
                                Last Message Recieved: { messageRecieved }
                        </h2>
                        <div
                            className='flex justify-center'
                        >
                            <div
                                className='overflow-y-auto mb-2 p-1 box-border h-[480px] w-[640px] border-2 border-gray-500 rounded-xl'
                            >
                                {
                                    chatMessages.map((chatMessage) => (
                                            chatMessage.userId === socket.id ? (
                                                <h2
                                                    className='text-wrap font-semibold px-2 border-b-2 border-gray-300 bg-green-200 rounded-xl text-right'
                                                >
                                                        { chatMessage.message }
                                                </h2>
                                            ):(
                                                <h2
                                                    className='text-wrap font-semibold px-2 border-b-2 border-gray-300 bg-green-400 rounded-xl text-left'
                                                >
                                                        { chatMessage.message }
                                                </h2>
                                            )
                                        )
                                    )
                                }
                            </div>
                        </div>
                        <input
                            type="text"
                            placeholder="Type a message"
                            className='w-[800px] border-2 border-gray-500 rounded-lg text-xl font-semibold p-1'
                            onChange={(event) => {setMessage(event.target.value)}}
                            ref={inputMessageRef}
                        />
                        <button
                            className='bg-green-200 border-2 border-gray-300 rounded-lg p-1 hover:bg-green-400'
                            onClick={sendMessage}
                        >
                                Send
                        </button>
                    </div>
                ):(
                    <h1
                        className='text-2xl font-semibold py-5'>
                            Log In to join a room & chat with your friends
                    </h1>
                )
            }
        </div>
    )
}