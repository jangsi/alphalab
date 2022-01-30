import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import './index.scss'

const FullscreenComponent = (props) => {
  const [isFullscreen, setFullscreen] = useState(false)
  const [icon, setIcon] = useState('dripicons-expand')

  const toggleFullscreen = () => {
    setFullscreen(!isFullscreen)
    if (icon === 'dripicons-expand') {
      setIcon('dripicons-contract')
    } else {
      setIcon('dripicons-expand')
    }
  }

  const childrenProps = {
    toggleFullscreen,
    icon,
    /* 121 is the sum of heights of all parts of the card, excluding the actual graph */
    height: isFullscreen ? (window.innerHeight - 121) : props.defaultHeight,
  }

  return (
    <>
      {
        isFullscreen ? ReactDOM.createPortal(
          <div className={'fullscreen'}>
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
