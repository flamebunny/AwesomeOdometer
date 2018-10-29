import React from 'react'
import styled from 'react-emotion'
import { connect } from 'react-redux'
import { Odometer } from '../odometer/odometer'

const NumberCounterStyled = styled('div')({
  fontSize: '5rem',
  margin: '5rem'
})

export const NumberCounter = ({ randomNumber }) =>
  <NumberCounterStyled>
    <div><Odometer start={1050.01} end={1560.15} maxTurnCount={10} theme='dark' prefix='$' animation='turn' duration={1000} /></div>
    <br/>
    <div><Odometer start={1560.15} end={1050.01} maxTurnCount={10} theme='dark' prefix='$' animation='turn' duration={10000} /></div>

  </NumberCounterStyled>

export default connect(({ randNum }) =>
  ({
    randomNumber: randNum
  })
)(NumberCounter)