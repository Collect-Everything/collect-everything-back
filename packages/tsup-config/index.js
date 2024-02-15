const { defineConfig } = require("tsup");

module.exports = defineConfig((options) => ({
  format: ["cjs", "esm"],
  dts: true,
  outDir: "dist",
  entry: ["src/index.ts"],
  ...options,
}));
