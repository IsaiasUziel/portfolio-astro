import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';

const MAX_GZIP_JS_BYTES = 90 * 1024;
const distDir = path.join(globalThis.process.cwd(), 'dist');

const requiredRoutes = [
  'index.html',
  'es/index.html',
  'en/index.html',
  'es/resume/index.html',
  'en/resume/index.html',
  'es/projects/index.html',
  'en/projects/index.html',
];

async function listFiles(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        return listFiles(fullPath);
      }

      return [fullPath];
    }),
  );

  return files.flat();
}

for (const route of requiredRoutes) {
  const filePath = path.join(distDir, route);
  await stat(filePath);
}

const allFiles = await listFiles(distDir);
const javascriptFiles = allFiles.filter((filePath) => filePath.endsWith('.js'));

for (const jsFile of javascriptFiles) {
  const content = await readFile(jsFile);
  const gzipSize = gzipSync(content).byteLength;

  if (gzipSize > MAX_GZIP_JS_BYTES) {
    throw new Error(`JS budget exceeded for ${path.relative(distDir, jsFile)} (${gzipSize} bytes gz).`);
  }
}

const budgetMessage = javascriptFiles.length === 0 ? 'No JS assets emitted.' : `${javascriptFiles.length} JS asset(s) within budget.`;
globalThis.console.log(`Release quality gate passed. ${budgetMessage}`);
