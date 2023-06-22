import readline from "readline";
import { stdin as input, stdout as output } from "node:process";

import { username, showGreeting } from "./src/greeting/index.js";
import { showFarewell } from "./src/farewell/index.js";

// Greeting
showGreeting(username);

// Readline
const rl = readline.createInterface({ input, output });

const closeReadline = () => rl.close();

const onLineHandler = (line = "") => {
  if (!/^\s+\.exit\s+$/.test(line)) {
    showFarewell(username, closeReadline);
  }
};


rl.on("SIGINT", () => showFarewell(username, closeReadline));
rl.on("line", onLineHandler);
