import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import tailwind from "@tailwindcss/postcss";
import postcssCssnano from "cssnano";
import postcssFor from "postcss-for";
import postcssNested from "postcss-nested";
import postcssSafeImportant from "postcss-safe-important";
import postcssSimpleVars from "postcss-simple-vars";
import {
  chromeExtension,
  simpleReloader,
} from "rollup-plugin-chrome-extension";
import postcss from "rollup-plugin-postcss";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/manifest.json",
  output: {
    dir: "dist",
    format: "esm",
  },
  plugins: [
    chromeExtension(),
    !production && simpleReloader(),
    production && terser(),
    resolve(),
    commonjs(),
    typescript(),
    postcss({
      minimize: true,
      inject: false,
      plugins: [
        postcssFor,
        postcssNested,
        postcssSimpleVars,
        tailwind({
          optimize: true,
        }),
        postcssSafeImportant,
        postcssCssnano,
      ],
    }),
  ],
};
