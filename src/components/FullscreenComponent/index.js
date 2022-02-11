import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import './index.scss'
import { isMobileOrTablet } from '../../pages/Utility/isMobileOrTablet'
import { useIsOverflowLockContext } from '../../hooks/useIsOverflowLock'

const FullscreenComponent = (props) => {
  const [isFullscreen, setFullscreen] = useState(false)
  const [icon, setIcon] = useState('mdi mdi-18px mdi-arrow-expand')
  const defaultCardPadding = 40
  // accomodate the card padding (40px)
  const [innerHeight, setInnerHeight] = useState(window.innerHeight - defaultCardPadding)
  const headerRef = useRef()
  const overflowLockContext = useIsOverflowLockContext()

  useEffect(() => {
    if (!headerRef.current || !isFullscreen) return

    const boundingBox = headerRef.current.getBoundingClientRect()
    if (boundingBox.height && !isMobileOrTablet()) {
      // make room for the header
      setInnerHeight(window.innerHeight - defaultCardPadding - boundingBox.height)
    }
  }, [headerRef, isFullscreen])

  const [screenAngle, setScreenAngle] = useState(window.orientation)
  useEffect(() => {
    const orientationchangeListener = () =>  {
      setScreenAngle(window.orientation)
      setInnerHeight(window.innerHeight - defaultCardPadding)
    }
    window.addEventListener('orientationchange', orientationchangeListener)
    return () => window.removeEventListener('orientationchange', orientationchangeListener)
  }, [])

  const toggleFullscreen = () => {
    overflowLockContext.setIsOverflowLock(!isFullscreen)
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
        width: isFullscreen ? window.innerWidth - defaultCardPadding : '100%',
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
              height: container.height - adjustment,
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

  const ChartView = props.children(childrenProps);

  return (
    <>
      {
        isFullscreen ? ReactDOM.createPortal(
          <div style={computedStyles} className={classes.join(' ')}>
            {ChartView}
          </div>,
          document.body,
        ) : ChartView
      }
    </>
  )
}

FullscreenComponent.propTypes = {
  children: PropTypes.func,
  defaultHeight: PropTypes.number,
}

export default FullscreenComponent
