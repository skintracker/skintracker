import { createHash } from "crypto";
import { readdirSync, renameSync, rmSync, writeFileSync } from "fs";
import { join } from "path";
import { $ } from "bun";
import pino from "pino";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
  level: "info",
});

logger.info("Beginning CSS build...");
const cssDir = "./public/css";
const cssFiles = readdirSync("./public/css/");

let prevStylesFileName: string | undefined = undefined;
for (const file of cssFiles) {
  if (file.startsWith("styles")) prevStylesFileName = file;
}
if (!prevStylesFileName) throw new Error("Previous file not found!");
logger.info(`Found artifact: ${prevStylesFileName}`);

const cssFileName = "./public/css/styles.css";
await $`bunx tailwindcss -o ${cssFileName} --minify`;

logger.info("Built CSS file. Renaming with hash...");
const cssFileContents = await Bun.file(cssFileName).text();
const cssFileHash = createHash("md5")
  .update(cssFileContents)
  .digest("hex")
  .substring(0, 8);
const newCSSFileName = `styles.${cssFileHash}.css`;
renameSync(cssFileName, `./public/css/${newCSSFileName}`);

logger.info(
  `Renamed to ${newCSSFileName}. Fixing references in src/layouts...`,
);
async function updateCSSRef(filePath: string): Promise<void> {
  const content = await Bun.file(filePath).text();
  const updatedContent = content.replace(prevStylesFileName!, newCSSFileName);
  if (content !== updatedContent) {
    writeFileSync(filePath, updatedContent, "utf8");
    logger.info(`Updated reference in ${filePath}`);
  }
}
const layoutDir = "./src/layouts";
const layoutFiles = readdirSync(layoutDir);
for (const file of layoutFiles) {
  const layoutFilePath = join(layoutDir, file);
  await updateCSSRef(layoutFilePath);
}

if (prevStylesFileName !== newCSSFileName) {
  logger.info("Updated all references. Removing previous build artifacts...");
  rmSync(join("./public/css", prevStylesFileName));
  logger.info("Removed.");
}

logger.info("Transpiling SCSS...");
const stylesDir = "./src/styles";
const stylesFiles = readdirSync(stylesDir);
for (const file of stylesFiles) {
  const filePath = join(stylesDir, file);
  if (filePath.endsWith(".scss")) {
    await $`grass -s compressed ${filePath} ${cssDir}/${file.replace(
      ".scss",
      ".css",
    )}`;
  }
}
logger.info("Transpiled SCSS.");

logger.info("Build complete!");
