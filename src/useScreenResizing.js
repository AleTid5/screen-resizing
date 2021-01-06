import { useLayoutEffect, useReducer } from "react";
import { defaultBreakpoints } from "./defaultBreakpoints";

const initialState = () => ({
  width: undefined,
  height: undefined,
});

const reducer = (state, action) => {
  switch (action.type) {
    case "changeScreenSize": {
      return {
        ...state,
        width: action.value.width,
        height: action.value.height,
      };
    }
    default:
      return state;
  }
};

export default function useScreenResizing(breakpoints = {}) {
  const [{ width, height }, dispatch] = useReducer(reducer, {}, initialState);
  const { miniMobile, mobile, tablet, screen } = {
    ...defaultBreakpoints,
    ...breakpoints,
  };
  const isMiniMobile = width < miniMobile;
  const isMobile = !isMiniMobile && width < mobile;
  const isTablet = !isMobile && width < tablet;
  const isUsingPC = width >= tablet;
  const isNotebook = isUsingPC && width < screen;
  const isScreen = width >= screen;

  useLayoutEffect(() => {
    const handleResize = () =>
      dispatch({
        type: "changeScreenSize",
        value: { width: window.innerWidth, height: window.innerHeight },
      });

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    isMiniMobile,
    isMobile,
    isTablet,
    isUsingPC,
    isNotebook,
    isScreen,
    screenGT: (size) => width > size,
    screenGTE: (size) => width >= size,
    screenLT: (size) => width < size,
    screenLTE: (size) => width <= size,
    width,
    height,
  };
}
