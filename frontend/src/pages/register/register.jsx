import "./register.css";

export default function register() {
  return (
      <>
       <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Messenger</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Messenger.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox">
            <input
              placeholder="Username"
              className="loginInput"
            />
            <input
              placeholder="Email"
                className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              className="loginInput"
              type="password"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button className="loginRegisterButton">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
      </>
  );
}
