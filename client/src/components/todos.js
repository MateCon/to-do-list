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
            completed: 0,
            filterType: 'all'
        }

        this.index = 0;
    }

    // load
    loadTasks = () => {
        Axios.post('http://localhost:3001/getTasks', {
            user_id: this.state.user_id
        }).then(request => {
            this.setState({
                todos: request.data,
                completed: (request.data.length === 0) ? [] : request.data.map(task => task.is_completed).reduce((a, b) => a + b)
            });
        });
    }

    // add
    createTask = event => {
        event.preventDefault();
        if(event.target[0].value === '') return ;
        console.log('making request');
        Axios.post('http://localhost:3001/createTask', {
            user_id: this.state.user_id,
            content: event.target[0].value,
            is_completed: false
        }).then(() => {
            this.loadTasks();
        });
        event.target[0].value = '';
    }

    // delete
    deleteTask = index => {
        Axios.post('http://localhost:3001/deleteTask', {
            id: this.state.todos[index].id
        }).then(request => {
            this.setState({
                completed: this.state.completed - this.state.todos[index].is_completed,
                todos: [...this.state.todos.slice(0, index), ...this.state.todos.slice(index + 1, this.state.todos.length)]
            })
        });
    }

    deleteCheckedItems = () => {
        let indexes = [];
        for(let i = this.state.todos.length-1; i >= 0; i--) {
            if(this.state.todos[i].is_completed === true) {
                indexes.push(i);
            }
        }
        if(indexes === []) return ;
        let ids = indexes.map((i) => this.state.todos[i].id);
        console.log(indexes, ids);
        for(let index in indexes) {
            this.setState({
                completed: this.state.completed - this.state.todos[indexes[index]].is_completed,
                todos: [...this.state.todos.slice(0, indexes[index]), ...this.state.todos.slice(indexes[index] + 1, this.state.todos.length)]
            })
            Axios.post('http://localhost:3001/deleteTask', {
                id: ids[index]
            })
        }
    }

    // completion
    modifyCount = is_completed => this.setState({completed: this.state.completed + (is_completed ? -1 : 1)})
    updateCompletionInDB = (id, is_completed) => {
        Axios.post('http://localhost:3001/updateCompletion', {
            id: id,
            is_completed: is_completed
        });
    }

    changeCompletionInParent = index => {
        this.setState({
            todos: [...this.state.todos.slice(0, index), {
                id: this.state.todos[index].id,
                is_completed: !this.state.todos[index].is_completed,
                content: this.state.todos[index].content
            },...this.state.todos.slice(index + 1, this.state.todos.length)]
        });
    }

    changeCompletion = (index, is_completed) => {
        this.setState({
            todos: [...this.state.todos.slice(0, index), {
                id: this.state.todos[index].id,
                is_completed: is_completed,
                content: this.state.todos[index].content
            },...this.state.todos.slice(index + 1, this.state.todos.length)]
        }, () => {
            this.updateCompletionInDB(this.state.todos[index].id, is_completed);
        });
    }

    modifyEveryThing = is_completed => {
        this.setState({
            todos: this.state.todos.map(task => {
                return {id: task.id, content: task.content, is_completed: is_completed}
            })
        }, () => {
            for(let i = 0; i < this.state.todos.length; i++) {
                this.updateCompletionInDB(this.state.todos[i].id, is_completed);
            }
        })
    }

    // filter
    changeFilterType = newFilterType => {
        this.setState({
            filterType: newFilterType
        })
    }

    render() {
        return (
            <div className='todos'>
                <div className='info'>
                    {`${this.state.todos.length} tasks, ${this.state.completed} completed`}
                </div>
                <form className='row' onSubmit={this.createTask}>
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
                            return (<Todo task={task.content}
                                key={this.index}
                                id={task.id}
                                is_completed={task.is_completed}
                                index={i}
                                modifyCount={this.modifyCount}
                                filterType={this.state.filterType}
                                deleteTask={this.deleteTask}
                                is_completed={task.is_completed}
                                changeCompletionInParent={this.changeCompletionInParent}
                                updateCompletionInDB={this.updateCompletionInDB}/>
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