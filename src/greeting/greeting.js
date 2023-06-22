import { throwError } from "../throw-error/index.js";

const USERNAME_REG_EXP = /^--username=('[^']'|"[^"]"|\S+)$/;

export const getPassedArgument = () => {
  const passedArgument = process.argv[2];
  if (!passedArgument) {
    throwError();
  }
  return passedArgument;
};

export const getUserName = (passedArgument) => {
  const matched = passedArgument.match(USERNAME_REG_EXP);
  if (!matched) {
    throwError();
  }
  const [_, username] = matched;
  return username;
};

export const showGreeting = (username) => {
  console.log(`Welcome to the File Manager, ${username}!`);
};
