import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import BestBooks from './BestBooks'
import Login from './Login';
import axios from 'axios';

class App extends React.Component {


  componentDidMount =  () => {

    
    if(this.props.auth0.isAuthenticated) {
      this.props.auth0.getIdTokenClaims()
      .then(res => {
        const jwt = res.__raw;
        const config = {
          headers: {"Authorization" : `Bearer ${jwt}`},
          method: 'get',
          baseURL: process.env.REACT_APP_PORT,
          url: '/authorize'
        }
        axios(config)
          .then(axiosResults => console.log(axiosResults.data))
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));

      
    }
   
  }

  render() {
    console.log('app', this.props.auth0);
    return(
      <>
        <Router>
          
     
            <Header />
            <Switch>
              <Route exact path="/">
                {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
                { this.props.auth0.isAuthenticated ?
                <>
                <BestBooks/>
                </> :
                <Login/>
                    }
              </Route>
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}

              <Route path="/profiles">{this.props.auth0.isAuthenticated && <Profile/> }</Route>

              

            </Switch>
            <Footer />
          
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
