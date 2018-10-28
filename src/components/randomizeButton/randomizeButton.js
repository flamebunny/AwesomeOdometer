import React from 'react'
import { connect } from 'react-redux'
import { randomizeNumberSet } from '../../actions/randNumber'

export const RandomizeButton = ({ randomizeNumberSet }) => {

  function numberRandom() {
    const min = 10.00,
          max = 20.00,
  //        generateNumber = Math.random() * (max - min) + min
          generateNumber = parseInt(Math.random() * (max - min) + min, 10)

  //  randomizeNumberSet(generateNumber.toFixed(2))
    randomizeNumberSet(generateNumber)
  }

  return (
  <button onClick={numberRandom}>Randomize Number</button>
  )
}

export default connect(null, { randomizeNumberSet })(RandomizeButton)
