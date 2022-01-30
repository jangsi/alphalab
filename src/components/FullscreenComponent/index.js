import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import './index.scss'
import { isMobileOrTablet } from '../../pages/Utility/isMobileOrTablet'

const FullscreenComponent = (props) => {
  const [isFullscreen, setFullscreen] = useState(false)
  const [icon, setIcon] = useState('dripicons-expand')
  const [innerHeight, setInnerHeight] = useState(window.innerHeight - (isMobileOrTablet() ? 20 : 121) - 20)
  const [innerWidth, setInnerWidth] = useState(window.innerWidth - (isMobileOrTablet() ? 121 : 20))
  useEffect(() => {
    /* 121 is the sum of heights of all parts of the card, excluding the actual graph */
    setInnerHeight(window.innerHeight - (isMobileOrTablet() ? 20 : 121) - 20)
    setInnerWidth(window.innerWidth - (isMobileOrTablet() ? 121 : 20))
  }, [window.innerHeight, window.innerWidth])

  const [screenAngle, setScreenAngle] = useState(0)
  useEffect(() => {
    // device doesn't support the ScreenOrientation interface... fallback to orientationchange event
    if (!screen.orientation && window.orientation !== null && window.orientation !== undefined) {
      const orientationchangeListener = () => {
        setScreenAngle(window.orientation)
      }
      window.addEventListener('orientationchange', orientationchangeListener)

      return () => window.removeEventListener('orientationchange', orientationchangeListener)
    }
  }, [])

  // useEffect(() => {
  //   alert(`screen angle changed ${screenAngle}`)
  // }, [screenAngle])

  const toggleFullscreen = () => {
    setFullscreen(!isFullscreen)
    if (icon === 'dripicons-expand') {
      setIcon('dripicons-contract')
    } else {
      setIcon('dripicons-expand')
    }
  }

  const classes = []
  if (isFullscreen) classes.push('fullscreen')
  if (screenAngle === 90) classes.push('counterRotation90')
  if (screenAngle === -90) classes.push('counterRotation-90')

  if (isMobileOrTablet()) {
    classes.push('mobile')
  }

  const childrenProps = {
    toggleFullscreen,
    icon,
    chartParams: {
      container: {
        height: isFullscreen ? innerHeight : props.defaultHeight,
        width: isFullscreen ? innerWidth : undefined,
      },
      reverseContainer: (adj) => ({
        height: innerWidth + (adj || 0),
        width: innerHeight,
      })
    },
    isFullscreen,
  }

  const computedStyles = {
    height: '100%',
    width: '100%',
    overflow: 'auto',
  }

  if (isMobileOrTablet() && screenAngle === 0) {
    computedStyles.height = '100vw'
    computedStyles.width = '100vh'
  }
  // const computedStyles = {}

  return (
    <>
      {
        isFullscreen ? ReactDOM.createPortal(
          <div style={computedStyles} className={classes.join(' ')}>
            {props.children(childrenProps)}
          </div>,
          document.body,
        ) : props.children(childrenProps)
      }
    </>
  )
}

FullscreenComponent.propTypes = {
  children: PropTypes.func,
  defaultHeight: PropTypes.number,
}

export default FullscreenComponent
