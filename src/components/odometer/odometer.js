import * as React from 'react'
import { OdometerStyled, DigitStyled, DigitContainerStyled } from './odometer.styles'

/* ****************************************** */
/*

  Usage:
    <Odometer start={12.50} end={26.51} duration={700} action={'turn'} />

  Options:
    start: start value
    end: end value
    duration: animation duration
    action: animation types [turn, step]
      // turn - rotates digits
      // step - changes digits

  Future options:
    themes: foreground/background colors
    animation-timing: [linear, ease-in, ease-out, custom]


*/
/* ****************************************** */

const NumString = ({start, end, turnCount, action, count, index}) => {
  // Generates the number string for rotating number
  // Using maxTurnCount to limit length of string generted
  // When the string is too long the number rotates so fast that it is perceived to rotate backwards

  let maxTurnCount = turnCount
  switch(action) {
    case 'turn':
      maxTurnCount = 10
      break
    case 'step':
      maxTurnCount = turnCount
      break
    default:
      maxTurnCount = turnCount
      break
  }

  let numberStr = ''
  let countRunner = start
  const turns = turnCount > maxTurnCount ? maxTurnCount : turnCount
  const tickAddition = turns !== 0 ? turnCount / turns : 0

  // returns start if there are no turns
  if (turns !== 0) {
    numberStr = start + ' '
    for (let i = 0; i < turns - 1; i++)  {
      countRunner += tickAddition
      numberStr += (Math.floor(countRunner) % 10) + ' '
    }
    numberStr += end + ''
  } else {
    numberStr = start + ''
  }

  return numberStr
}

const GetTurns  = ({startDigitsMatched, difference}) =>  {
  // Calculates how many turns each digit needs to make to move from start to end number

  const currentTurnRotation = []
  const differenceArr = []
  const turnsArr = []
  const newstartDigitsMatched = [...startDigitsMatched]
  const startDigitMatchedCount = startDigitsMatched.length

  startDigitsMatched.map((digit, index) => {
    newstartDigitsMatched.shift()
    if (newstartDigitsMatched.length  === 0) {
      newstartDigitsMatched.push('0')
    }
    // merge array into string then convert to number
    let startJoined = parseInt(newstartDigitsMatched.join(''), 10)

    currentTurnRotation.push(startJoined / Math.pow(10, startDigitMatchedCount - 1 - index))
    differenceArr.push(difference / Math.pow(10, startDigitMatchedCount - 1 - index))
    turnsArr.push(Math.floor((startJoined / Math.pow(10, startDigitMatchedCount - 1 - index)) + (difference / Math.pow(10, startDigitMatchedCount - 1 - index))))

    const startJoinedString = startJoined.toString().substr(1)
    startJoined = startJoinedString !== '' ? parseInt(startJoinedString, 10) : 0
    return null
  })

  return turnsArr
}

export const Odometer = ({ start, end, duration = 700, action = 'turn', startAnim = true, prefix = '' }) => {

  // Math.floor prevents weird numbers from appearing
  // eg multiplying 17.51 by 100 produces 1751.0000000000002
  const startCopy = Math.round(start * 100)
  const endCopy = Math.round(end * 100)
  const startDigits = startCopy.toString().split('')
  const endDigits = endCopy.toString().split('')
  const difference = endCopy - startCopy
  const startCount = startDigits.length
  const endCount = endDigits.length
  const countDifference = endCount - startCount
  const digitCount = Math.max(startCount, endCount)
  let startDigitsMatched = [...startDigits]
  let endDigitsMatched = [...endDigits]

  if (countDifference > 0) {
    startDigitsMatched = Array(Math.abs(countDifference)).fill(0).concat(startDigits)
  }
  if (countDifference < 0) {
    endDigitsMatched = Array(Math.abs(countDifference)).fill(0).concat(endDigits)
  }

  const turnsArr = GetTurns({ startDigitsMatched, difference })

  const rows = []

  // Prefix
  if (prefix !== '') {
    rows.push(
      <DigitStyled key={'prefix'}>
        <DigitContainerStyled count={digitCount - 1} turnCount={0} startAnim={startAnim}>{prefix}</DigitContainerStyled>
      </DigitStyled>
    )
  }

  for (let index = 0; index < digitCount; index++) {
    rows.push(
      <DigitStyled key={index}>
        <DigitContainerStyled count={digitCount - 1} turnCount={turnsArr[index]} action={action} duration={duration} startAnim={startAnim}>{NumString({ start: parseInt(startDigitsMatched[index], 10), end: parseInt(endDigitsMatched[index], 10), turnCount: turnsArr[index], action, count: digitCount - 1, index })}</DigitContainerStyled>
      </DigitStyled>
    )

    // Decimal point added 2 digits from the end
    if (index === digitCount - 3) {
      rows.push(
        <DigitStyled isDecimal={true} key='decimal'>
          <DigitContainerStyled count={digitCount - 1} turnCount={0} startAnim={startAnim}>.</DigitContainerStyled>
        </DigitStyled>
      )
    }
  }

  return (
    <OdometerStyled>{rows}</OdometerStyled>
  )
}
