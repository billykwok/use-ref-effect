/**
 * @jest-environment jsdom
 */
import { act, renderHook } from '@testing-library/react';
import { type RefCallback, type Ref, createRef } from 'react';
import { describe, expect, afterEach, jest, test } from '@jest/globals';

import { useRefEffect } from './index';

describe('should update inner and outer refs, and call listeners correctly', () => {
  const uneffect = jest.fn(() => console.log(`detached`));
  const effect = jest.fn((el: Element) => {
    console.log(`${el} attached`);
    return uneffect.bind(null, el);
  });
  const instance = document.createElement('div');

  test('when outer ref is RefObject and inner ref is used as RefCallback', () => {
    const outerRef: Ref<Element> = createRef();
    const {
      result: { current: innerRef },
    } = renderHook(() => useRefEffect(effect, outerRef));
    expect(effect).not.toHaveBeenCalled();
    expect(uneffect).not.toHaveBeenCalled();
    expect(innerRef.current).toBeNull();
    expect(outerRef.current).toBeNull();

    act(() => innerRef(instance));
    expect(effect).toHaveBeenCalledTimes(1);
    expect(effect).toHaveBeenCalledWith(instance);
    expect(uneffect).not.toHaveBeenCalled();
    expect(innerRef.current).toBe(instance);
    expect(outerRef.current).toBe(instance);

    act(() => innerRef(null));
    expect(effect).toHaveBeenCalledTimes(1);
    expect(uneffect).toHaveBeenCalledTimes(1);
    expect(uneffect).toHaveBeenCalledWith(instance);
    expect(innerRef.current).toBeNull();
    expect(outerRef.current).toBeNull();
  });

  test('when outer ref is RefObject and inner ref is used as RefObject', () => {
    const outerRef: Ref<Element> = createRef();
    const {
      result: { current: innerRef },
    } = renderHook(() => useRefEffect(effect, outerRef));
    expect(effect).not.toHaveBeenCalled();
    expect(uneffect).not.toHaveBeenCalled();
    expect(innerRef.current).toBeNull();
    expect(outerRef.current).toBeNull();

    act(() => {
      innerRef.current = instance;
    });
    expect(effect).toHaveBeenCalledTimes(1);
    expect(effect).toHaveBeenCalledWith(instance);
    expect(uneffect).not.toHaveBeenCalled();
    expect(innerRef.current).toBe(instance);
    expect(outerRef.current).toBe(instance);

    act(() => {
      innerRef.current = null;
    });
    expect(effect).toHaveBeenCalledTimes(1);
    expect(uneffect).toHaveBeenCalledTimes(1);
    expect(uneffect).toHaveBeenCalledWith(instance);
    expect(innerRef.current).toBeNull();
    expect(outerRef.current).toBeNull();
  });

  test('when outer ref is RefCallback and inner ref is used as RefCallback', () => {
    const outerRef = jest.fn<RefCallback<Element>>((instance) => {
      console.log(`outerRef called with ${instance}`);
    });
    const {
      result: { current: innerRef },
    } = renderHook(() => useRefEffect(effect, outerRef));
    expect(effect).not.toHaveBeenCalled();
    expect(uneffect).not.toHaveBeenCalled();
    expect(innerRef.current).toBeNull();
    expect(outerRef).not.toHaveBeenCalled();

    act(() => innerRef(instance));
    expect(effect).toHaveBeenCalledTimes(1);
    expect(effect).toHaveBeenCalledWith(instance);
    expect(uneffect).not.toHaveBeenCalled();
    expect(innerRef.current).toBe(instance);
    expect(outerRef).toHaveBeenCalledTimes(1);
    expect(outerRef).toHaveBeenCalledWith(instance);

    act(() => innerRef(null));
    expect(effect).toHaveBeenCalledTimes(1);
    expect(uneffect).toHaveBeenCalledTimes(1);
    expect(uneffect).toHaveBeenCalledWith(instance);
    expect(innerRef.current).toBeNull();
    expect(outerRef).toHaveBeenCalledTimes(2);
    expect(outerRef).toHaveBeenCalledWith(null);
  });

  test('when outer ref is RefCallback and inner ref is used as RefObject', () => {
    const outerRef = jest.fn<RefCallback<Element>>((instance) => {
      console.log(`outerRef called with ${instance}`);
    });
    const {
      result: { current: innerRef },
    } = renderHook(() => useRefEffect(effect, outerRef));
    expect(effect).not.toHaveBeenCalled();
    expect(uneffect).not.toHaveBeenCalled();
    expect(innerRef.current).toBeNull();
    expect(outerRef).not.toHaveBeenCalled();

    act(() => {
      innerRef.current = instance;
    });
    expect(effect).toHaveBeenCalledTimes(1);
    expect(effect).toHaveBeenCalledWith(instance);
    expect(uneffect).not.toHaveBeenCalled();
    expect(innerRef.current).toBe(instance);
    expect(outerRef).toHaveBeenCalledTimes(1);
    expect(outerRef).toHaveBeenCalledWith(instance);

    act(() => {
      innerRef.current = null;
    });
    expect(effect).toHaveBeenCalledTimes(1);
    expect(uneffect).toHaveBeenCalledTimes(1);
    expect(uneffect).toHaveBeenCalledWith(instance);
    expect(innerRef.current).toBeNull();
    expect(outerRef).toHaveBeenCalledTimes(2);
    expect(outerRef).toHaveBeenCalledWith(null);
  });

  afterEach(() => {
    effect.mockClear();
    uneffect.mockClear();
  });
});
