import * as React from 'react'
import { OdometerStyled, DigitStyled, DigitContainerStyled } from './odometer.styles'

/* ****************************************** */
/*

  Usage:
    <Odometer start={12.50} end={26.51} duration={700} animation={'turn'} />

  Options:
    start: start value
    end: end value
    prefix: string value shown before value
    duration: animation duration
      // 1000 [Default]
    animation: animation types
      // turn [Default] - rotates digits
      // step - changes digits
    maxTurnCount: maximum number of turns for each digit
      // '10' [Default] (+ index*2, so each digit moves out of sync)
      // '0' - max turn count - warning, can be in the thousands if start/end value is more than 4 digits eg. 10.00
      // 'customvalue'  (+ index*2, so each digit moves out of sync)
    startAnim: set to true to start
      // false [Default]
      // true
    viewport: gap in which value can be seen rotating
      // 1.7 [Default]
    easing: custom animation timing
      // ease-out [Default]
      // ease-in
      // linear
      // custom eg: cubic-bezier(0,0,1,-1.49)
    theme: color theme
      // no theme [default]
      // dark
      // light
      // custom {background, color, border}
    custom: customize parts of the theme
      // borderLeft
      // borderRight
      // padding

*/
/* ****************************************** */

const NumString = ({ start, end, turnCount, maxTurns }) => {
  // Generates the number string for rotating number
  // Using maxTurnCount to limit length of string generted
  // When the string is too long the number rotates so fast that it is perceived to rotate backwards

  let numberStr = ''
  let countRunner = start
  const turns = maxTurns ? maxTurns : turnCount
  const tickAddition = turns !== 0 ? Math.floor(turnCount / turns) : 0

  // returns start if there are no turns
  if (turns !== 0) {
    numberStr = start + ' '
    for (let i = 0; i < turns - 1; i++)  {
      countRunner = countRunner += tickAddition
      numberStr += (Math.floor(countRunner) % 10) + ' '
    }
    numberStr += end + ''
  } else {
    numberStr = start + ''
  }

  return numberStr
}

const GetTurns  = ({ startDigitsMatched, difference }) =>  {
  // Calculates how many turns each digit needs to make to move from start to end number

  const turnsArr = []
  const newstartDigitsMatched = [...startDigitsMatched]
  const startDigitMatchedCount = startDigitsMatched.length
    startDigitsMatched.map((digit, index) => {
    // remove first item from array
    newstartDigitsMatched.shift()
    if (newstartDigitsMatched.length  === 0) {
      newstartDigitsMatched.push('0')
    }
    // merge array into string then convert to number
    let startJoined = parseInt(newstartDigitsMatched.join(''), 10)

    // What is the current turn rotation of the current digit  eg. 1500 the turn rotation of the first digit is 0.5, where 0 is 0% and 1 is 100%
    // currentTurnRotation.push(startJoined / Math.pow(10, startDigitMatchedCount - 1 - index))
    // Turn rotations needed to move to next digit
    // differenceArr.push(difference / Math.pow(10, startDigitMatchedCount - 1 - index))
    turnsArr.push(Math.floor((startJoined / Math.pow(10, startDigitMatchedCount - 1 - index)) + (difference / Math.pow(10, startDigitMatchedCount - 1 - index))))
    return null
  })
  return turnsArr
}

export const Odometer = ({ start, end, duration = 1000, animation = 'turn', maxTurnCount = 10, startAnim = true, prefix = '', viewport = 1.7, easing = 'ease-out', theme = 'none', customStyling =  {} }) => {

  // Math.round prevents weird numbers from appearing
  // eg multiplying 17.51 by 100 produces 1751.0000000000002
  const direction = end > start ? 'forward' : 'backward'
  // if direction is 'backwards' reverse start and end values
  const startCopy = direction === 'forward' ? Math.round(start * 100) : Math.round(end * 100)
  const endCopy = direction === 'forward' ? Math.round(end * 100) : Math.round(start * 100)
  const startDigits = startCopy.toString().split('')
  const endDigits = endCopy.toString().split('')
  const difference = Math.abs(endCopy - startCopy)
  const startCount = startDigits.length
  const endCount = endDigits.length
  const countDifference = endCount - startCount
  const digitCount = Math.max(startCount, endCount)
  let startDigitsMatched = [...startDigits]
  let endDigitsMatched = [...endDigits]

  // Ensure both start and end have the same number of digits
  // If start/end has fewer digits, add 0 in front
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
      <DigitStyled key={'prefix'} viewport={viewport} theme={theme} customStyling={customStyling}>
        <DigitContainerStyled count={digitCount - 1} turnCount={0} direction={direction} startAnim={startAnim} viewport={viewport} easing={easing} theme={theme}>{prefix}</DigitContainerStyled>
      </DigitStyled>
    )
  }

  for (let index = 0; index < digitCount; index++) {
    // Capped at 1000 turns
    const turnCount = turnsArr[index] > 1000 ? 1000 : turnsArr[index]
    const maxTurns = Math.min((maxTurnCount === 0 ? turnCount : maxTurnCount + index * 2), turnCount)

    rows.push(
      <DigitStyled key={index} viewport={viewport} theme={theme} customStyling={customStyling}>
        <DigitContainerStyled count={digitCount - 1} turnCount={maxTurns} direction={direction} animation={animation} duration={duration} startAnim={startAnim} viewport={viewport} easing={easing} theme={theme}>
          {NumString({ start: parseInt(startDigitsMatched[index], 10), end: parseInt(endDigitsMatched[index], 10), turnCount: turnsArr[index], maxTurns })}
        </DigitContainerStyled>
      </DigitStyled>
    )

    // Decimal point added 2 digits from the end
    if (index === digitCount - 3) {
      rows.push(
        <DigitStyled isDecimal={true} key='decimal' viewport={viewport} theme={theme} customStyling={customStyling}>
          <DigitContainerStyled count={digitCount - 1} turnCount={0} direction={direction} startAnim={startAnim} viewport={viewport} easing={easing} theme={theme}>.</DigitContainerStyled>
        </DigitStyled>
      )
    }
  }

  return (
    <OdometerStyled theme={theme}>{rows}</OdometerStyled>
  )
}
