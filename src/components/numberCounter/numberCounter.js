import React from 'react'
import { connect } from 'react-redux'
import { Odometer } from '../odometer/odometer'

export const NumberCounter = ({ randomNumber }) =>
  <Odometer start={12} end={15} duration={2000} />

export default connect(state => state.randNum)(NumberCounter)
