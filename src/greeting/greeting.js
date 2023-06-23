import os from 'os';

const getUserName = () => {
  const USERNAME_REG_EXP = /^--username=('[^']'|"[^"]"|\S+)$/;
  const INITIAL_USERNAME = "Anonymous";

  const passedArgument = process.argv[2];

  if (!passedArgument) {
    return INITIAL_USERNAME;
  }

  const matched = passedArgument.match(USERNAME_REG_EXP);

  if (!matched) {
    return INITIAL_USERNAME;
  }

  const [_, username] = matched;

  return username;
};

export const showGreeting = (username = "") => {
  console.log(`Welcome to the File Manager, ${username}!${os.EOL}`);
};

export const username = getUserName();
