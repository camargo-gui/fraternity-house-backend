import fs from "fs";
import path from "path";
import util from "util";

export const deleteFolderRecursive = async (directoryPath: string) => {
  if (fs.existsSync(directoryPath)) {
    const readdir = util.promisify(fs.readdir);
    const unlink = util.promisify(fs.unlink);
    const rmdir = util.promisify(fs.rmdir);

    const files = await readdir(directoryPath);
    for (const file of files) {
      const curPath = path.join(directoryPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        await deleteFolderRecursive(curPath);
      } else {
        await unlink(curPath);
      }
    }
    await rmdir(directoryPath);
  }
};
