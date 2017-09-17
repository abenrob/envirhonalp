import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function filtersReducer(state = initialState.filters, action) {
  switch(action.type) {
    case types.SET_PROJECT_FILTERS:
      return action.payload
    default: 
      return state
  }
}