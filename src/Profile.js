import React, { Component } from 'react'
import { withAuth0 } from '@auth0/auth0-react';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

 class Profile extends Component {
    componentDidMount = () => {
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
        return (
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={this.props.auth0.user.picture} alt={this.props.auth0.user.name} />
            <Card.Body>
            <Card.Title>{this.props.auth0.user.name}</Card.Title>
            <Card.Text>
            {this.props.auth0.user.email}
            </Card.Text>
            </Card.Body>
            </Card>
        )
    }
}



export default withAuth0(Profile);
