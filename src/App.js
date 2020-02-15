import React from 'react';
import './App.css';


//redux
import { createStore   } from 'redux';
import { Provider,connect } from 'react-redux';


//state in the app is only a message array
//props will only have a message property
const mapStateToProps = (state) => {
  return {
    messages: state
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (newMessage) => {
      return dispatch(addMessage(newMessage));
    }
  }
}

//action is to add a message

const ADD = 'ADD';

function addMessage(message) {
    return {
        type: ADD,
        message: message
    };
};

//reducer concats the message to an array in the state

function messageReducer(state=[],action){

    //concat message if type == ADD
    if(action.type === ADD) {
        return [...state, ...[action.message]];
    } else {
        return state;
    };
};


// react app

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      //messages: []
    }
    this.handleChange =  this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }

  handleChange(e) {
    this.setState({
      input: e.target.value
    });
  }

  submitMessage(e){
    this.props.submitNewMessage(this.state.input);
    this.setState({
      //messages: [...this.state.messages, ...[this.state.input]],
      input: ''
    });
  }


  render (){
    return (
      <div className="App">
        <header className="App-header">
        <h2>Type in a new Note:</h2>
        { /* render an input, button, and ul here */ }
        <div className="form-group">
        <input value={this.state.input} onChange={this.handleChange}/>
        </div>
        <div className="form-group">
        <button className="btn btn-primary" type="submit" onClick={this.submitMessage}>Add Note</button>
        </div>
        <ul>{this.props.messages.map((message) => (<li>{message}</li>))}</ul>
        </header>
      </div>
    );
  }
 
}

//redux store that stores the state of the app

const store = createStore(messageReducer);

//container that connects redux store to the react app

const Container  = connect(mapStateToProps, mapDispatchToProps)(App);

//redux apWrapper that renders the app as a child of redux components
class AppWrapper extends React.Component {

    constructor(props){
      super(props);
      
}  
render(){
    return(
      <Provider store={store}>
        <Container />
      </Provider>  
    )
  }

}

export default AppWrapper;
