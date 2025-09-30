import { build, context, BuildOptions } from "esbuild";

const isDev = process.argv.includes("--watch");

// 通用配置
const baseConfig: BuildOptions = {
  bundle: true,
  charset: "utf8",
  tsconfig: "./tsconfig.json",
};

// node 构建配置
const mainConfig: BuildOptions = {
  ...baseConfig,
  platform: "node",
  target: "node20",
  format: "cjs",
  entryPoints: ["src/main/index.ts"],
  outfile: "dist/main/index.js",
  external: ["electron"],
};

// preload 构建配置
const preloadConfig: BuildOptions = {
  ...baseConfig,
  platform: "node",
  target: "node20",
  format: "cjs",
  entryPoints: ["src/preload/index.ts"],
  outfile: "dist/preload/index.js",
  external: ["electron"],
};

// QwQNT web 构建配置
const rendererQwQConfig: BuildOptions = {
  ...baseConfig,
  platform: "browser",
  target: "esnext",
  format: "cjs",
  entryPoints: ["src/renderer/index.qwq.ts"],
  outfile: "dist/renderer/index.qwq.js",
};

// renderer ll 构建配置
const rendererLLConfig: BuildOptions = {
  ...baseConfig,
  platform: "browser",
  target: "esnext",
  format: "esm",
  entryPoints: ["src/renderer/index.ll.ts"],
  outfile: "dist/renderer/index.ll.js",
};

// 构建函数
async function runBuild() {
  if (isDev) {
    console.log("Starting development build...");

    const mainCtx = await context(mainConfig);
    const preloadCtx = await context(preloadConfig);
    const rendererQwQCtx = await context(rendererQwQConfig);
    const rendererLLCtx = await context(rendererLLConfig);

    await mainCtx.watch();
    await preloadCtx.watch();
    await rendererQwQCtx.watch();
    await rendererLLCtx.watch();

    console.log("Development build started. Watching for changes...");
  } else {
    console.log("Starting production build...");
    try {
      await Promise.all([build(mainConfig), build(preloadConfig), build(rendererQwQConfig), build(rendererLLConfig)]);
      console.log("Production build completed successfully.");
    } catch (err) {
      console.error("Error during production build:", err);
      process.exit(1);
    }
  }
}
runBuild().catch((err) => {
  console.error("Unhandled error in build script:", err);
  process.exit(1);
});
