import { Aponia } from "aponia";
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

await Aponia.build({
	routesDir: `${process.cwd()}/src/routes`,
	sourcemaps: true,
});

function prependToFilesInDir(directory: string, content: string): void {
	const files = readdirSync(directory);

	for (const file of files) {
			const filePath = join(directory, file);

			if (filePath.endsWith('.js')) {
					const fileContent = readFileSync(filePath, 'utf8');
					const updatedContent = `${content}\n${fileContent}`;
					writeFileSync(filePath, updatedContent, 'utf8');
			}
	}
}

// iterate through dist and add require alias to top of each file
prependToFilesInDir('./dist', 'var require = import.meta.require;');

