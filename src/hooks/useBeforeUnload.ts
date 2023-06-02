// https://github.com/jacobbuck/react-beforeunload/issues/13
import { useEffect, useRef } from 'react'

export function useBeforeUnload(handler: (event: BeforeUnloadEvent) => void) {
  const handlerRef = useRef(handler)

  useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  useEffect(() => {
    const handleBeforeUnload = handlerRef.current
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])
}
