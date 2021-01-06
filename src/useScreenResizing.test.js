import { useScreenResizing } from "./";
import { renderHook } from "@testing-library/react-hooks";

const resizeScreen = (width) => {
  global.innerWidth = width;
  global.dispatchEvent(new Event("resize"));
};

describe("useScreenResizing Hook", () => {
  test("should has Notebook screen size as default screen", () => {
    const { result } = renderHook(() => useScreenResizing());

    expect(result.current.isMobile).toBeFalsy();
    expect(result.current.isNotebook).toBeTruthy();
  });

  test("should resize to Mobile size and check it", () => {
    const { result } = renderHook(() => useScreenResizing());

    resizeScreen(320);
    expect(result.current.isMobile).toBeTruthy();
    expect(result.current.isMiniMobile).toBeFalsy();
    expect(result.current.isTablet).toBeFalsy();

    resizeScreen(575);
    expect(result.current.isMobile).toBeTruthy();
    expect(result.current.isMiniMobile).toBeFalsy();
    expect(result.current.isTablet).toBeFalsy();

    resizeScreen(576);
    expect(result.current.isMobile).toBeFalsy();
    expect(result.current.screenGT(575)).toBeTruthy();
    expect(result.current.screenGT(576)).toBeFalsy();
    expect(result.current.screenGTE(576)).toBeTruthy();
    expect(result.current.screenLT(577)).toBeTruthy();
    expect(result.current.screenLT(576)).toBeFalsy();
    expect(result.current.screenLTE(576)).toBeTruthy();
  });

  test("should resize to Tablet size and check it", () => {
    const { result } = renderHook(() => useScreenResizing());

    resizeScreen(576);
    expect(result.current.isTablet).toBeTruthy();
    expect(result.current.isMiniMobile).toBeFalsy();
    expect(result.current.isMobile).toBeFalsy();
    expect(result.current.isUsingPC).toBeFalsy();
    expect(result.current.isNotebook).toBeFalsy();
    expect(result.current.isScreen).toBeFalsy();

    resizeScreen(959);
    expect(result.current.isTablet).toBeTruthy();

    resizeScreen(960);
    expect(result.current.isTablet).toBeFalsy();
  });

  test("should resize to Computer size and check it", () => {
    const { result } = renderHook(() => useScreenResizing());

    resizeScreen(960);
    expect(result.current.isUsingPC).toBeTruthy();
    expect(result.current.isNotebook).toBeTruthy();
    expect(result.current.isScreen).toBeFalsy();
    expect(result.current.isTablet).toBeFalsy();
    expect(result.current.isMiniMobile).toBeFalsy();
    expect(result.current.isMobile).toBeFalsy();

    resizeScreen(1199);
    expect(result.current.isNotebook).toBeTruthy();
    expect(result.current.isScreen).toBeFalsy();

    resizeScreen(1200);
    expect(result.current.isUsingPC).toBeTruthy();
    expect(result.current.isScreen).toBeTruthy();
    expect(result.current.isNotebook).toBeFalsy();

    resizeScreen(1500);
    expect(result.current.isUsingPC).toBeTruthy();
    expect(result.current.isScreen).toBeTruthy();
  });

  test("should change default mini mobile size and keep other sizes intact", () => {
    const { result } = renderHook(() => useScreenResizing({ miniMobile: 270 }));

    resizeScreen(269);
    expect(result.current.isMiniMobile).toBeTruthy();
    expect(result.current.isMobile).toBeFalsy();

    resizeScreen(270);
    expect(result.current.isMobile).toBeTruthy();

    resizeScreen(576);
    expect(result.current.isTablet).toBeTruthy();

    resizeScreen(960);
    expect(result.current.isUsingPC).toBeTruthy();
  });
});
