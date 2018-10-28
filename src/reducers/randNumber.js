
export const RANDOMIZE_NUMBER_SET = 'RANDOMIZE_NUMBER_SET'
export default function numberReducer(state = { randomNumber: 0 }, action = { type: '' }) {
  switch (action.type) {

    case RANDOMIZE_NUMBER_SET:
      return {
        ...state,
        randomNumber: action.randomNumber
      }

    default:
      return state
  }
}
