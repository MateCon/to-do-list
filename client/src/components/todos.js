import React, { Component } from 'react';
import Axios from 'axios';
import Todo from './todo';

export default class Todos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            user_id: null,
            input: '',
            todos: [],
            whichCompleted: [],
            completed: 0,
            filterType: 'all'
        }

        this.index = 0;
    }

    uploadTask = index => {
        Axios.post('http://localhost:3001/createTask', {
            user_id: this.state.user_id,
            content: this.state.todos[index],
            is_completed: this.state.whichCompleted[index]
        }).then(() => {
            console.log('success');
        });
    }

    loadTasks = () => {
        
    }

    addTask = event => {
        event.preventDefault();
        if(event.target[0].value === '') return ;
        console.log(this.state);
        this.setState({
            whichCompleted: [...this.state.whichCompleted, false],
            todos: [...this.state.todos, event.target[0].value]
        }, () => this.uploadTask(this.state.todos.length-1));
        event.target[0].value = '';
    }

    changeCompletionInParent = index => {
        this.state.whichCompleted[index] = !this.state.whichCompleted[index];
    }

    modifyCount = isCompleted => {
        this.setState({
            completed: this.state.completed + (isCompleted ? -1 : 1)
        })
    }

    modifyEveryThing = bool => {
        let arr = [];
        for(let i = 0; i < this.state.whichCompleted.length; i++) {
            arr.push(bool);
        }
        this.setState({
            whichCompleted: arr,
            completed: (!bool) ? 0 : this.state.whichCompleted.length
        });
    }

    changeFilterType = newFilterType => {
        this.setState({
            filterType: newFilterType
        })
    }

    deleteTask = index => {
        this.setState({
            completed: this.state.completed - this.state.whichCompleted[index],
            whichCompleted: [...this.state.whichCompleted.slice(0, index), ...this.state.whichCompleted.slice(index + 1, this.state.whichCompleted.length)],
            todos: [...this.state.todos.slice(0, index), ...this.state.todos.slice(index + 1, this.state.todos.length)]
        });
    }

    deleteCheckedItems = () => {
        let newTodos = [], newWhichCompleted = [];
        for(let i = 0; i < this.state.whichCompleted.length; i++) {
            if(!this.state.whichCompleted[i]) {
                newTodos.push(this.state.todos[i]);
                newWhichCompleted.push(this.state.whichCompleted[i]);
            }
        }
        this.setState({
            todos: newTodos,
            whichCompleted: newWhichCompleted,
            completed: 0
        });
    }

    render() {
        return (
            <div className='todos'>
                <div className='info'>
                    {`${this.state.todos.length} tasks, ${this.state.completed} completed`}
                </div>
                <form className='row' onSubmit={this.addTask}>
                    <input type='text' value={this.state.value}></input>
                    <button type='submit' className='btn btn-primary'>Add task</button>
                </form>
                <form className='row filterForm' onSubmit={event => event.preventDefault()}>
                    <button className={`btn ${(this.state.filterType === 'all') ? 'btn-success' : 'btn-light'} btn-all`} onClick={() => this.changeFilterType('all')}>All</button>
                    <button className={`btn ${(this.state.filterType === 'active') ? 'btn-success' : 'btn-light'} btn-active`} onClick={() => this.changeFilterType('active')}>Active</button>
                    <button className={`btn ${(this.state.filterType === 'completed') ? 'btn-success' : 'btn-light'} btn-completed`} onClick={() => this.changeFilterType('completed')}>Completed</button>
                </form>
                <form className='row checkForm' onSubmit={event => event.preventDefault()}>
                    <button className='btn btn-light' onClick={() => this.modifyEveryThing(true)}>Check Everything</button>
                    <button className='btn btn-light' onClick={() => this.modifyEveryThing(false)}>Uncheck Everything</button>
                </form>
                <div className='task-container'>
                    {
                        this.state.todos.map((task, i) => {
                            this.index++;
                            return (<Todo task={task}
                                key={this.index}
                                index={i}
                                modifyCount={this.modifyCount}
                                filterType={this.state.filterType}
                                deleteTask={this.deleteTask}
                                isCompleted={this.state.whichCompleted[i]}
                                changeCompletionInParent={this.changeCompletionInParent}/>
                            );
                        })
                    }
                </div>
                {
                    (this.state.completed > 0) 
                        ? (<form className='row deleteForm' onSubmit={event => event.preventDefault()}>
                            <button className='btn btn-danger' onClick={event => {this.deleteCheckedItems()}}> 
                            Delete all checked Items
                            </button>
                        </form>) 
                        : null
                }
            </div>
        );
    }
}