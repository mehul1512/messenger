import './login.css';

export default function login() {
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
              type="Username"
              required
              className="loginInput"
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"

            />
            <button className="loginButton" type="submit">
              Login
             </button>
            {/* <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
            </button> */}
          </form>
        </div>
      </div>
    </div>

    </>
  );

}
