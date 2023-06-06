# `useRefEffect`

[![npm](https://img.shields.io/npm/v/use-ref-effect)](https://npmjs.com/package/use-ref-effect)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/use-ref-effect)](https://bundlephobia.com/package/use-ref-effect)
[![codecov](https://codecov.io/gh/billykwok/use-ref-effect/branch/main/graph/badge.svg?token=I73J70MS2V)](https://codecov.io/gh/billykwok/use-ref-effect)
[![Test](https://github.com/billykwok/use-ref-effect/actions/workflows/test.yml/badge.svg)](https://github.com/billykwok/use-ref-effect/actions/workflows/test.yml)

Like `useEffect`, but optimized for `ref`.

- Guaranteed to execute only when ref is either attached or detached.
- Perfect for setting and cleaning up event listeners compared to `useEffect`.
- Much easier `deps` array management as `ref` value is supplied as an argument instead.
- Fully composable by accepting an existing `ref`, and returning a `ref` that implements both `MutableRefObject` and `RefCallback`.
- Support all kinds of renderers from `react-dom` and `react-native` to `react-three/fiber` and anything else.
- Work with both `forwardRef` and `useImperativeHandle`.
- Written in TypeScript with absolutely minimal bundle size.

## Quick Look

Here is a simplfied demonstration on how easy to use `useRefEffect`.

```tsx
import { type ForwardedRef, type Ref, forwardRef } from 'react';
import { useRefEffect } from 'use-ref-effect';

export function Component() {
  const ref = useRefEffect<HTMLDivElement>((el: HTMLDivElement) => {
    console.log(`${el} attached`);
    return () => {
      console.log(`${el} detached`);
    };
  }, []);
  return <div ref={ref}>Hello World</div>;
}

export const ComponentExposingRef = forwardRef(function HelloWorld(
  ref: ForwardedRef<HTMLDivElement>
) {
  const innerRef = useRefEffect<HTMLDivElement>(
    (el: HTMLDivElement) => {
      console.log(`${el} attached`);
      return () => {
        console.log(`${el} detached`);
      };
    },
    [],
    ref
  );
  return <div ref={innerRef}>Hello World</div>;
});
```

## Gotchas

- Different from `useEffect`, when the dependency array changes, the effect and its cleanup do NOT re-run. Instead, it behaves like `useCallback` in which the closure is updated to capture external changes. The effect and its cleanup only re-run when the returned `ref` is updated.
- Different from `useEffect`, `useRefEffect` cannot run on initial render. This is because `ref` is not attached yet.

## Support

This library has been continuously used in many of my personal projects, and is regarded as production-ready. In the foreseeable future, I will continuously maintain and support this library.

## Issues and Feedback

Please voice your opinion and report bugs in the [issues](https://github.com/billykwok/use-ref-effect/issues) sections of this GitHub project.

## Contributing

You are more than welcome to add more functionalities, improve documentation, fix bugs, and anything you think is needed. The build step is pretty self-explanatory. Please refer to [`package.json`](https://github.com/billykwok/use-ref-effect/blob/main/package.json).

## License

MIT
