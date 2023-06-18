import {
  type MutableRefObject,
  type Ref,
  type RefCallback,
  useRef,
  useMemo,
} from 'react';

export type CleanUp = () => void;

export type CombinedRef<T> = RefCallback<T> & MutableRefObject<T>;

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export function useRefEffect<T = unknown>(
  effect: (value: T) => CleanUp | void,
  ref?: Ref<T>
): CombinedRef<T> {
  const innerRef = useRef<T>(null);
  const onDetachedRef = useRef<CleanUp>(noop);
  const callbackRef = useRef<RefCallback<T>>(noop);
  callbackRef.current = (_ref: T) => {
    if (innerRef.current) {
      if (!_ref) {
        // previously attached and now detached
        onDetachedRef.current();
        onDetachedRef.current = noop;
      }
    } else if (_ref) {
      // previously detached and now attached
      const onDetached = effect(_ref);
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
  };
  return useMemo(() => {
    function refCallback(value: T) {
      return callbackRef.current(value);
    }
    return Object.defineProperty(refCallback, 'current', {
      set: refCallback,
      get: () => innerRef.current,
    }) as CombinedRef<T>;
  }, []);
}
