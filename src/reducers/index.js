import { combineReducers } from 'redux'
import filters from './filtersReducer'
import projects from './projectsReducer'

const rootReducer = combineReducers({
    filters,
    projects
})

export default rootReducer;