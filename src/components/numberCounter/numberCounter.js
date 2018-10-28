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
    <div><Odometer start={10500.01} end={1560.05} maxTurnCount={10} theme='dark' prefix='$' animation='turn' duration={2000} /></div>
    <br/>
    <div><Odometer start={10500.01} end={1560.15} maxTurnCount={10} theme='dark' prefix='$' animation='step' duration={2000} /></div>
  </NumberCounterStyled>

export default connect(({ randNum }) =>
  ({
    randomNumber: randNum
  })
)(NumberCounter)