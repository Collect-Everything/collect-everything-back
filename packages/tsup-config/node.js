const { defineConfig } = require("tsup");

module.exports = defineConfig((options) => ({
  format: ["cjs"],
  outDir: "dist",
  entry: ["src/index.ts"],
  clean: true,
  ...options,
}));
