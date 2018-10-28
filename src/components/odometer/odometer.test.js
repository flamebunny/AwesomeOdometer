import * as React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import 'jest-enzyme'
import { Odometer } from './odometer.js'
import { DigitContainerStyled } from './odometer.styles'

describe('Odometer component tests', () => {
  describe('When mounted', () => {
    let component

    beforeEach(() => {
      component = mount(<Odometer start={4.55} end={5.10} duration={700} action={'turn'} startAnim={true} prefix={'$'} />)
    })

    afterEach(() => {
      component.unmount()
      component = null
    })

    it('Renders correctly', () => {
      expect(component).toMatchSnapshot()
    })

    it('Should contain correct value', () => {
      expect(component.find(DigitContainerStyled).at(1)).toHaveText('4 5')
      expect(component.find(DigitContainerStyled).at(2)).toHaveText('.')
      expect(component.find(DigitContainerStyled).at(3)).toHaveText('5 6 7 8 9 0 1')
      expect(component.find(DigitContainerStyled).at(4)).toHaveText('5 0 6 1 7 2 8 3 9 4 0')
    })
  })
})
