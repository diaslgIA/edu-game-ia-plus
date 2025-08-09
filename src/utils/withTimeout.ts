
export const createTimeoutController = (ms: number = 10000) => {
  const controller = new AbortController();
  const id = setTimeout(() => {
    controller.abort();
  }, ms);
  const cancel = () => clearTimeout(id);
  return { controller, cancel };
};
