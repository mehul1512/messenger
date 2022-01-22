import React, { useEffect, useState } from 'react';
import './conversation.css';
import axios from 'axios';
import codeprofile from '../../images/codeprofile.jpeg';

function Conversation({ conversation, currentUser }) {
    const [user, setUser] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser);

        const getUser = async () => {
            try {
                const res = await axios('/users?userId=' + friendId);
                setUser(res.data.result);
                // console.log(res.data.result);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [currentUser, conversation]);

    return (
        <div className='conversation'>
            <img
                src={
                    user?.profilePicture
                        ? PF + user?.profilePicture
                        : codeprofile
                }
                alt='User profile'
                className='conversationImg'
            />
            <span className='conversationName'>{user?.name}</span>
        </div>
    );
}

export default Conversation;
