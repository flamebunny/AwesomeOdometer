import styled, { keyframes } from 'react-emotion'

const slide = keyframes`
  from {
    transform: translateY(-10em);
  }

  to {
    transform: translateY(0);
  }
`
export const OdometerStyled = styled('div')({
  textShadow: '0 -1px rgba(0, 0, 0, 0.9)',
  color: 'rgba(255, 255, 255, 0.9)',
  margin: '2em auto',
  display: 'inline-block',
  background: '#222',
  borderRadius: '2px',
  boxShadow: 'inset 0 2px 8px -2px #000'
})

export const DigitStyled = styled('div')({
  display: 'inline-block',
  height: '1em',
  width: '1em',
  overflow: 'hidden',
  borderRight: '1px solid rgba(0, 0, 0, 0.5)',
  borderLeft: '1px solid rgba(255, 255, 255, 0.05)',
  padding: '0 0.2em',

  '&:first-child': {
    borderLeft: 'none'
  }
})

export const DigitContainerStyled = styled('div')(
  {
    overflow: 'hidden',
    animation: `${slide} infinite linear`,
  },
  ({ level }) =>
    {
      switch(level) {
        case 0:
          return {animationDuration:  `${1*500}ms`}
        case 1:
          return {animationDuration:  `${10*500}ms`}
        case 2:
          return {animationDuration:  `${100*500}ms`}
        case 3:
          return {animationDuration:  `${1000*500}ms`}
        default:
          return {animationDuration:  `${100*500}ms`}
      }
    }
  ,
)
