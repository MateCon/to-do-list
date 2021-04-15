import React, { Component } from 'react';
import './styles/App.css';
import Header from './components/header';
import Todos from './components/todos';
import Login from './components/login-form';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      username: null
    };
  }

  login = () => {
    this.setState({
      isLoggedIn: true
    });
  }

  render() {
    return (
      <div>
        <Header />
        <main>
          {
            (this.state.isLoggedIn)
            ? <Todos/>
            : <Login login={this.login} />
          }
        </main>
      </div>
    );
  }
}