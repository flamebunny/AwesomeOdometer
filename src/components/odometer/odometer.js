import React from 'react'
import { OdometerStyled, DigitStyled, DigitContainerStyled } from './odometer.styles'



const numString = (start, end, turnCount) => {
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

//  console.log('end ', end)
//  console.log('turnCount ', turnCount)
/*
  if(turnCount > 10) {

//    console.log('turnCount ', turnCount)
    numberStr += end + ' '
  }
*/
//  console.log('turnCount ', turnCount)
  console.log('numberStr ', numberStr)
  return numberStr
}

const buildDigits = ({ start, end, turnCount, count, index }) => {
//  console.log('start ', start)
//  console.log('end ', end)


//  const turnCountNum = parseInt(turnCount, 10) <= 20 ? parseInt(turnCount, 10) : 20
  const turnCountNum = parseInt(turnCount, 10)


  return (
    <DigitContainerStyled level={index} count={count}>{numString(start, end, turnCountNum)}</DigitContainerStyled>
  )
}

const getTurns  = (start, startDigitsMatched, difference) =>  {
  let turns = []
  let currentTurnRotation = []
  let differenceArr = []
  let turnsArr = []
  let newstartDigitsMatched = [...startDigitsMatched]
  console.log('newstartDigitsMatched ', newstartDigitsMatched)
  // newstartDigitsMatched.push(0)

  const startDigitMatchedCount = startDigitsMatched.length


  startDigitsMatched.map((digit, index) => {
    newstartDigitsMatched.shift()
    if (newstartDigitsMatched.length  === 0) {
      newstartDigitsMatched.push(0)
    }
    let startJoined = parseInt(newstartDigitsMatched.join(''))
    console.log('startJoined ', startJoined)
    console.log('Math.pow(10, startDigitMatchedCount - 1 - index)', Math.pow(10, startDigitMatchedCount - 1 - index))
    console.log('startJoined / Math.pow(10, startDigitMatchedCount - 1 - index)', startJoined / Math.pow(10, startDigitMatchedCount - 1 - index))
    currentTurnRotation.push(startJoined / Math.pow(10, startDigitMatchedCount - 1 - index))
    differenceArr.push(difference / Math.pow(10, startDigitMatchedCount -1 - index))
    turnsArr.push(Math.floor((startJoined / Math.pow(10, startDigitMatchedCount - 1 - index)) + (difference / Math.pow(10, startDigitMatchedCount - 1 - index))))


    const startJoinedString = startJoined.toString().substr(1)
    startJoined = startJoinedString != '' ? parseInt(startJoinedString) : 0

    console.log('startJoinedString ', startJoinedString)


  })
  console.log('start ', start)
  console.log('startDigitsMatched ', startDigitsMatched)
  console.log('currentTurnRotation ', currentTurnRotation)
  console.log('differenceArr ', differenceArr)
  console.log('turnsArr ', turnsArr)

  return turnsArr
}

const buildOdometer = (start, end, duration) => {
  const startDigits = start.toString().split('')
  const endDigits = end.toString().split('')
  const startCount = startDigits.length
  const endCount = endDigits.length
  const countDifference = endCount - startCount
  const digitCount = Math.max(startCount,endCount)

//  console.log('startCount ', startCount)
//  console.log('endCount ', endCount)
//  console.log('digitCount ', digitCount)

  let startDigitsMatched = [...startDigits]
  let endDigitsMatched = [...endDigits]

  if (countDifference > 0) {
    startDigitsMatched = Array(Math.abs(countDifference)).fill(0).concat(startDigits)
  }
  if (countDifference < 0) {
    endDigitsMatched = Array(Math.abs(countDifference)).fill(0).concat(endDigits)
  }

  let digitDifferenceMatched = []
  startDigitsMatched.map((startDigit, index) => {
    let startDigitInit = (startDigitsMatched[index] === '_' || startDigitsMatched[index] === '.') ? 0 : startDigitsMatched[index]
    let endDigitInit = (endDigitsMatched[index] === '_' || endDigitsMatched[index] === '.') ? 0 : endDigitsMatched[index]

    endDigitInit = startDigitInit > endDigitInit ? endDigitInit + 10 : endDigitInit

    digitDifferenceMatched.push(Math.abs(parseInt(startDigitInit, 10) - parseInt(endDigitInit, 10)))

    return null
  })


//  console.log('countDifference ', countDifference)
//  console.log('startDigitsMatched ', startDigitsMatched)
//  console.log('endDigitsMatched ', endDigitsMatched)

  const difference = end - start

  const turnsArr = getTurns(start, startDigitsMatched, difference)

//  console.log('difference ', Math.pow(10, digitCount-0))

  return (
    <OdometerStyled>



      {digitDifferenceMatched.map((digitDiff, index) => {
  //      console.log('digitDiff ', digitDiff)
  //      console.log(digitCount - 1 - index)
  //      console.log('turnCount ', (difference / Math.pow(10, digitCount - 1 - index)))
  //      console.log('endDigitsMatched ', endDigitsMatched)
  //      console.log('endDigitsMatched ', endDigitsMatched[index])




        return (<DigitStyled key={index}>{buildDigits({ start: startDigitsMatched[index], end: endDigitsMatched[index], turnCount: turnsArr[index], count: digitCount - 1, index: index })}</DigitStyled>)
  //  return (<DigitStyled key={index}>{buildDigits({ start: startDigitsMatched[index], end: endDigitsMatched[index], turnCount: (digitDiff + Math.pow(10, index)), count: digitCount - 1, index: index })}</DigitStyled>)

      })}
    </OdometerStyled>
  )

}

export const Odometer = ({ start, end, duration }) => {
  return (
    <div>
      {buildOdometer(start, end, duration)}
    </div>
  )
}


