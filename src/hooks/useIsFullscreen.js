import React, { useContext, useState } from 'react'

export const IsFullscreenContext = React.createContext({
  isFullscreen: false,
  setIsFullscreen: () => {}
})

export const useIsFullscreenContext = () => useContext(IsFullscreenContext)

export const useIsFullScreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false)

  return {
    isFullscreen,
    setIsFullscreen
  }
}
