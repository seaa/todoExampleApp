// Actions
const SET_USERNAME = 'app/signup/SET_USERNAME';
const SET_PASSWORD = 'app/signup/SET_PASSWORD';

const initialState = {
  username: '',
  password: ''
};

// Reducer
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USERNAME:
      return {...state, username: action.payload};
    case SET_PASSWORD:
      return {...state, password: action.payload};
    default: return state;
  }
};

// Action Creators
const setUsername = (name) => {
  return { type: SET_USERNAME, payload: name };
};

const setPassword = (pass) => {
  return { type: SET_PASSWORD, payload: pass };
};

export default reducer;
export {
  // Actions
  SET_USERNAME,
  SET_PASSWORD,
  // Action Creators
  setUsername,
  setPassword
};
