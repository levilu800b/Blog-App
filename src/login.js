import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false
    }
  }

  submitHandler(e) {
    e.preventDefault()
    this.setState({ disabled: true })
    this.props.client.login(e.target.username.value, e.target.password.value)
      .then((response) => {
        this.setState({ disabled: false })
        this.props.loggedIn(response.data.token)
      })
      .catch(() => {
        alert("an error occured, please try again");
        this.setState({ disabled: false })
      })
  }
  

  render() {
    return (
      <>
 <Navbar   bg="primary" variant="dark" fixed="top"  expand="md">
  <Navbar.Brand>BlogApp</Navbar.Brand>
 
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
   
      
    </Nav>
  </Navbar.Collapse>
</Navbar>
<Row className="home">
    <Col md={3}>
   


    </Col>
    <Col md={6}><br />
       <h1 className='header3'>Login</h1> <br />
        <form onSubmit={(e) => this.submitHandler(e)} >
       <h4>Username</h4>  
          <Form.Control type="text" name="username" placeholder="Enter you name" disabled={this.state.disabled} /><br />
      <h4>Password</h4>
          <Form.Control type="password" name="password"  placeholder="Password" disabled={this.state.disabled} /><br /><br />
          <button  class="btn btn-primary" type="submit" disabled={this.state.disabled}> Submit </button>
        </form>
        </Col>
        <Col md={3}></Col>
        </Row>

      </>
    )

  }
}

export default Login;
