import React, { useContext, useEffect, useState, useRef } from 'react';
import Conversation from '../../components/conversations/Conversation';
import Message from '../../components/message/Message';
import Topbar from '../../components/topbar/Topbar';
import axios from 'axios';
import { io } from 'socket.io-client';
import { AuthContext } from '../../context/AuthContext';
import './messenger.css';

function Messenger() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();
    const scrollRef = useRef();

    const { user } = useContext(AuthContext);
    // console.log('user: ', user);

    useEffect(() => {
        socket.current = io('ws://localhost:5000/');

        socket.current.on('getMessage', (data) => {
            console.log('getMessage data:', data);
            setArrivalMessage({
                sender_id: data.senderId,
                message: data.message,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        console.log('arrivalMessage:', arrivalMessage);
        console.log('currentChat:', currentChat);
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender_id) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit('addUser', user._id);
        socket.current.on('getUsers', (users) => {
            // console.log(users);
            setOnlineUsers(users);
        });
    }, [user]);

    useEffect(() => {
        const getConversation = async () => {
            try {
                const res = await axios.get('/conversations/' + user._id);
                setConversations(res.data.conversations);
                // console.log('conversations:', res.data.conversations);
            } catch (err) {
                console.log(err);
            }
        };
        getConversation();
    }, [user._id]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get('/messages/' + currentChat?._id);
                setMessages(res.data.messages);
                // console.log('messages: ', res.data.messages);
            } catch (err) {
                console.log(err);
            }
        };
        getMessages();
    }, [currentChat]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // not refresh the page
        const message = {
            sender_id: user._id,
            message: newMessage,
            conversation_id: currentChat?._id,
        };

        const receiverId = currentChat.members.find(
            (member) => member !== user._id
        );

        socket.current.emit('sendMessage', {
            senderId: user._id,
            receiverId,
            message: newMessage,
        });

        try {
            const res = await axios.post('/messages', message);
            console.log(res.data.result);
            setMessages([...messages, res.data.result]);
            setNewMessage('');
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <>
            <Topbar />
            <div className='messenger'>
                <div className='chatMenu'>
                    <div className='chatMenuWrapper'>
                        <input
                            placeholder='Search for friend'
                            className='chatMenuInput'
                        />
                        {conversations.map((c) => (
                            <div onClick={() => setCurrentChat(c)}>
                                <Conversation
                                    key={c._id}
                                    conversation={c}
                                    currentUser={user}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='chatBox'>
                    <div className='chatBoxWrapper'>
                        {currentChat ? (
                            <>
                                <div className='chatBoxTop'>
                                    {messages.map((m) => (
                                        <div ref={scrollRef}>
                                            <Message
                                                key={m._id}
                                                message={m}
                                                own={m.sender_id === user._id}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className='chatBoxBottom'>
                                    <textarea
                                        placeholder='write somethings..!'
                                        className='chatMessageInput'
                                        onChange={(e) =>
                                            setNewMessage(e.target.value)
                                        }
                                        value={newMessage}
                                    />
                                    <button
                                        className='chatSubmitButton'
                                        onClick={handleSubmit}>
                                        Send
                                    </button>
                                </div>
                            </>
                        ) : (
                            <span className='noConversationText'>
                                Open a conversation to start a chat.
                            </span>
                        )}
                    </div>
                </div>
                <div className='chatOnline'>
                    <div className='chatOnlineWrapper'>
                        {/* <ChatOnline
                            onlineUsers={onlineUsers}
                            currentId={user._id}
                            setCurrentChat={setCurrentChat}
                        /> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Messenger;
