import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

// Action Creators
export function fetchRepos(token) {
  return async function(dispatch) {
    const res = await fetch(`https://api.github.com/user/repos?access_token=${token}`);
    const data = await res.json();
    const repos = data.map(repoObj => repoObj.name); // repository name이 담겨있는 배열
    dispatch(updateRepos(repos)); // dispatch -> state를 업데이트
  }
}

function updateRepos(repos) {
  return {
    type: 'UPDATE_REPOS',
    repos
  }
}

export function incCount() {
  return {
    type: 'INC_COUNT'
  };
}

// export function incCountAsync() {
//   return function(dispatch) {
//     setTimeout(() => {
//       dispatch(incCount()); 
//     }, 1000); // 이 함수를 dispatch하면 1초뒤에 count가 증가한다.
//   }
// }

export const incCountAsync = () => dispatch => {
  setTimeout(() => {
    dispatch(incCount()); 
  }, 1000); 
}

export function addTodo(text) {
  return {
    type: 'ADD_TODO',
    text
  };
}

// Small-Reducers
function count(state = 0, action) {
  switch (action.type) {
    case 'INC_COUNT':
      return state + 1;
    default:
      return state;
  }
}

function todos(state = ['react study', 'redux study'], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        action.text
      ];
    default:
      return state;
  }
}

function repos(state = [], action) {
  switch (action.type) {
    case 'UPDATE_REPOS': 
      return action.repos;
    default:
      return state;
  }
}

// Combine Small-Reducers into rootReducer to send to store
const rootReducer = combineReducers({
  count,
  todos,
  repos
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(
      thunk,
    )
  )
);
