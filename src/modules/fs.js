import path from "path";
import fs from "fs/promises";
import process from "process";
import { createReadStream, createWriteStream } from "fs";

import { showInvalidMessage } from "../utils/index.js";

export const onCatPressed = async (pathToFile = "") => {
  const currentPath = path.resolve(pathToFile);
  const readStream = createReadStream(currentPath);
  readStream.pipe(process.stdout);
};

export const onAddPressed = async (filename = "") => {
  try {
    const currentPath = path.resolve(filename);
    await fs.writeFile(currentPath, "", { flag: "wx" });
  } catch {
    showInvalidMessage();
  }
};

export const onRmPressed = async (path_to_file = "") => {
  try {
    const PATH = path.resolve(path_to_file);
    await fs.rm(PATH);
  } catch {
    showInvalidMessage();
  }
};

export const onRnPressed = async (pathToFile = "", filename = "") => {
  try {
    const resolvedPath = path.resolve(pathToFile);
    const newFilePath = path.resolve(filename);
    await fs.rename(resolvedPath, newFilePath);
  } catch {
    showInvalidMessage();
  }
};

export const onCpPressed = async (
  path_to_file = "",
  path_to_new_directory = ""
) => {
  const { base } = path.parse(path_to_file);
  const PATH = path.resolve(path_to_file);
  const readStream = createReadStream(PATH);
  const writeStream = createWriteStream(
    path.resolve(path_to_new_directory, base)
  );
  readStream.pipe(writeStream);
};

export const onMvPressed = async (
  path_to_file = "",
  path_to_new_directory = ""
) => {
  onCpPressed(path_to_file, path_to_new_directory);
  await fs.rm(path.resolve(resolve(path_to_file)));
};
