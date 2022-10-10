import fs from "fs";
const browserify = (target) => {
  return {
    name: "browserify",
    renderChunk(code, chunk, options) {
      if (options.format != "es") return;

      setTimeout(() => {
        let file = code.toString();
        let lines = file.split("\n").slice(0, -1);
        file = lines.reduce((p, c) => p + c + "\n", "");
        fs.writeFileSync(target.file, file);
      }, 100);
    },
  };
};

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/bundle.cjs.js",
      format: "cjs",
    },
    {
      file: "dist/bundle.es.js",
      format: "es",
    },
  ],
  plugins: [browserify({ file: "dist/bundle.cdn.js" })],
};
