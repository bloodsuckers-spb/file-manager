import { fileURLToPath } from "url";
import { throwError } from "./src/throw-error/index.js";

import path from "path";
import fs from "fs/promises";
import os from "os";
import process from "process";

// const __filename = fileURLToPath(import.meta.url);
const __dirname = fileURLToPath(new URL(".", import.meta.url));

import readline from "readline";
import { stdin as input, stdout as output } from "process";

import { username, showGreeting } from "./src/greeting/index.js";
import { showFarewell } from "./src/farewell/index.js";

const showWorkingDirectory = () => {
  console.log(`You are currently in ${process.cwd()}`);
};

const bootstrap = () => {
  process.chdir(os.homedir());
  showGreeting(username);
  showWorkingDirectory();
};

export const app = bootstrap();

const rl = readline.createInterface({ input, output });

const closeReadline = () => rl.close();

const LINE_COMMANDS = {
  Up: "up",
  Ls: "ls",
  Exit: ".exit",
  Cd: "cd",
  Cat: "cat",
  Add: "add",
  Rename: "rn",
  Copy: "cp",
  Move: "mv",
  Delete: "rm",
};

const INVALID_MESSAGE = "Invalid input message";

const onCommandEnter = (line = "") => {
  const args = line.trim().split(" ");
  const [command] = args;
  switch (command) {
    case LINE_COMMANDS.Ls:
      onLsHandler(showWorkingDirectory);
      return;
    case LINE_COMMANDS.Up:
      onPressUp(showWorkingDirectory);
      return;
    case LINE_COMMANDS.Exit:
      showFarewell(username, closeReadline);
      return;
    case LINE_COMMANDS.Cd:
      onPressCd("", showWorkingDirectory);
    default:
      console.log(INVALID_MESSAGE);
  }
};

rl.on("SIGINT", () => showFarewell(username, closeReadline));
rl.on("line", onCommandEnter);

const DirItemType = {
  File: "file",
  Directory: "directory",
};

class DirItems {
  constructor(name = "", isFile = true) {
    this.Name = name;
    this.Type = isFile ? DirItemType.File : DirItemType.Directory;
  }
}

/**
 *
 * @param {() => void} showWorkingDirectory
 */
const onLsHandler = async (showWorkingDirectory) => {
  const outputItems = [];
  try {
    const dirItems = await fs.readdir(__dirname);
    for (const dirItem of dirItems) {
      const stat = await fs.stat(dirItem);
      outputItems.push(new DirItems(dirItem, stat.isFile()));
    }
    console.table(outputItems);
    showWorkingDirectory();
  } catch {
    throwError();
  }
};

/**
 *
 * @param {() => void} showWorkingDirectory
 */

const onPressCd = (pathToDirectory = "", showWorkingDirectory) => {
  process.chdir(path.join(process.cwd(), pathToDirectory));
  showWorkingDirectory();
};

/**
 *
 * @param {() => void} showWorkingDirectory
 */
const onPressUp = async (showWorkingDirectory) => {
  process.chdir(path.join(process.cwd(), ".."));
  showWorkingDirectory();
};
