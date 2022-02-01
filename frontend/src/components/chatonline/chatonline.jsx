import React from 'react';
import './chatOnline.css';

function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
    return (
        <div className='chatOnline'>
            <div className='chatOnlineFriend'>
                <div className='chatOnlineImgContainer'>
                    <img
                        src='https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
                        alt=''
                        className='chatOnlineImg'
                    />
                    <div className='chatOnlineBadge'></div>
                </div>
                <span className='chatOnlineName'>Dishen</span>
            </div>
        </div>
    );
}

export default ChatOnline;
