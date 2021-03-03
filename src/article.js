import React from 'react';
import Add from "./Add";
import App from "./time";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardHeader from '@material-ui/core/CardHeader';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import './App.css';
import Col from 'react-bootstrap/Col';
import LetterAvatars from './Avatar'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import {
  HashRouter as Router,
  Route,
  Link
} from "react-router-dom";




class Article extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ads: [],
      currentAd: undefined
    }
    
  }

  refreshList(){
    
    this.props.client.getAds()
    .then((response) => this.setState({ ads: response.data } ))
   
    
  }

  removeAdvert(id){
    this.props.client.removeAd(id)
    .then(this.refreshList())
    
  }

  updateAdvert(ad){
    this.setState({currentAd: ad})
   
  }

  componentDidMount() {
    this.refreshList()

  }

  buildrows() {
 
    return this.state.ads.map((current) => {
      return ( <div key={current._id}>
          <Card className="root"> 
    <CardHeader
         avatar={<LetterAvatars/>}
         title=  {current.markdown} 
         subheader={<App/>} />
            <Accordion>
       <Card>
       <Row>
               <Col md={5}>
            
               </Col>  
               <Col md={{ span: 3, offset: 3}}>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  <button className="btn btn-primary"  > see more</button>{'   '}
                  <button className="btn btn-danger"  onClick={()=> this.removeAdvert(current._id)}> Delete</button>{'  '}
                  <button  className="btn btn-info"  onClick={()=> this.updateAdvert(current)}> <Link  className='color' to="/add" >Edit</Link></button>
            </Accordion.Toggle>  </Col>
        </Row>
          <Accordion.Collapse eventKey="0">

          <Card.Body>
            <Card.Text><b>{current.title}:</b> </Card.Text>
            <Card.Text>{current.Date}</Card.Text>
            <Card.Text></Card.Text>
            {current.description}
       
           </Card.Body>
         </Accordion.Collapse>
         </Card>
          </Accordion>
         
   </Card>
       
        
        </div>)
    })
    
  }


  render() {
    
    return (
      <>
         <Router>
         <Navbar   bg="primary" variant="dark" fixed="top"  expand="md">
  <Navbar.Brand>BlogApp</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Link className="nav-link" to="/view">View</Link>
      <Link className="nav-link" to="/add" >Add</Link>
      <Button className="Button" onClick={() => this.props.client.logoutHandler()}>logout</Button>
      
      
    </Nav>
  </Navbar.Collapse>
</Navbar>
        <Route  path="/add"  >
           <Container>
            <br /><br />
            <Add client={this.props.client} refreshList={() => {
            this.refreshList()
            this.setState({
            currentAd: undefined})
            }} 
             currentAd={this.state.currentAd}/>
           
          </Container>
        </Route>
        <Route   exact path="/view"  >
          <Container>
            <h1 className='header'>Blog Articles</h1><br></br>
            <Button  variant="success"   ><Link className="btn btn-success"  to="/add" >New Article</Link></Button>
          </Container>
          <Container>
            {this.buildrows()}
          
          </Container>
    
          
        </Route>

    </Router>

    
      </>
    )

  }
}




export default Article;
