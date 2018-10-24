// action - turn, step


import React from 'react'
import { OdometerStyled, DigitStyled, DigitContainerStyled } from './odometer.styles'

const numStringOrig = ({start, end, turnCount}) => {
  let numberStr = ''
  let startNum = start

  for (let i = 0; i <= turnCount; i++ )  {
    if(startNum === '_') {
      numberStr += '_ '
      startNum = 0
    } else if(startNum === '.') {
      numberStr += ' '
    } else {
      numberStr += ((i + parseInt(startNum, 10)) % 10) + ' '   // adds index to start and gets the last character
    }
  }
  console.log('numberStr ', numberStr)
  return numberStr
}

const numString = ({start, end, turnCount, action, count, index}) => {
  // Generates the number string for rotating number
  // Using maxTurnCount to limit length of string generted
  // When the string is too long the number rotates so fast that it is perceived to rotate backwards


//  const maxTurnCount = 10 + index * 5

  console.log('---------------------------------------')
  console.log('start ', start)
  console.log('end ', end)
  console.log('turnCount ', turnCount)
  console.log('action ', action)
  console.log('count ', count)
  console.log('index ', index)


  let maxTurnCount = turnCount

  switch(action) {
    case 'turn':
      maxTurnCount = 10 + index * 5
      break
    case 'step':
      maxTurnCount = turnCount
      break
    default:
      maxTurnCount = turnCount
      break
  }

  console.log('maxTurnCount ', maxTurnCount)

  let numberStr = ''
  let startNum = parseInt(start, 10)

  let countRunner = startNum
  const turns = turnCount > maxTurnCount ? maxTurnCount : turnCount
  const tickAddition = turnCount / turns

  console.log('tickAddition ', tickAddition)

  numberStr = start + ' '
  for (let i = 0; i < turns - 1; i++ )  {
    countRunner += tickAddition
    numberStr += (parseInt(countRunner, 10) % 10) + ' '
  }
  numberStr += end + ' '

  console.log('numberStr ', numberStr)

  return numberStr
}

const getTurns  = ({startDigitsMatched, difference}) =>  {
  let currentTurnRotation = []
  let differenceArr = []
  let turnsArr = []
  let newstartDigitsMatched = [...startDigitsMatched]

  const startDigitMatchedCount = startDigitsMatched.length

  startDigitsMatched.map((digit, index) => {
    newstartDigitsMatched.shift()
    if (newstartDigitsMatched.length  === 0) {
      newstartDigitsMatched.push(0)
    }
    // merge array into string then convert to number
    let startJoined = parseInt(newstartDigitsMatched.join(''), 10)

    currentTurnRotation.push(startJoined / Math.pow(10, startDigitMatchedCount - 1 - index))
    differenceArr.push(difference / Math.pow(10, startDigitMatchedCount -1 - index))
    turnsArr.push(Math.floor((startJoined / Math.pow(10, startDigitMatchedCount - 1 - index)) + (difference / Math.pow(10, startDigitMatchedCount - 1 - index))))

    const startJoinedString = startJoined.toString().substr(1)
    startJoined = startJoinedString !== '' ? parseInt(startJoinedString, 10) : 0
    return null
  })
/*
  console.log('start ', start)
  console.log('startDigitsMatched ', startDigitsMatched)
  console.log('currentTurnRotation ', currentTurnRotation)
  console.log('differenceArr ', differenceArr)
*/
  console.log('turnsArr ', turnsArr)

  return turnsArr
}

const buildOdometer = ({start, end, duration, action}) => {

  console.log('duration ', duration)

  let startCopy = start
  let endCopy = end

  const startHasDecimals = start % 1 !== 0
  const endHasDecimals = end % 1 !== 0

  if (startHasDecimals || endHasDecimals) {
    startCopy = startCopy * 100
    endCopy = endCopy * 100
  }
/*
  console.log('startHasDecimals ', startHasDecimals)
  console.log('endHasDecimals ', endHasDecimals)
  console.log('start ', start)
  console.log('end ', end)
  console.log('startCopy ', startCopy)
  console.log('endCopy ', endCopy)
*/
  const startDigits = startCopy.toString().split('')
  const endDigits = endCopy.toString().split('')
  const difference = endCopy - startCopy
  const startCount = startDigits.length
  const endCount = endDigits.length
  const countDifference = endCount - startCount
  const digitCount = Math.max(startCount,endCount)

  let startDigitsMatched = [...startDigits]
  let endDigitsMatched = [...endDigits]
  let rows = []
/*
  console.log('startDigits ', startDigits)
  console.log('startHasDecimals ', startHasDecimals)
  console.log('startDigitsMatched ', startDigitsMatched)
  console.log('endDigits ', endDigits)
  console.log('endHasDecimals ', endHasDecimals)
  console.log('endDigitsMatched ', endDigitsMatched)
*/
  // start: 9
  // end: 15
  // startDigitsMatched: 09
  // endDigitsMatched: 15

  if (countDifference > 0) {
    startDigitsMatched = Array(Math.abs(countDifference)).fill(0).concat(startDigits)
  }
  if (countDifference < 0) {
    endDigitsMatched = Array(Math.abs(countDifference)).fill(0).concat(endDigits)
  }

  const turnsArr = getTurns({startDigitsMatched: startDigitsMatched, difference: difference})

  for (let index = digitCount -1; index >= 0; index--) {

    if ((startHasDecimals || endHasDecimals) && index === 1) {
      rows.unshift(
        <DigitStyled key='decimal'>
          <DigitContainerStyled level={index} count={digitCount - 1} turnCount={0}>.</DigitContainerStyled>
        </DigitStyled>
      )
    }

    rows.unshift(
      <DigitStyled key={index}>
        <DigitContainerStyled level={index} count={digitCount - 1} turnCount={parseInt(turnsArr[index], 10)} action={action} duration={duration}>{numString({start: parseInt(startDigitsMatched[index], 10), end: parseInt(endDigitsMatched[index], 10), turnCount: parseInt(turnsArr[index], 10), action: action, count: digitCount - 1, index: index})}</DigitContainerStyled>
      </DigitStyled>
    )
  }

  return (
    <OdometerStyled>{rows}</OdometerStyled>
  )

}

export const Odometer = ({ start, end, duration, action }) => {
  return (
    <div>
      {buildOdometer({start, end, duration, action})}
    </div>
  )
}
