import React, { Component } from 'react';
import {connect, Provider} from 'react-redux';
import {
  incCount, 
  incCountAsync, 
  store, 
  addTodo, 
  fetchRepos} from './redux';

// 1. Presentational Components
const IncButton = ({onClick}) => (
  <button onClick={onClick}>증가</button>
);

const CounterDisplay = ({count}) => (
  <div>{count}</div>
)

const RepoList = ({repos}) => (
  <div>
    {repos.map((repoName, index) => (
      <div key={`${repoName}${index}`}>{repoName}</div>
    ))}
  </div>
)

class TokenForm extends Component {
  handleClick = e => {
    this.props.onSubmit(this.input.value); //input DOM element객체가 들어있음
  }

  render () {
    return (
      <div>
        <input type="text" ref={input => this.input = input} />
        <button onClick={this.handleClick}>불러오기</button>
      </div>
    )
  }
}

class TodoList extends Component {
  render() {
    const {todos} = this.props;
    return (
      <div>
        {
          todos.map((text, index) => (
            <div key={`${text}${index}`}>{text}</div>
          ))
        }
      </div>
    );
  }
}

class TodoInput extends Component {
  handleKeyPress = e => {
    if (e.key === 'Enter'){
      this.props.onNewTodo(e.target.value);
      e.target.value = '';

    }
  }

  render() {
    return (
      <div>
        <input type="text" onKeyPress={this.handleKeyPress} />
      </div>
    )
  }
}

// 2. Container Componenets -> React와 Redux 세계 연결
const ConnectedIncButton = connect(
  state => ({}), // null로 써도된다.
  dispatch => {
    return {
      onClick: () => {
        dispatch(incCountAsync());
      }
    };
  }
)(IncButton)

const ConnectedCounterDisplay = connect(
  state => {
    return {
      count: state.count
    };
  }
)(CounterDisplay)

const ConnectedTodoList = connect(
  state => {
    return {
      todos: state.todos
    }
  }
)(TodoList)

const ConnectedTodoInput = connect(
  state => ({}),
  dispatch => {
    return {
      onNewTodo: text => {
        dispatch(addTodo(text));
      }
    }
  }
)(TodoInput);

const ConnectedTokenForm = connect(
  null,
  dispatch => {
    return {
      onSubmit: token => {
        dispatch(fetchRepos(token)); //-> Thunk
      }
    }
  }
)(TokenForm);

const ConnectedRepoList = connect(
  state => {
    return {
      repos: state.repos
    };
  }
  // 보여주는 역할뿐이니 matchDispatch.는 안넣어줘도됨
)(RepoList);

//-------------------------------

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <ConnectedIncButton />
          <ConnectedCounterDisplay />
          <ConnectedTodoList />
          <ConnectedTodoInput />
          <ConnectedTokenForm />
          <ConnectedRepoList />
        </div>
      </Provider>
    );
  }
}

export default App;
