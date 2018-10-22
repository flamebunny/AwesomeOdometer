import styled, { keyframes } from 'react-emotion'

const slide = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
`

const slideDown = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(1.5rem);
  }

`



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
    animation: `${slide} 1.5s linear`,
    animationFillMode: 'forwards',
    display: 'flex',
    position: 'relative',

  //  top: '-1rem',
  },
  ({ level }) =>
    {
      switch(level) {
        case 0:
          return {
              animationDuration:  `${3*500}ms`,
       //     top: '0.5rem',
       //     transition: `top 1500ms`,
          }

        case 1:
          return {
              animationDuration:  `${3*500}ms`,
      //      top: '0.5rem',
      //      transition: `top 1500ms`,
          }
        case 2:
          return {animationDuration:  `${3*500}ms`}
        case 3:
          return {animationDuration:  `${1*500}ms`}
        default:
          return {animationDuration:  `${100*500}ms`}
      }
    }
  ,
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
    animation: `${slideDown} 1s linear`,
    animationFillMode: 'forwards',
    animationDuration:  `1000ms`,
    animationDelay: `500ms`,

    '&:first-child': {
      borderLeft: 'none'
    }
  }
)
