import './App.css';
import { BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import { Redirect } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Profile from './pages/Profile/Profile';


function App() {
  const { user, authIsReady } = useAuthContext();
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Granted.');
    }
    else {
      alert('To get notifications, please allow notifications in your browser settings.');
    }
  })
  return (
    <BrowserRouter>
    {!authIsReady && <div className='loading-page'>Loading...</div>}
    <Router>
      <div className="App">
        <Nav />
          <Switch>
            <Route path="/profile/:id">
              {
                user ? <Profile /> : <Redirect to="/login" />
              }
            </Route>
            <Route path="/login">
              {
                user ? <Redirect to="/" /> : <Login />
              }
            </Route>
            <Route path="/signup">
              {
                user ? <Redirect to="/" /> : <Signup />
              }
            </Route>
            <Route path="/">
              {
                user ? <Home /> : <Redirect to="/login" />
              }
            </Route>

          </Switch>
      </div>
    </Router>
  </BrowserRouter>
  );
}

export default App;
