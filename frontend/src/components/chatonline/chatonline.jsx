import './chatonline.css';

export default function chatonline() {
  return (
      <>
        <div className="chatOnline">
        <div className="chatOnlineFriend">
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src="person/1.jpeg"
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">mehul</span>
        </div>
    </div>
      </>
  );
}
