import React from 'react'
import { OdometerStyled, DigitStyled, DigitContainerStyled } from './odometer.styles'



const buildDigits = (start, turnCount, count, index) => {
  const startNum = parseInt(start)
  const turnCountNum = parseInt(turnCount)

  const numString = (start, turnCount) => {
    console.log('start ', start)
    console.log('turnCount ', turnCount)
    let numberStr = ''
    for (let i = 0; i <=  turnCount; i++ )  {
      numberStr += ((i + start) % 10) + ' '
    }
    console.log('numberStr ', numberStr)
    return numberStr
  }

  return (
    <DigitContainerStyled level={count-index} count={count}>{numString(startNum, turnCountNum)}</DigitContainerStyled>
  )
}

const buildOdometer = (start,  end) => {
  const startDigits = start.toString().split('')
  const endDigits = end.toString().split('')
  const startCount = startDigits.length - 1
  const endCount = endDigits.length - 1
  const difference = end - start
  let turnArray = []

  return (
    <OdometerStyled>
      {startDigits.map((startDigit, index) => {
        turnArray.push(Math.floor(difference / Math.pow(10, startCount-index)))
        return (<DigitStyled key={index}>{buildDigits(startDigit, Math.floor(difference / Math.pow(10, startCount-index)), startCount, index )}</DigitStyled>)
      })}
    </OdometerStyled>
  )

}

export const Odometer = ({ start, end }) => {
  return (
    <div>
      {buildOdometer(start, end)}
    </div>
  )
}


