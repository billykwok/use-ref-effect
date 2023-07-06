/**
 * @jest-environment jsdom
 */
import { act, renderHook } from '@testing-library/react';
import { describe, expect, afterEach, jest, test } from '@jest/globals';

import { useRefEffect } from './index';

describe('useRefEffect', () => {
  const uneffect = jest.fn(() => console.log(`detached`));
  const effect = jest.fn((el: Element) => {
    console.log(`${el} attached`);
    return uneffect.bind(null, el);
  });
  const instance = document.createElement('div');

  test('should update ref, and call listeners correctly', () => {
    const {
      result: { current: ref },
    } = renderHook(() => useRefEffect(effect));
    expect(effect).not.toHaveBeenCalled();
    expect(uneffect).not.toHaveBeenCalled();

    act(() => ref(instance));
    expect(effect).toHaveBeenCalledTimes(1);
    expect(effect).toHaveBeenCalledWith(instance);
    expect(uneffect).not.toHaveBeenCalled();

    act(() => ref(null));
    expect(effect).toHaveBeenCalledTimes(1);
    expect(uneffect).toHaveBeenCalledTimes(1);
    expect(uneffect).toHaveBeenCalledWith(instance);
  });

  afterEach(() => {
    effect.mockClear();
    uneffect.mockClear();
  });
});
