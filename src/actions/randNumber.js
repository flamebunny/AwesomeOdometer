export const RANDOMIZE_NUMBER_SET = 'RANDOMIZE_NUMBER_SET'
export function randomizeNumberSet(randomNumber) {
  return {
    type: RANDOMIZE_NUMBER_SET,
    randomNumber
  }
}