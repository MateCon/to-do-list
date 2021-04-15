import React, { Component } from 'react';

export default class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: null
		}
	}

	render() {
		return (
			<header className='row'>
				<div className='col'></div>
				<h1 className='col text-center'>To-do</h1>
				<p className='col text-right'>{this.state.name}</p>
			</header>
		);
	}
}