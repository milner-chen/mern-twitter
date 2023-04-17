import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import { useEffect, useState } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { getCurrentUser } from './store/session';

import NavBar from './components/NavBar/NavBar';
import MainPage from './components/MainPage/MainPage';
import SignupForm from './components/SessionForms/SignupForm';
import LoginForm from './components/SessionForms/LoginForm';
import Tweets from './components/Tweets/Tweets';
import Profile from './components/Profile/Profile';
import TweetCompose from './components/Tweets/TweetCompose';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <NavBar />
      <Switch>
        <AuthRoute exact path="/" component={MainPage} />
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />

        <ProtectedRoute exact path="/tweets" component={Tweets} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/tweets/new" component={TweetCompose} />
      </Switch>
    </>
  );
}

export default App;
