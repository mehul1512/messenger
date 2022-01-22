import React, { useContext, useEffect, useState, useRef } from 'react';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import Conversation from '../../components/conversations/Conversation';
import Message from '../../components/message/Message';
import Topbar from '../../components/topbar/Topbar';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import './messenger.css';

function Messenger() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const scrollRef = useRef();

    // const { user } = useContext(AuthContext);
    const id = '61e91b8074e5b88cb02ff1bb'; // static define, after change it to dynamic

    useEffect(() => {
        const getConversation = async () => {
            try {
                const res = await axios.get('/conversation/' + id);
                // console.log(res);
                setConversations(res.data.conversations);
                // console.log(res.data.conversations);
            } catch (err) {
                console.log(err);
            }
        };
        getConversation();
    }, [id]);

    // console.log(currentChat);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get('/messages/' + currentChat?._id);
                setMessages(res.data.messages);
                console.log(res.data.messages);
            } catch (err) {
                console.log(err);
            }
        };
        getMessages();
    }, [currentChat]);

    // console.log('messages : ', messages);

    const handleSubmit = async (e) => {
        e.preventDefault(); // not refresh the page
        const message = {
            sender_id: id,
            message: newMessage,
            conversation_id: currentChat?._id,
        };

        try {
            const res = await axios.post('/messages', message);
            console.log(res.data.message);
            setMessages([...messages, res.data.message]);
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
            {/* <Navbar /> */}
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
                                    conversation={c}
                                    currentUser={id}
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
                                                message={m}
                                                own={m?.sender_id === id}
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
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Messenger;
