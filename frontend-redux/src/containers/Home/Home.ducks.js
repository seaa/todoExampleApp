// Actions, each one represemts a change to the state
// note that we define them using a namespaced string
const FETCH_TODOS             = 'app/home/FETCH_TODOS';
const FETCH_TODOS_SUCCEEDED   = 'app/home/FETCH_TODOS_SUCCEEDED';
const FETCH_TODOS_FAILED      = 'app/home/FETCH_TODOS_FAILED';

const initialState = {
  todos: [],
  loading: false
};

// Reducer, one case for each action
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_TODOS:
      return {...state, loading: true};
    case FETCH_TODOS_SUCCEEDED:
      return {...state, loading: false, todos: action.payload};
    case FETCH_TODOS_FAILED:
      return {
        ...state,
        loading: false,
        todos: [],
      };
    default: return state;
  }
};

// Action Creators
const fetchTodos = () => {
  return { type: FETCH_TODOS };
};

const fetchTodosSucceeded = (payload) => {
  return { type: FETCH_TODOS_SUCCEEDED, payload };
};

const fetchTodosFailed = (payload) => {
  return { type: FETCH_TODOS_FAILED, payload };
};

export default reducer;
export {
  // Actions
  FETCH_TODOS,
  FETCH_TODOS_SUCCEEDED,
  FETCH_TODOS_FAILED,
  // Action Creators
  fetchTodos,
  fetchTodosSucceeded,
  fetchTodosFailed,
};
