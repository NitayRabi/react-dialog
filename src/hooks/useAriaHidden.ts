import React, {useRef, useCallback} from 'react'
import {hideOthers, Undo} from 'aria-hidden'

export const useAriaHidden = () => {
    let unHide: Undo
    const nodeRef:React.MutableRefObject<any> = useRef<HTMLElement>(null);
  
    const setRef = useCallback((newNode: HTMLElement) => {
      if (nodeRef.current) {
        unHide()
      }

      nodeRef.current = newNode;
  
      if (nodeRef.current) {
        unHide = hideOthers(nodeRef.current);
      }
    }, []) 
  
    return setRef
  }
