import React from 'react';
import './messenger.css';
import Navbar from '../../components/navbar/navbar';
import Conversation from '../../components/conversation/conversation';
import Message from '../../components/message/message';
import Chatonline from '../../components/chatonline/chatonline';

function messenger() {
  return (
  <>
   <Navbar/>
   <div className="messenger">
       <div className="chatmenu">
           <div className="chatmenuwrapper">
               <input placeholder='Serch for friend' className='chatmenuInput'/>
               <Conversation/>
               <Conversation/>
               <Conversation/>
               <Conversation/>
               <Conversation/>
           </div>
       </div>
       <div className="chatbox"> 
            <div className="chatboxwrapper">
               <div className="chatboxTop">
                <Message/>
                <Message own={true}/>
                <Message/>
                <Message/>
                <Message/>
                <Message/>
                <Message/>
                <Message/>
                <Message/>
               </div>
            <div className="chatboxBottom">
                <textarea className='chatMessageInput' placeholder='write somthing....'></textarea>
                <button className='chatSubmitButton'>Send</button>
            </div>
           </div>
        </div>
       <div className="chatonline">
           <div className="chatonlinewrapper">
               <Chatonline/>
           </div>
        </div>
   </div>
  </>
  
  );
}

export default messenger;

