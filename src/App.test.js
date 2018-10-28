import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import { Provider } from 'react-redux'
import App from './App'
import createStore from 'store/store'
import { NumberCounter } from 'components/numberCounter/numberCounter'

Enzyme.configure({ adapter: new Adapter() })

describe('App tests', () => {
  describe('When mounted with a store', () => {
    describe('With no dispatching of actions', () => {
      let component

      beforeAll(() => {
        const store = createStore()
        component = mount(<Provider store={store}><App /></Provider>)
      })

      it('Renders the number counter component', () => {
        expect(component.find(NumberCounter).html()).not.toBe(null)
      })

    })
  })
})