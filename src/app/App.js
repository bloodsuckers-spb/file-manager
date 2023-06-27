import process from "process";
import os from "os";

import { Readline } from "../readline/index.js";

export class App {
  username = "Anonymous";
  usernameRegExp = /^--username=('[^']'|"[^"]"|\S+)$/;

  constructor() {
    process.chdir(os.homedir());
    this.setUserName();
    this.showGreeting();
    this.showWorkingDirectory();
    this.readline = new Readline(
      () => this.showFarewell(),
      () => this.showWorkingDirectory()
    );
  }

  setUserName() {
    const passedArgument = process.argv[2];

    if (!passedArgument) {
      return;
    }

    const matched = passedArgument.match(this.usernameRegExp);

    if (!matched) {
      return;
    }

    const [_, username] = matched;

    this.username = username;
  }

  showGreeting() {
    console.log(`Welcome to the File Manager, ${this.username}!${os.EOL}`);
  }

  showWorkingDirectory() {
    console.log(`You are currently in ${process.cwd()}`);
  }

  showFarewell() {
    const FAREWELL_MESSAGE = `Thank you for using File Manager, ${this.username}, goodbye!`;
    console.log(`${FAREWELL_MESSAGE}${os.EOL}`);
  }
}
