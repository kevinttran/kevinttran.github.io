# Getting Started with React 19

React 19 is a major release that simplifies how we write React applications.

## The React Compiler

The React Compiler is a new build-time tool that automatically optimizes your React code. It understands your code and memoizes values and functions for you, so you don't have to use `useMemo` and `useCallback` as often.

## Actions

Actions allow you to pass a function to DOM elements like `<form/>`:

```jsx
<form action={search}>
  <input name="query" />
  <button type="submit">Search</button>
</form>
```

This makes handling form submissions and data mutations much more intuitive.
