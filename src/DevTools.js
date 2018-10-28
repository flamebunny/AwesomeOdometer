import React from 'react'
import { createDevTools } from 'redux-devtools'
import Dispatch from 'redux-devtools-dispatch'
import * as randNumberActions from './actions/randNumber'

export default createDevTools(
  <Dispatch actionCreators={{
    randNumber: randNumberActions,
  }} />
)