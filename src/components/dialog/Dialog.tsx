import React, { MutableRefObject, ReactElement, useCallback, useEffect, useRef } from 'react'
import ReactPortal from '../react-portal/ReactPortal';
import { useAriaHidden } from '../../hooks/useAriaHidden';
import * as FocusTrap from 'focus-trap-react'
import './dialogStyles.css'


interface DialogProps {
    container?: HTMLElement,
    isOpen: boolean,
    handleClose: Function ,
    children: ReactElement
}

// Why dialog styles are inline while the rest is in CSS? keep it consistent. 
const OVERLAY_STYLES = {
  position: 'absolute',
  top:0,
  left:0,
  right:0,
  bottom:0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
}

// In terms of API - handle is usually used to "handle" and event, while events exposed to consumers should start with on - so I would change
// to onClose
export default function Dialog({ children, isOpen, handleClose, container }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleClickEsc = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        handleClose(event)
    }
// Something is off with indents, making it less readable
};

const handleClickOutside = (event: Event) => {
    if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        handleClose(event)
    }
};

  useEffect(() => {
        document.addEventListener('keydown', handleClickEsc, true);
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('keydown', handleClickEsc, true);
            document.removeEventListener('click', handleClickOutside, true);
        };
  }, [handleClose])

  const overlayRef = useAriaHidden()

  if (!isOpen) return null;
    
  // From here on - isOpen is always true (since if it's not, you already returned)
  // So the rest of the code should just have - 
  // e.g <FocusTrap active>
  // e.g  <dialog className="dialog" ref={dialogRef} open>
  return (
    <ReactPortal container={container}>
      <FocusTrap active={isOpen}>
        <div style={OVERLAY_STYLES} ref={overlayRef}>
          <dialog className="dialog" ref={dialogRef} open={isOpen ? true : false}>
            <div role="document" >{children}</div>
          </dialog>
        </div>
      </FocusTrap>
    </ReactPortal>
  )
}
