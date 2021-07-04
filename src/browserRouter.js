import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    
    Route,
    
  } from "react-router-dom";
import App from './App';
import Profile from './Profile';
import { withAuth0 } from '@auth0/auth0-react';


export class browserRouter extends Component {
    render() {
        return (
            <div>
                <Router>
                <Route exact path='/'>
                <App/>
                </Route>
                    <Route path='/profile'>
                     <Profile/>
                </Route>
                </Router>
            </div>
        )
    }
}

export default withAuth0(browserRouter)
