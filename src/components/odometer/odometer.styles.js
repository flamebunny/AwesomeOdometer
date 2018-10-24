import styled, { keyframes } from 'react-emotion'

const slide = keyframes({
  '0%': {
    transform: 'translateY(0)'
  },
  '100%': {
    transform: 'translateY(-100%) translateY(1.5rem)'
  }
})

export const OdometerStyled = styled('div')({
  textShadow: '0 -1px rgba(0, 0, 0, 0.9)',
  color: 'rgba(255, 255, 255, 0.9)',
  margin: '2rem auto',
  display: 'inline-block',
  background: '#222',
  borderRadius: '2px',
  boxShadow: 'inset 0 2px 8px -2px #000',
  overflow: 'hidden'
})

export const DigitContainerStyled = styled('div')(
  {
    overflow: 'hidden',
    animationName: `${slide}`,
    animationFillMode: 'forwards',
    animationDelay: '1000ms',
    display: 'flex',
    position: 'relative',
  },
  ({ turnCount, action })  => {
    switch(action) {
      case 'turn':
        return {
          animationTimingFunction: 'ease-out'
        }
      case 'step':
        return {
          animationTimingFunction: `steps(${turnCount}, end)`
        }
    }
  },
  ({ duration }) => {
    return {
      animationDuration: `${duration}ms`,
    }
  },
  ({ level }) =>{

    switch(level) {
      case 0:
        return {
//          animationDuration:  `${3*500}ms`,
        }
      case 1:
        return {
//          animationDuration:  `${3*500}ms`,
        }
      case 2:
        return {
//            animationDuration:  `${3*500}ms`
          }
      case 3: {
        return {
//          animationDuration:  `${1*500}ms`
        }
      }
      default:
        return {
//          animationDuration:  `${100*500}ms`
        }
    }
  },
)

export const DigitStyled = styled('div')(
  {
    display: 'inline-block',
    height: '1rem',
    width: '1rem',
    position: 'relative',
  //  overflow: 'hidden',
    borderRight: '1px solid rgba(0, 0, 0, 0.5)',
    borderLeft: '1px solid rgba(255, 255, 255, 0.05)',
    padding: '0 0.2rem',

    '&:first-child': {
      borderLeft: 'none'
    }
  }
)
