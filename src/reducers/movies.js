export function moviesReducer(state = { fetching: false, movies: [], errorMessage: '' }, action = { type: '' }) {
  switch (action.type) {
    case 'GET_MOVIES':
      console.log(action)
      return {
        ...state,
        movies: action.movies
      }

    case 'MOVIES_FETCH':
      return {
        ...state,
        fetching: true
      }

    case 'MOVIES_FETCH_SUCCESS':
      return {
        ...state,
        fetching: false,
        errorMessage: '',
        movies: action.movies
      }

    case 'MOVIES_FETCH_FAILED':
      return {
        ...state,
        fetching: false,
        errorMessage: action.errorMessage
      }

    default:
      return state
  }
}