import path = require("path");
import fs = require("fs");

async function showDir(pathDir: string) {
  fs.readdir(
    path.resolve(__dirname + "/" + pathDir),
    { recursive: true, withFileTypes: true },
    async (err, files) => {
      console.log(files);
      return await files;
    }
  );
}

export { showDir };
