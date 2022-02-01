import Login from './pages/login/Login';
import Register from './pages/register/Register';
// import Profile from './pages/profile/Profile';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import Messenger from './pages/messenger/Messenger';

function App() {
    //get user data from local storage
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <Router>
            <Switch>
                <Route exact path='/login'>
                    {user ? <Redirect to='/messenger' /> : <Login />}
                </Route>
                <Route path='/register'>
                    {user ? <Redirect to='/messenger' /> : <Register />}
                </Route>
                <Route path='/messenger'>
                    {!user ? <Redirect to='/login' /> : <Messenger />}
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
