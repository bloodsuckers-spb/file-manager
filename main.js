
import path from "path";
import fs from "fs/promises";
import os from "os";
import process from "process";
import readline from "readline";

import { username, showGreeting } from "./src/greeting/index.js";
import { showFarewell } from "./src/farewell/index.js";
import { throwError } from "./src/throw-error/index.js";

const { stdin: input, stdout: output } = process;

class DirItems {
  constructor(name = "", type = '"file"') {
    this.Name = name;
    this.Type = type;
  }
}

const showWorkingDirectory = () => {
  console.log(`You are currently in ${process.cwd()}`);
};

const showInvalidMessage = () => {
  console.log("Invalid input message");
};

const onLsPressed = async () => {
  const files = [];
  const folders = [];

  try {
    const dirItems = await fs.readdir(process.cwd());

    for (const dirItem of dirItems) {
      const stat = await fs.stat(dirItem);
      const type = stat.isFile() ? "file" : "directory";
      const item = new DirItems(dirItem, type);

      if (type === "file") {
        files.push(item);
      } else {
        folders.push(item);
      }
    }

    const cb = (a, b) => a.name - b.name;

    folders.sort(cb);
    files.sort(cb);

    console.table(folders.concat(files));
  } catch {
    throwError();
  }
};

const onUpPressed = () => {
  if (process.cwd() === os.homedir()) {
    return;
  }
  process.chdir(path.resolve(".."));
};

const onCdPressed = (pathToDirectory = "") => {
  process.chdir(path.resolve(pathToDirectory));
};

const onCatPressed = async (pathToFile = "") => {
  const currentPath = path.resolve(pathToFile);
  const readStream = fs.createReadStream(currentPath);
  readStream.on("error", showInvalidMessage);
  readStream.pipe(process.stdout);
};

const onAddPressed = async (filename = "") => {
  try {
    const currentPath = path.resolve(filename);
    await fs.writeFile(currentPath, "", { flag: "wx" });
  } 
  
  catch {
    showInvalidMessage();
  }
};

const onRmPressed = async (path_to_file = "") => {
  try {
    const PATH = path.resolve(path_to_file);
    await fs.rm(PATH);
  } 
  
  catch {
    showInvalidMessage();
  }
};

const onRnPressed = async (pathToFile = "", filename = "") => {
  try {
    const resolvedPath = path.resolve(pathToFile);
    const newFilePath = path.resolve(filename);
    await fs.rename(resolvedPath, newFilePath);
  } 
  
  catch {
     showInvalidMessage();
  }
};

export const nwd = Object.freeze({
  up: onUpPressed,
  ls: onLsPressed,
  cd: onCdPressed,
});

export const operationsWithFiles = Object.freeze({
  cat: onCatPressed,
  add: onAddPressed,
  rm: onRmPressed,
  rn: onRnPressed,
  copy: "cp",
  move: "mv",
});

const bootstrap = () => {
  process.chdir(os.homedir());
  showGreeting(username);
  showWorkingDirectory();
};

export const app = bootstrap();

const rl = readline.createInterface({ input, output });

const finish = () => {
  rl.close();
  showFarewell();
};

const onCommandEnter = (line = "") => {
  const args = line.trim().split(" ");
  const [command, secondArg, thirdArg] = args;

  if (nwd[command]) {
    nwd[command](secondArg);
    showWorkingDirectory();
    return;
  }

  if (args.length === 2 && operationsWithFiles[command]) {
    operationsWithFiles[command](secondArg.trim());
    showWorkingDirectory();
    return;
  }

  if (args.length === 3 && operationsWithFiles[command]) {
    operationsWithFiles[command](secondArg.trim(), thirdArg.trim());
    showWorkingDirectory();
    return;
  }

  if (command === ".exit") {
    finish();
    return;
  }

  showInvalidMessage();
};

rl.on("SIGINT", () => showFarewell(username, closeReadline));
rl.on("line", onCommandEnter);
