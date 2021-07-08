export const callFuncEachTime = async (fn, time, numberOfCall) => {
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
