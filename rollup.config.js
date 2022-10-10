import fs from "fs";
import cp from 'child_process';
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
const genTsMod = (target) => {
  return {
    name: "genTsMod",
    renderChunk(code, chunk, options) {
      if (options.format != "cjs") return;

      setTimeout(() => {
       cp.exec('npx -p typescript tsc dist/bundle.cjs.js --declaration --allowJs --emitDeclarationOnly --outDir dist')
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
  plugins: [browserify({ file: "dist/bundle.cdn.js" }),genTsMod({ file: "dist/bundle.cjs.d.ts" })],
};
