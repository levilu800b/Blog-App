import React from 'react';
import Form from 'react-bootstrap/Form';
import './App.css';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';





class Add extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false,
      
    }
  
   
  }
 
  onClick = () => {
    
    toastr.options = {
      closeButton: true,
      debug: false,
      extendedTimeOut: "1000",
      hideDuration: "1000",
      hideEasing: "linear",
      hideMethod: "fadeOut",
      newestOnTop: false,
      onclick: null,
      positionClass: "toast-top-full-width",
      preventDuplicates: true,
      progressBar: true,
      showDuration: "300",
      showEasing: "swing",
      showMethod: "fadeIn",
      timeOut: "5000",
    }
    toastr.clear()
    setTimeout(() => toastr.success(`post added`))
    
  }
  submitHandler(e) {
    e.preventDefault()

    this.setState({ disabled: true })
    
    let result
    if (this.props.currentAd) {
      result = this.props.client.updateAd(this.props.currentAd._id ,e.target.title.value, e.target.Date.value,e.target.description.value,e.target.markdown.value)
      console.log( result)
    } else {
      result = this.props.client.addAd(e.target.title.value, e.target.Date.value, e.target.description.value, e.target.markdown.value)
    }
    console.log(result)
    result.then(() => {
      this.setState({ disabled: false })
   
      document.getElementById("addForm").reset()
      this.props.refreshList()
    
    })
      .catch(() => {
        console.log("catch")
        alert("an error occured, please try again");
        this.setState({ disabled: false })
      })
  }

  render() {
    
    return (
      <>
  {this.props.currentAd ?  <h1 className='header' > Eidt Article</h1> : <h1  className='header'>New Article</h1>}
   


        <Form className='Container' onSubmit={(e) => this.submitHandler(e)} id="addForm" >
    
        <Form.Group >
                <Form.Label>Topic title </Form.Label>
            <Form.Control  type="text"   defaultValue={this.props.currentAd?.title} name="title" disabled={this.state.disabled} /><br />
            </Form.Group>
            <Form.Label> Date </Form.Label>
          <Form.Control  type="date" defaultValue={this.props.currentAd?.Date} name="Date" disabled={this.state.disabled} /><br />
          Description
          <Form.Control   as="textarea" rows={5}type="text" defaultValue={this.props.currentAd?.description} name="description" disabled={this.state.disabled} /><br />
         
          Markdown
          <Form.Control  as="textarea" rows={3} type="text" defaultValue={this.props.currentAd?.markdown} name="markdown" disabled={this.state.disabled} /><br />
          <a href="/" class="btn btn-secondary">Cancel</a>{' '}
          <button  onClick={this.onClick} type="submit" disabled={this.state.disabled}  class="btn btn-primary" > Save  </button>
         <br/><br/><br/>
        
        </Form>
    
      </>
    )
  }
}

export default Add;

