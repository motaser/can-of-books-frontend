import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';

class MyFavoriteBooks extends React.Component {

  constructor(props){
    super(props);
    this.state=({
      resultsBook:[],
      show:''
    });
  }

  componentDidMount = async() => {

    let email=this.props.auth0.user.email
    let axiosData= await axios.get(`http://localhost:8000/books/?email=${email}`)
    this.setState({
      resultsBook:axiosData.data.book
    })
    console.log(axiosData.data.book)
  }
  render() {
    return(
      <Jumbotron>
      <h1>My Favorite Books</h1>
      <p>
        This is a collection of my favorite books
      </p>
      {this.state.resultsBook.map(item=>{
        return (
          <>
          <h2>{item.namebook}</h2>
         <h3>{item.description}</h3>
         <p>{item.bookDescription}</p>
          </>
        )
     })}
    </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);