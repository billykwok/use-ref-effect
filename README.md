# `useRefEffect`

[![npm](https://img.shields.io/npm/v/use-ref-effect)](https://npmjs.com/package/use-ref-effect)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/use-ref-effect)](https://bundlephobia.com/package/use-ref-effect)
[![codecov](https://codecov.io/gh/billykwok/use-ref-effect/branch/main/graph/badge.svg?token=I73J70MS2V)](https://codecov.io/gh/billykwok/use-ref-effect)
[![Test](https://github.com/billykwok/use-ref-effect/actions/workflows/test.yml/badge.svg)](https://github.com/billykwok/use-ref-effect/actions/workflows/test.yml)

Like `useEffect`, but optimized for `ref`.

- Guaranteed to execute only when ref is either attached or detached.
- Minimize re-rendering as the returned ref is always stable.
- Perfect for setting and cleaning up event listeners compared to `useEffect`.
- Written in TypeScript with absolutely minimal bundle size.

## Quick Look

Here is a simple demonstration.

```tsx
import { useRefEffect } from 'use-ref-effect';

export function Component(props) {
  const ref = useRefEffect<HTMLDivElement>((el) => {
    console.log(`${el} attached`);
    function onClick() {
      console.log('clicked');
    }
    el.addEventListener('click', onClick);
    return () => {
      el.removeEventListener('click', onClick);
      console.log(`${el} detached`);
    };
  });
  return <div ref={ref}>Hello World</div>;
}
```

## Gotchas

- This hook is more akin to the currently experimental [`useEffectEvent`](https://react.dev/learn/separating-events-from-effects#declaring-an-effect-event) hook than typical `useEffect` hook. The effect callback is **NOT** reactive (i.e. always capture the latest values without the need to signal an update through a dependency array). In other words, the effect and its cleanup only re-run when the returned `ref` is updated by DOM mutation or the equivalent actions when used for other purposes.
- Different from `useEffect`, `useRefEffect` **NEVER** runs on the initial render. This is because React executes [`RefCallback`](https://react.dev/reference/react-dom/components/common#ref-callback) the first time after the underlying resource is available. In the case of `react-dom`, it is after the DOM element is first rendered into the actual DOM tree.

## Support

This library is used in most of my personal projects, and is regarded as production-ready by myself. In the foreseeable future, I will continuously maintain and support this library.

## Issues and Feedback

Please voice your opinions and report bugs in the [issues](https://github.com/billykwok/use-ref-effect/issues) sections of this GitHub project.

## Contributing

You are more than welcome to add more functionalities, improve documentation, fix bugs, and anything you think is needed. The build step is pretty self-explanatory. Please refer to [`package.json`](https://github.com/billykwok/use-ref-effect/blob/main/package.json).

## License

MIT
