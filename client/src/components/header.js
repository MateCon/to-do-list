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
			<header>
				<h1>To-do</h1>
				<p>{this.state.name}</p>
			</header>
		);
	}
}