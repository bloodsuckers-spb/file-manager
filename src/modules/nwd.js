import process from "process";
import fs from "fs/promises";
import os from "os";
import path from "path";

import { DirItems } from "../dir-items/index.js";
import { throwError } from "../utils/index.js";

const sortCallback = (a, b) => a.name - b.name;

export const onLsPressed = async () => {
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

    folders.sort(sortCallback);
    files.sort(sortCallback);

    console.table(folders.concat(files));
  } catch {
    throwError();
  }
};

export const onUpPressed = async () => {
  process.chdir(path.resolve(".."));
};

export const onCdPressed = async (pathToDirectory = "") => {
  process.chdir(path.resolve(pathToDirectory));
};
