import { type RefCallback, useRef } from 'react';
import { useEventEffect, useRecapture } from 'use-recapture';

export type CleanUp = () => void;

export function useRefEffect<T = unknown>(
  effect: (value: T) => CleanUp | void,
): RefCallback<T> {
  const innerRef = useRef<T>(null);
  const [onDetached, recaptureOnDetached] = useRecapture();
  const refCallback = useEventEffect((_ref: T) => {
    if (innerRef.current) {
      if (!_ref) {
        // previously attached and now detached
        onDetached();
        recaptureOnDetached();
      }
    } else if (_ref) {
      // previously detached and now attached
      const onDetached = effect(_ref);
      if (typeof onDetached === 'function') {
        recaptureOnDetached(onDetached);
      }
    }
    innerRef.current = _ref;
  });
  return refCallback;
}
