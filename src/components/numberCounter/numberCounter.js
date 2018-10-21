import React from 'react'
import { connect } from 'react-redux'
import { Odometer } from '../odometer/odometer'

export const NumberCounter = ({ randomNumber }) =>
  <Odometer start={10} end={35} />

export default connect(state => state.randNum)(NumberCounter)
