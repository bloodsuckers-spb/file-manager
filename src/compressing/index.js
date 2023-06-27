import path from "path";
import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress, createUnzip } from "zlib";

import { pipeline } from "stream/promises";

export const compress = async (path_to_file = "", path_to_destination = "") => {
  const { base } = path.parse(path_to_file);
  const sourcePath = path.resolve(path_to_file);
  const destinationPath = path.resolve(path_to_destination, `${base}.gz`);

  const brotZip = createBrotliCompress();
  const source = createReadStream(sourcePath);
  const destination = createWriteStream(destinationPath);

  await pipeline(source, brotZip, destination);
};

export const decompress = (path_to_file = "", path_to_destination = "") => {
  const { name } = path.parse(path_to_file);
  const gzip = createUnzip();
  const source = createReadStream(path.resolve(path_to_file));
  const destination = createWriteStream(
    path.resolve(path_to_destination),
    name
  );
  source.pipe(gzip).pipe(destination);
};
