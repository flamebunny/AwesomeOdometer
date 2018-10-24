import React from 'react'
import { connect } from 'react-redux'
import { Odometer } from '../odometer/odometer'

export const NumberCounter = ({ randomNumber }) =>
  <Odometer start={12.50} end={26.51} duration={700} action={'turn'} />

export default connect(state => state.randNum)(NumberCounter)
