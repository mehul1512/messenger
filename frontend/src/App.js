import './App.css';
import Messenger from './pages/messengers/messenger';
import Login from './pages/login/login';
import Register from './pages/register/register';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  
  return (
    <>
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/messenger" exact component={Messenger} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </Router>
          
      
      
    </>
  );
}

export default App;
