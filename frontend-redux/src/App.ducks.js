// Actions
const SET_USER    = 'app/app/SET_USER';
const UNSET_USER  = 'app/app/UNSET_USER';

const initialState = {
  username: '',
  isAuthenticated: localStorage.getItem('token') ? true : false
};

// Reducer
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER:
      return { username: action.payload.username, isAuthenticated: true };
    case UNSET_USER:
      return { username: '', isAuthenticated: false };
    default: return state;
  }
};

// Action Creators
const setUser = (payload) => {
  return { type: SET_USER, payload };
};

const unsetUser = () => {
  return { type: UNSET_USER };
};

export default reducer;
export {
  // Actions
  SET_USER,
  UNSET_USER,
  // Action Creators
  setUser,
  unsetUser
};
