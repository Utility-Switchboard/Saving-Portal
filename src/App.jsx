import React, { lazy, Suspense, useEffect, useState } from "react";
// React Router
import { Switch, Route, Redirect } from 'react-router-dom';
// IdleTimerContainer
import IdleTimerContainer from './components/IdleTimerContainer/IdleTimerContainer';
// Firebase
import { auth, createUserProfileDocument } from './firebase/firebase';

// Components
import Overlay from './components/Overlay/Overlay';

// Pages
const Home = lazy(() => import('../src/pages/HomePage/Home'));
const Login = lazy(() => import('../src/pages/LoginPage/Login'));

function App() {
  
  /**-- States --*/
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, updateIsLoading] = useState(true);
  const [userInfo, updateUserInfo] = useState(null);

  useEffect(() => {
    (async () => {
      // Session
      await auth.onAuthStateChanged((user) => {
        if (user) {
          // console.log('is logged');

          // Create User profile
          createUserProfileDocument(user);
          // Update states
          updateIsLoading(false);
          updateUserInfo(user);
          setIsAuthenticated(true);
        } else {
          // console.log('is not logged');
          // setIsAuthenticated
          setIsAuthenticated(false);
          // updateIsLoading
          updateIsLoading(false);
        }
      });
    })();
  }, []);

  if (isLoading) {
    return <Overlay text={'Checking the session...'} spinner={true} />
  }
  
  return (
      <Switch>
        <Suspense fallback={<Overlay text={'Loading data, please wait...'} spinner={true} />}>
          {isAuthenticated ?
            (
              <>
                <Route path='/home' render={(props) => <Home user={userInfo} {...props} />} />
                {/* Checking activity */}
                <IdleTimerContainer />
                {/* Redirect */}
                <Redirect to={`/home`} />
              </>
            )
            :
            (
              <>
                <Route exact path='/' component={Login} />
                {/* Redirect */}
                <Redirect to="/" /> 
              </>
            )
          }
        </Suspense>
      </Switch>
  );
}

export default App;
