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
  }

  login = username => {
    this.setState({
      isLoggedIn: true,
      username: username
    });
    this.updateHeader();
  }

  updateHeader = () => {
    this.header.current.setState({name: this.state.username});
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
            ? <Todos name={this.state.username}/>
            : <Login login={this.login} />
          }
        </main>
      </div>
    );
  }
}