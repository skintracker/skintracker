import { createHash } from "crypto";
import { readdirSync, renameSync, writeFileSync } from "fs";
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
logger.info("Removing previous build artifacts...");
const prevCSSFileName = readdirSync("./public/css/")[0];
logger.info(`Found artifact: ${prevCSSFileName}`);

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
  const updatedContent = content.replace(prevCSSFileName, newCSSFileName);
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
logger.info("Updated all references. CSS build complete!");
