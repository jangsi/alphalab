import React, { useContext } from 'react'

// Used to disable scrolling when in fullscreen mode
export const IsOverflowLockContext = React.createContext({
  isOverflowLock: false,
  setIsOverflowLock: (_) => null
})

export const useIsOverflowLockContext = () => useContext(IsOverflowLockContext)
