import React, { useContext } from 'react'

export const IsFullscreenContext = React.createContext({
  isFullscreen: false,
  setIsFullscreen: (_) => null
})

export const useIsFullscreenContext = () => useContext(IsFullscreenContext)
