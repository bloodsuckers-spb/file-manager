import { stdout } from "process";
import os  from 'os';

export const showFarewell = (username = "") => {
  const FAREWELL_MESSAGE = `Thank you for using File Manager, ${username}, goodbye!`;
  stdout.write(`${FAREWELL_MESSAGE}${os.EOL}`);
};
