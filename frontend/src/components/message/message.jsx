import "./message.css";

export default function message({own}) {
  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            {/* <img className='messageImg' src="person/1.jpeg" alt="" /> */}
            <p className="Username"><strong>Rakesh</strong></p>
            <p className='messageText'>hello this is message</p>
        </div>
        
        {/* <div className="messageBottom">
            mcdkfjkdjfdsf
        </div> */}
    </div>
  )
}
