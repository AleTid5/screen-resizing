# screen-resizing
> **use-screen-resizing** is a custom hook that provides information about the device viewport.

![React](https://img.shields.io/badge/-React-20232a?logo=react&style=for-the-badge)

## Installation 🖥

```bash
npm i -S screen-resizing
```

## Usage 💻
Example of simple usage

```jsx
import { useScreenResizing } from "screen-resizing";

const Component = () => {
    const { isMiniMobile, isMobile, isTablet, isNotebook, isScreen } = useScreenResizing();

    return (<div>
        {isMiniMobile && ...}
        {isMobile && ...}
        {isTablet && ...}
        {isNotebook && ...}
        {isScreen && ...}
    </div>);
};
```

## Breakpoints 🔮
You can pass an object as parameter to override default values

```jsx
import { useScreenResizing } from "screen-resizing";

const Component = () => {
    const { isMobile, isTablet, isScreen } = useScreenResizing({ mobile: 350 });

    return (<div>
        {isMobile && ...}
        {isTablet && ...}
        {isScreen && ...}
    </div>);
};
```

The default values are:
```bash
  {
    miniMobile: 320,
    mobile: 576,
    tablet: 960,
    screen: 1200,
  }
```
> **MiniMobile** -> width < 320
>
> **Mobile** -> width >= 320 && width < 576
>
> **Tablet** -> width >= 576 && width < 960
>
> **Notebook** -> width >= 960 && width < 1200
>
> **Screen** -> width >= 1200

## Features 🔥
- Screen greater than: Function than receives a screen value parameter and compares if it's greater than the viewport width screen.
- Screen greater or equal than: Function than receives a screen value parameter and compares if it's greater or equal than the viewport width screen.
- Screen lesser than: Function than receives a screen value parameter and compares if it's lesser than the viewport width screen.
- Screen lesser or equal than: Function than receives a screen value parameter and compares if it's lesser or equal than the viewport width screen.
- Width: The viewport realtime width size.
- Height: The viewport realtime height size.

```jsx
import { useScreenResizing } from "screen-resizing";

const Component = () => {
    const { screenGT,screenGTE, screenLT, screenLTE, width, height } = useScreenResizing({ mobile: 350 });

    return (<div>...</div>);
};
```

## License 🧙🏻‍♂️
MIT © [AleTid5](https://github.com/AleTid5)
