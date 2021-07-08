import { debounce, throttle } from "./timer";

const callFuncEachTime = async (fn, time, numberOfCall) => {
  for (let index = 0; index < numberOfCall; index++) {
    await new Promise((res) => {
      setTimeout(() => {
        fn();
        res();
      }, time);
      jest.runOnlyPendingTimers();
    });
  }
};

describe("timer utils", () => {
  it.skip("should work for debounce - lower bound", async () => {
    jest.useFakeTimers("legacy");

    const mockFunc = jest.fn();
    const debouncedMockFunc = debounce(mockFunc, 500);

    await callFuncEachTime(debouncedMockFunc, 250, 10);

    jest.runOnlyPendingTimers();
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  it.skip("should work for debounce - upper bound", async () => {
    jest.useFakeTimers("legacy");

    const mockFunc = jest.fn();
    const debouncedMockFunc = debounce(mockFunc, 500);

    await callFuncEachTime(debouncedMockFunc, 1000, 10);

    jest.runOnlyPendingTimers();
    expect(mockFunc).toHaveBeenCalledTimes(10);
  });

  it.skip("should work for throttle - lower bound", async () => {
    jest.useFakeTimers("legacy");

    const mockFunc = jest.fn();
    const throttledMockFunc = throttle(mockFunc, 500);

    await callFuncEachTime(throttledMockFunc, 250, 10);

    jest.runOnlyPendingTimers();
    expect(mockFunc).toHaveBeenCalledTimes(5);
  });

  it.skip("should work for throttle - upper bound", async () => {
    jest.useFakeTimers("legacy");

    const mockFunc = jest.fn();
    const throttledMockFunc = throttle(mockFunc, 500);

    await callFuncEachTime(throttledMockFunc, 1000, 10);

    jest.runOnlyPendingTimers();
    expect(mockFunc).toHaveBeenCalledTimes(10);
  });
});
