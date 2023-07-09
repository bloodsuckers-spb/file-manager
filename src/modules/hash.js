import fs from "fs/promises";
import path from "path";
import { createHash } from "crypto";

import { showInvalidMessage } from "../utils/index.js";

export const calculateHash = async (path_to_file = "") => {
  try {
    const PATH = path.resolve(path_to_file);
    const content = await fs.readFile(PATH, "utf8");
    const hash = createHash("sha256");
    const finalHex = hash.update(content).digest("hex");
    console.log(finalHex);
  } catch {
    showInvalidMessage();
  }
};
