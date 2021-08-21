import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import React from "react";
import Login from './components/pages/Login';
import Feed from './components/pages/Feed';
import LoginSuccess from './components/pages/LoginSuccess';
import LoginError from './components/pages/LoginError';
import PrivateRoute from './components/routing/PrivateRoute';
import AuthState from './context/auth/AuthState';
import ComingSoon from './components/pages/ComingSoon';
import About from './components/pages/About';
import PostState from './context/posts/PostState';
import AddPost from './components/posts/AddPost';


function App() {

  return (
    <AuthState>
      <PostState>
        <Router>
          <div className="App">
            <Switch>
              <PrivateRoute exact path="/" component={Feed} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/login/success" component={LoginSuccess} />
              <Route path="/login/error" component={LoginError} />
              <Route path="/commingsoon" component={ComingSoon} />
              <Route path="/about" component={About} />
              <Route path="/addpost" component={AddPost} />
            </Switch>
          </div>
        </Router>
      </PostState>
    </AuthState>
  );
}

export default App;
