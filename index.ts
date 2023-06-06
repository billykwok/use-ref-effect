import {
  type MutableRefObject,
  type Ref,
  type RefCallback,
  useRef,
  useMemo,
  useCallback,
} from 'react';

export type CleanUp = () => void;

export type CombinedRef<T> = RefCallback<T> & MutableRefObject<T>;

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export function useRefEffect<T = unknown>(
  effect: (value: T) => CleanUp | void,
  deps: ReadonlyArray<unknown>,
  ref?: Ref<T>
): CombinedRef<T> {
  const innerRef = useRef<T>(null);
  const onDetachedRef = useRef<CleanUp>(noop);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onAttached = useCallback(effect, deps);
  return useMemo(() => {
    function callbackRef(_ref: T) {
      if (innerRef.current) {
        if (!_ref) {
          // previously attached and now detached
          onDetachedRef.current();
          onDetachedRef.current = noop;
        }
      } else if (_ref) {
        // previously detached and now attached
        const onDetached = onAttached(_ref);
        if (typeof onDetached === 'function') {
          onDetachedRef.current = onDetached;
        }
      }
      innerRef.current = _ref;
      if (ref) {
        if (typeof ref === 'function') {
          ref(_ref);
        } else {
          (ref as MutableRefObject<T>).current = _ref;
        }
      }
    }
    return Object.defineProperty(callbackRef, 'current', {
      set: callbackRef,
      get: () => innerRef.current,
    }) as CombinedRef<T>;
  }, [ref, onAttached]);
}
