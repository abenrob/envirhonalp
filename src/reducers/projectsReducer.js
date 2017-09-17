import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function filtersReducer(state = initialState.projects, action) {
  switch(action.type) {
    case types.GET_FILTERED_PROJECTS:
      return action.payload
    default: 
      return state
  }
}