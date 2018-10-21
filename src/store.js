import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { numberReducer } from './reducers/randNumber'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  combineReducers({ randNum: numberReducer }),
  composeEnhancers(applyMiddleware(thunk)/*, persistState()*/)
)