
export function numberReducer(state = { randomNumber: 0 }, action = { type: '' }) {
  switch (action.type) {

    case 'RANDOMIZE_NUMBER_SET':
      return {
        ...state,
        randomNumber: action.randomNumber
      }

    default:
      return state
  }
}
