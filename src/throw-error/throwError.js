const ERROR_MESSAGE = `Invalid input message`;

export const throwError = () => {
  throw new Error(ERROR_MESSAGE);
};
