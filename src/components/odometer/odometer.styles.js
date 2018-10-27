import styled, { keyframes } from 'react-emotion'

const slide = keyframes({
  '0%': {
    transform: 'translateY(0)'
  },
  '100%': {
    transform: 'translateY(-100%) translateY(1.7rem)'
  }
})

export const OdometerStyled = styled('div')({
  overflow: 'hidden'
})

export const DigitContainerStyled = styled('div')(
  {
    overflow: 'hidden',
    animationFillMode: 'forwards',
    display: 'flex',
    position: 'relative',
  },
  ({ startAnim }) => ({
    animationName: startAnim ? `${slide}` : 'none',
  }),
  ({ turnCount, action })  => {
    switch (action) {
      case 'turn':
        return {
          animationTimingFunction: 'ease-out'
        }
      case 'step':
        return {
          animationTimingFunction: `steps(${turnCount}, end)`
        }
      default:
        return {
          animationTimingFunction: 'ease-out'
        }
    }
  },
  ({ duration }) => ({
    animationDuration: `${duration}ms`,
  })
)

export const DigitStyled = styled('div')(
  {
    display: 'inline-block',
    height: '1.7rem',
    position: 'relative',
    overflow: 'hidden',
  },
  ({ isDecimal }) => ({
    width: isDecimal ? '0.4rem' : '0.8rem'
  })
)
