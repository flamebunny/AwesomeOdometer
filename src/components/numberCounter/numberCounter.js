import React from 'react'
import { connect } from 'react-redux'
import { Odometer } from '../odometer/odometer'

export const NumberCounter = ({ randomNumber }) =>
  <div>
    <Odometer start={1.01} end={1.05} duration={700} action={'step'} />
    <Odometer start={10.01} end={15.05} duration={700} action={'step'} />
    <Odometer start={100.01} end={156.05} duration={700} action={'step'} />
    ------------------------
    <Odometer start={1.01} end={1.05} duration={700} action={'turn'} />
    <Odometer start={10.01} end={15.05} duration={700} action={'turn'} />
    <Odometer start={100.01} end={156.05} duration={700} action={'turn'} />
  </div>
export default connect(state => state.randNum)(NumberCounter)
