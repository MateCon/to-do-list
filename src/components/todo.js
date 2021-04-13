import React, { Component } from 'react';

export default class Todo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            key: this.props.index,
            task: this.props.task,
            isCompleted: this.props.isCompleted
        }
    }

    changeCompletion = () => {
        this.setState({
            isCompleted: !this.state.isCompleted
        });
        this.props.changeCompletionInParent(this.state.key);
    }

    render() {
        const willBeShown = ((this.props.filterType === 'all') || (this.props.filterType === 'completed' && this.state.isCompleted) || (this.props.filterType === 'active' && !this.state.isCompleted));

        const object = (<div className='task'>
            <li className={(this.state.isCompleted) ? 'completed' : ''} onClick={() => {
                this.changeCompletion();
                this.props.modifyCount(this.state.isCompleted);
            }}>
                {this.state.task}
            </li>
            <button onClick={() => this.props.deleteTask(this.state.key)}>X</button>
        </div>);

        return (
            (willBeShown) ?
                object
            : null
        );
    } 
}