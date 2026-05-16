import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const pkgVersion = pkg.version;

if (!pkgVersion) {
  console.error('ERROR: package.json version not found');
  process.exit(1);
}

const constText = readFileSync('src/const.ts', 'utf8');
const singleMatch = constText.match(/CARD_VERSION\s*=\s*'([^']+)'/);
const doubleMatch = constText.match(/CARD_VERSION\s*=\s*"([^"]+)"/);
const constVersion = singleMatch?.[1] || doubleMatch?.[1];

if (!constVersion) {
  console.error('ERROR: CARD_VERSION not found in src/const.ts');
  process.exit(1);
}

if (constVersion !== pkgVersion) {
  console.error(
    `Version mismatch!\n  package.json:  ${pkgVersion}\n  src/const.ts:  ${constVersion}`
  );
  process.exit(1);
}

console.log(`OK: package.json and src/const.ts both at version ${pkgVersion}`);
