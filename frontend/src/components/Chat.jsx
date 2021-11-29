
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./Chat.css"
import OnlineList from "./onlinelist";
import axios from "axios";
import RowContainer from "./RowContainer/RowContainer";
import ScrollToBottom from 'react-scroll-to-bottom';
const socket = io.connect("http://localhost:3001")


function Chat({ username }) {
    const [user, setUser] = useState(username)
    const [room, setRoom] = useState('PublicRoom')
    const [socketId , setSocketId] = useState("")
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const userList= [];

    useEffect(() => {
        socket.emit('join-room', room, user);            
    }, [])

    useEffect(() => {       
        socket.on("message", (data) => {
            setMessages((list) => [...list, data]);
        });
       
    }, [socket])




    const sendMessageHandler = async () => {
        if (message !== "") {
            const messageData = {
                room: room,
                user: user,
                message: message,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes() + ":" + new Date(Date.now()).getSeconds(),
                id: socket.id
            }
            await socket.emit("send-message", messageData);
            setMessages((list) => [...list, messageData])
        }
    }

    return <RowContainer>
        <div className="chat" id="chat">
            <h1 className="chat-header">Chat</h1>
                <ScrollToBottom className="chat-log">
                    {messages.map((messageContent) => {
                        return <div className="message" id={user === messageContent.user ? 'you' : 'other'} key={messageContent.id}>
                            <div className="message-content">
                                <p>{messageContent.message}</p>
                            </div>
                            <div className="message-meta">
                                <p>{messageContent.time}</p>
                                <p>{messageContent.user}</p>
                            </div>
                        </div>
                    })}
                </ScrollToBottom>

            <textarea placeholder="write message here.." onChange={(event) => { setMessage(event.target.value) }}></textarea>
            <button onClick={sendMessageHandler}>Send</button>
        </div>
        <OnlineList />
    </RowContainer>
}

export default Chat;