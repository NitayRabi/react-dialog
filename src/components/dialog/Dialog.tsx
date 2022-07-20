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

const OVERLAY_STYLES = {
  position: 'absolute',
  top:0,
  left:0,
  right:0,
  bottom:0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
}

export default function Dialog({ children, isOpen, handleClose, container }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleClickEsc = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        handleClose(event)
    }
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
