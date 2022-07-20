// src/components/ReactPortal.js
import { useState, useLayoutEffect, ReactElement } from 'react';
import { createPortal } from 'react-dom';

interface ReactPortalProps {
  container?: HTMLElement
  wrapperId?: string,
  children: ReactElement
}

function createWrapperAndAppendToBody(wrapperId: string, container?:HTMLElement) {
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute("id", wrapperId);
    if (container) {
      container.appendChild(wrapperElement)
    } else {
      document.body.appendChild(wrapperElement);
    }
    return wrapperElement;
  }

function ReactPortal({ children, container, wrapperId='react-portal-modal-container' }: ReactPortalProps) {
    const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

    useLayoutEffect(() => {
        let element = document.getElementById(wrapperId);
        let systemCreated = false;
        // if element is not found with wrapperId or wrapperId is not provided,
        // create and append to body
        if (!element) {
            systemCreated = true;
            element = createWrapperAndAppendToBody(wrapperId, container);
        }
        setWrapperElement(element);
        return () => {
            // delete the programatically created element
            if (systemCreated && element?.parentNode) {
              element.parentNode.removeChild(element);
            }
          }
      }, [wrapperId]);

        // wrapperElement state will be null on the very first render.
  if (wrapperElement === null) return null;
  
return createPortal(children, wrapperElement);
}
export default ReactPortal;