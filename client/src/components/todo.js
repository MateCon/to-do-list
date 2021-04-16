import React, { Component } from 'react';

export default class Todo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            key: this.props.index,
            task: this.props.task,
            is_completed: this.props.is_completed
        }
    }

    changeCompletion = () => {
        this.props.updateCompletionInDB(this.state.id, !this.state.is_completed)
        this.setState({
            is_completed: !this.state.is_completed
        });
        this.props.changeCompletionInParent(this.state.key);
    }

    render() {
        const willBeShown = ((this.props.filterType === 'all') || (this.props.filterType === 'completed' && this.state.is_completed) || (this.props.filterType === 'active' && !this.state.is_completed));

        const object = (<div className='task'>
            <li className={(this.state.is_completed) ? 'completed' : ''} onClick={() => {
                this.changeCompletion();
                this.props.modifyCount(this.state.is_completed);
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