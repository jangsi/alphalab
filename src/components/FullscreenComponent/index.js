import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import './index.scss'
import { isMobileOrTablet } from '../../pages/Utility/isMobileOrTablet'

const FullscreenComponent = (props) => {
  const [isFullscreen, setFullscreen] = useState(false)
  const [icon, setIcon] = useState('mdi mdi-18px mdi-arrow-expand')
  // accomodate the padding
  // todo: get from variable
  const [innerHeight, setInnerHeight] = useState(window.innerHeight - 40)
  const [innerWidth, setInnerWidth] = useState(window.innerWidth - 40)
  const headerRef = useRef()

  useEffect(() => {
    if (!headerRef.current || !isFullscreen) return

    const boundingBox = headerRef.current.getBoundingClientRect()
    if (boundingBox.height && !isMobileOrTablet()) {
      // make room for the header
      setInnerHeight(window.innerHeight - 40 - boundingBox.height)
    }
  }, [headerRef, isFullscreen])

  useEffect(() => {
    const updateWindowDimensions = () => {
      setInnerHeight(window.innerHeight - 40)
      setInnerWidth( window.innerWidth - 40)
    }

    window.addEventListener('resize', updateWindowDimensions);
    return () => window.removeEventListener('resize', updateWindowDimensions) 
  }, [])

  const [screenAngle, setScreenAngle] = useState(window.orientation)
  useEffect(() => {
    const orientationchangeListener = () => {
      setScreenAngle(window.orientation)
    }
    window.addEventListener('orientationchange', orientationchangeListener)

    return () => window.removeEventListener('orientationchange', orientationchangeListener)
  }, [])

  const toggleFullscreen = () => {
    setFullscreen(!isFullscreen)
    if (icon === 'mdi mdi-18px mdi-arrow-expand') {
      setIcon('mdi mdi-18px mdi-arrow-collapse')
    } else {
      setIcon('mdi mdi-18px mdi-arrow-expand')
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
        width: isFullscreen ? innerWidth : '100%',
      },
      maybeRotatedContainer: function() {
        if (isMobileOrTablet() && isFullscreen) {
          let adjustment = 0
          if (headerRef.current) {
            const boundingBox = headerRef.current.getBoundingClientRect()
            adjustment = boundingBox.height
          }

          if (screenAngle !== 0) {
            const container = this.container
            return {
              ...container,
              height: container.height - adjustment
            }
          }
          
          return {
            height: this.container.width - adjustment,
            width: this.container.height,
          }
        }
        return this.container
      }
    },
    isFullscreen,
    headerRef,
  }

  const computedStyles = {
    height: '100%',
    width: '100%',
  }

  if (isFullscreen && isMobileOrTablet() && screenAngle === 0) {
    computedStyles.height = '100vw'
    computedStyles.width = '100vh'
  }

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
