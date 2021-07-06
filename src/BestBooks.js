import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';




class MyFavoriteBooks extends React.Component {

  constructor(props){
    super(props);
    this.state=({
      resultsBook:[],
      show:''
    });
  }

  componentDidMount = async () => {

    let email=this.props.auth0.user.email
    let axiosData = await axios.get(`http://localhost:8000/?email=${email}`).then(res=>{
            console.log(res)
        }).catch(err=>{console.log(err)})
        console.log(axiosData);

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

export default MyFavoriteBooks;
