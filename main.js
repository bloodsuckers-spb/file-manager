import { throwError } from "./src/throw-error/index.js";

const USERNAME_REG_EXP = /^--username=('[^']'|"[^"]"|\S+)$/;

const getPassedArgument = () => {
  const passedArgument = process.argv[2];
  if (!passedArgument) {
    throwError();
  }
  return passedArgument;
};

const getUserName = (passedArgument) => {
  const matched = passedArgument.match(USERNAME_REG_EXP);
  if (!matched) {
    throwError();
  }
  const [_, username] = matched;
  return username;
};

const showGreeting = (username) => {
   console.log(`Welcome to the File Manager, ${username}!`);
}

showGreeting(getUserName(getPassedArgument()))

