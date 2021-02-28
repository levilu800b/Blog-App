import React from 'react';
import './App.css';

class App extends React.Component {
  state={
    curDate : new Date().toLocaleDateString(),
  }
  render(){
    return (
      <div className="App">
        <p> {this.state.curDate}</p>
 
      </div>
    );
  }
}

export default App;
