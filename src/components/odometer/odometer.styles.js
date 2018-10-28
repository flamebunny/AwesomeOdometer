import styled, { keyframes } from 'react-emotion'

const slide = ( viewport ) => keyframes({
  '0%': {
    transform: 'translateY(0)'
  },
  '100%': {
    transform: `translateY(-100%) translateY(${viewport}em)`
  },
})

export const OdometerStyled = styled('div')(
  {
    display: 'inline-block',
    overflow: 'hidden',
  },
  ({ theme }) => {
    switch (theme) {
      case 'light':
        return {
          background: '#F4F4F4',
          boxShadow: 'inset 0 2px 8px -2px #000',
          color: 'rgba(0, 0, 0, 0.9)',
          borderRadius: '2px',
        }
      case 'dark':
        return {
          background: '#222',
          boxShadow: 'inset 0 2px 8px -2px #000',
          color: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '2px',
        }
      default:
        return {}
    }
  }
)

export const DigitStyled = styled('div')(
  {
    display: 'inline-block',
    position: 'relative',
    boxSizing: 'unset',
  },
  ({ viewport }) => ({
    height: `${viewport}em`,
  }),
  ({ isDecimal }) => ({
    width: isDecimal ? '0.3em' : '0.6em'
  }),
  ({ theme }) => {
    switch (theme) {
      case 'light':
        return {
          borderRight: '1px solid rgba(255, 255, 255, 0.5)',
          borderLeft: '1px solid rgba(0, 0, 0, 0.05)',
          padding: '0 0.2rem',
          '::first-child': {
            borderLeft: 'none'
          },
        }
      case 'dark':
        return {
          borderRight: '1px solid rgba(0, 0, 0, 0.5)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.05)',
          padding: '0 0.2rem',
          '::first-child': {
            borderLeft: 'none'
          },
        }
      default:
        return {}
    }
  },
  ({ customStyling }) => ({
    borderLeft: customStyling.borderLeft,
    borderRight: customStyling.borderRight,
    padding: customStyling.padding
  }),
)

export const DigitContainerStyled = styled('div')(
  {
    overflow: 'hidden',
    animationFillMode: 'forwards',
    display: 'flex',
    position: 'relative',
    animationDelay: '1000ms',
  },
  ({ viewport }) => ({
    lineHeight: viewport,
  }),
  ({ startAnim, viewport }) => ({
    animationName: startAnim ? `${slide(viewport)}` : 'none',
  }),
  ({ turnCount, animation, easing })  => {
    switch (animation) {
      case 'turn':
        return {
          animationTimingFunction: easing
        }
      case 'step':
        return {
          animationTimingFunction: `steps(${turnCount}, end)`
        }
      default:
        return {
          animationTimingFunction: easing
        }
    }
  },
  ({ duration }) => ({
    animationDuration: `${duration}ms`,
  })
)

