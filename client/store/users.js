import {createStore, applyMiddleware} from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'

const RECEIVE_USERS = 'RECEIVE_USERS'
const RECEIVE_USER = 'RECEIVE_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USERS = 'UPDATE_USERS'

const gotUsers = users => ({
  type: RECEIVE_USERS,
  users
})

const gotUser = user => ({
  type: 'RECEIVE_USER',
  user
})

const removedUser = userId => ({
  type: REMOVE_USER,
  userId
})

const updatedUsers = users => ({
  type: UPDATE_USERS,
  users
})

export const getUsers = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users')
    dispatch(gotUsers(data))
  } catch(err) {
    console.error(err)
  }
}

export const addUser = userData => async dispatch => {
  try {
    const {data} = await axios.post(`/api/users`, userData)
    dispatch(gotUser(data))
  } catch(err) {
    console.error(err)
  }
}

export const removeUser = id => async dispatch => {
  try {
    await axios.get(`/api/users/${id}`)
    dispatch(removedUser(id))
  } catch(err) {
    console.error(err)
  }
}

const initialState = []

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return action.users
    case RECEIVE_USER:
      const alreadyIn = state.some(eachUser => eachUser.id === action.user.id);
      if (alreadyIn) {
        return state.map(eachUser => {
          if (eachUser.id === action.user.id) {
            return action.user;
          } else {
            return eachUser;
          }
        });
      } else {
        return [...state, action.user];
      }
    case REMOVE_USER:
      return state.filter(eachUser => eachUser.id !== action.userId)
    default:
      return state
  }
}

export default usersReducer
