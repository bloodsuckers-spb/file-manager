// import { throwError } from "./src/throw-error/index.js";

import {
  getPassedArgument,
  getUserName,
  showGreeting,
} from "./src/greeting/index.js";


const FAREWELL_MESSAGE = "Thank you for using File Manager, Username, goodbye!";

showGreeting(getUserName(getPassedArgument()));
