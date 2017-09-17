/*
 * action types
 */

export const SET_PROJECT_FILTERS = 'FILTER_PROJECTS'
export const GET_FILTERED_PROJECTS = 'GET_FILTERED_PROJECTS'

/*
 * action creators
 */

export function setProjectFilters(filters) {
    return { type: SET_PROJECT_FILTERS, filters }
}

export function getFilterProjects(projects) {
    return { type: SET_PROJECT_FILTERS, projects }
}