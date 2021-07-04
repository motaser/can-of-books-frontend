import React, { Component } from 'react'
import { withAuth0 } from '@auth0/auth0-react';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


 class Profile extends Component {
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
