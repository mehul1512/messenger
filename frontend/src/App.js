import Messenger from './pages/messenger/Messenger';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
    return (
        <>
            <Router>
                <Switch>
                    <Route path='/' exact component={Login} />
                    <Route path='/messenger' exact component={Messenger} />
                    <Route path='/register' exact component={Register} />
                </Switch>
            </Router>
        </>
    );
}

export default App;
