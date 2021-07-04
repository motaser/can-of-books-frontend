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


class App extends React.Component {

  render() {
    console.log('app', this.props.auth0);
    return(
      <>
        <Router>
          
          <IsLoadingAndError>
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

            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
