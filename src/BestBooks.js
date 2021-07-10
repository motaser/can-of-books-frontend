import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Jumbotron,Form,Button,Card} from 'react-bootstrap';
import './BestBooks.css';

class MyFavoriteBooks extends React.Component {

  constructor(props){
    super(props);
    this.state=({
      resultsBook:[],
      namebook:'',
      description:'',
      status:'',
      showform:false,
      showbutton:true,
      showedit:false
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
  buttonFun=(e)=>{
    this.setState({
      showform:true,
      showbutton:false
    })
  }

  getName=(e)=>{
    this.setState({
      namebook:e.target.value,
    })
  }
  getDescription=(e)=>{
    this.setState({
      description:e.target.value,
    })
  }
  getStatus=(e)=>{
    this.setState({
      status:e.target.value,
    })
  }
  createBook=(e)=>{
    e.preventDefault();
    const reqBody={
      namebook: this.state.namebook,
      description: this.state.description,
      status:this.state.status,
      email:this.props.auth0.user.email,
      showform:false,
      showbutton:true
    }
    axios.post(`${process.env.REACT_APP_SERVER_URL}/books`,reqBody).then(res=>{
      this.setState({
        resultsBook:res.data.book
      })
    }
    ).catch(error=>{alert(error.message)})
  }

  deleteBook=(book_idx)=>{
    let url = process.env.REACT_APP_SERVER_URL;
    axios.delete(`${url}/books/${book_idx}/?email=${this.props.auth0.user.email}`).then(res=>{
      this.setState({
        resultsBook:res.data.book
      })
    })

  }
  showeditform=(e)=>{
    this.setState({
      showedit:!this.state.showedit
    })
  }

  // getUpdatedata=(e)=>{
  //   this.setState({
  //     namebook:e.target.name1.value,
  //     description:e.target.description1.value,
  //     status:e.target.status1.value,
  //   })
  // }
  UpdateData=(e,book_idx)=>{
    e.preventDefault();
    const reqBody={
      namebook: this.state.namebook,
      description: this.state.description,
      status:this.state.status,
      email:this.props.auth0.user.email,
  }
  let url = process.env.REACT_APP_SERVER_URL;
  axios.put(`${url}/books/${book_idx}`,reqBody).then(res=>{
    this.setState({
      resultsBook:res.data.book
    })
  })

}
 

  render() {
    return(
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
      {this.state.showbutton &&
      
      <Button variant="primary" type="submit" onClick={(e)=>{this.buttonFun(e)}}>Add New Book</Button>
      
      }
      
        {
          this.state.showform &&
          <Form>
      <Form.Group className="mb-3" >
      <Form.Label>Add your favorite Book here</Form.Label>
      <Form.Control type="text" placeholder="name of your favorite Book" onChange={(e)=>{this.getName(e)}} />
      </Form.Group>
      <Form.Group className="mb-3" >
      <Form.Label>Description</Form.Label>
      <Form.Control as="textarea" rows={2}  onChange={(e)=>{this.getDescription(e)}}/>
      </Form.Group>
      <Form.Group className="mb-3" >
      <Form.Label>status</Form.Label>
      <Form.Control type="text" onChange={(e)=>{this.getStatus(e)}}/>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={(e)=>{this.createBook(e)}}>
      Submit
      </Button>
        </Form>

        }
        
        {this.state.resultsBook.map((item,idx)=>{
          return (
            
            <>

            <br></br>
            

          <Card style={{ width: '18rem' }}>
          <Card.Body>
          <Card.Title>{item.namebook}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{item.status}</Card.Subtitle>
          <Card.Text>
          {item.description}
          </Card.Text>
          <Button variant="primary" size="sm" onClick={(e)=>this.deleteBook(idx)}>Delet</Button>
          <br></br>
          <br></br>
          <Button variant="primary" size="sm"onClick={(e)=>this.showeditform(e)}>Edite</Button>
          </Card.Body>
          
{this.state.showedit &&
      <Form >
      <Form.Group className="mb-3" >
      <Form.Label>Update your favorite Book here</Form.Label>
      <Form.Control type="text" placeholder={item.namebook} name="name1" onChange={(e)=>{this.getName(e)}} />
      </Form.Group>
      <Form.Group className="mb-3" >
      <Form.Label>Description</Form.Label>
      <Form.Control as="textarea" rows={2} placeholder={item.description}name="description1" onChange={(e)=>{this.getDescription(e)}}/>
      </Form.Group>
      <Form.Group className="mb-3" >
      <Form.Label>status</Form.Label>
      <Form.Control type="text" placeholder={item.status}name="status1"  onChange={(e)=>{this.getStatus(e)}}/>
      </Form.Group>
      <Button variant="primary" type="submit" id={idx} onClick={(e)=>this.UpdateData(e,idx)}>
      update data
      </Button>
        </Form>
      }
          </Card>

         
            </>
          )
       })}
      </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);