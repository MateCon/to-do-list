import React, { useState } from 'react';
import Axios from 'axios';

export default function Todos() {
    const loginType = 'login';
    const [name, setName] = useState('');
    const [password, setPassword] = useState(0);

    const addUser = () => {
        Axios.post('http://localhost:3001/create', {
            name: name,
            password: password,
        }).then(() => {
            console.log('success');
        });
    }

    return (
        <form className='login-form' onSubmit={event => {
            event.preventDefault();
            event.target.reset();
            addUser();
        }}>
            <label>Name</label>
            <input type='text' required placeholder='Enter your username...' onChange={event => {
                setName(event.target.value);
            }}/>
            <label>Password</label>
            <input type='password' required placeholder='Enter your password...' onChange={event => {
                setPassword(event.target.value);
            }}/>
            <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
    );
}