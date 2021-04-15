import React, { useState } from 'react';
import Axios from 'axios';

export default function Todos(props) {
    const [loginType, setLoginType] = useState('login');
    const [name, setName] = useState('');
    const [password, setPassword] = useState(0);
    const [confirmPassword, setConfirmPassword] = useState(0);
    const [hasLoggedIn, setHasLoggedIn] = useState([]);

    const addUser = () => {
        if(password === confirmPassword) {
            Axios.post('http://localhost:3001/create', {
                name: name,
                password: password,
            }).then(() => {
                console.log('success');
            });
        } else {
            console.log("passwords don't match");
        }
    }    

    const validateUser = () => {
        Axios.post('http://localhost:3001/user', {
            name: name,
            password: password,
        }).then(request => {
            if(request.data.length === 1) {
                console.log(`${request.data[0].name} logged in successfully.`);
                props.login();
            } else {
                console.log('The user or the password is incorrect.');
            }
        });
    }
    
    const login = (
        <form className='login-form' onSubmit={event => {
            event.preventDefault();
            validateUser();
        }}>
            <h2 className='text-primary text-center'>Login</h2>
            <label>Name</label>
            <input type='text' required placeholder='Enter your username...' onChange={event => {
                setName(event.target.value);
            }}/>
            <label>Password</label>
            <input type='password' required placeholder='Enter your password...' onChange={event => {
                setPassword(event.target.value);
            }}/>
            <button type='submit' className='btn btn-primary'>Submit</button>
            <p className='text-info text-center' onClick={() => 
                setLoginType((loginType === 'login') ? 'register' : 'login')
            }>Register</p>
        </form>
    );

    const register = (
        <form className='login-form' onSubmit={event => {
            event.preventDefault();
            event.target.reset();
            addUser();
        }}>
            <h2 className='text-primary text-center'>Register</h2>
            <label>Name</label>
            <input type='text' required placeholder='Enter your username...' onChange={event => {
                setName(event.target.value);
            }}/>
            <label>Password</label>
            <input type='password' required placeholder='Enter your password...' onChange={event => {
                setPassword(event.target.value);
            }}/>
            <label>Confirm password</label>
            <input type='password' required placeholder='Enter your password...' onChange={event => {
                setConfirmPassword(event.target.value);
            }}/>
            <button type='submit' className='btn btn-primary'>Submit</button>
            <p className='text-info text-center' onClick={() => 
                setLoginType((loginType === 'login') ? 'register' : 'login')
            }>Login</p>
        </form>
    );

    if(loginType === 'login')
        return (<div>{login}</div>);
    else return (<div>{register}</div>);
}