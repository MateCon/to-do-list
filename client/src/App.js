import React, { Component } from 'react';
import './styles/App.css';
import Header from './components/header';
import Todos from './components/todos';
import Login from './components/login-form';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false
    };
    this.header = React.createRef();
    this.todos = React.createRef();
  }

  login = (username, user_id) => {
    this.setState({
      isLoggedIn: true,
      username: username,
      user_id: user_id
    });
    this.updateHeader();
    this.updateTodos();
  }

  updateHeader = () => {
    this.header.current.setState({name: this.state.username});
  }

  updateTodos = () => {
    this.todos.current.setState({
      username: this.state.username, 
      user_id: this.state.user_id
    }, () => this.todos.current.loadTasks());
  }

  render() {
    return (
      <div>
        {
          <Header ref={this.header} />
        }
        
        <main>
          {
            (this.state.isLoggedIn)
            ? <Todos ref={this.todos}/>
            : <Login login={this.login} />
          }
        </main>
      </div>
    );
  }
}