import { stdout } from "process";

/**
 *
 * @param {string} username
 * @param {() => void} closeReadline
 */

export const showFarewell = (username = "", closeReadline) => {
  const FAREWELL_MESSAGE = `Thank you for using File Manager, ${username}, goodbye!`;
  closeReadline();
  stdout.write(FAREWELL_MESSAGE);
};
