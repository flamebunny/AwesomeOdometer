import React from 'react'
import styled from 'react-emotion'
import './index.css'
import DevTools from './DevTools'
import NumberCounter from './components/numberCounter/numberCounter'
import { inDevelopmentMode } from 'utils/development'

const DevToolsStyled = styled('div')({
  width: '100%',
  position: 'absolute',
  left: 0,
  bottom: 0,
  backgroundColor: 'black'
})

export default () =>
  <div>
    <NumberCounter  />
    {inDevelopmentMode() ? <DevToolsStyled>
      <DevTools />
    </DevToolsStyled> : null}
  </div>
