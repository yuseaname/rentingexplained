const fs = require('fs');

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error('Usage: node scripts/fix-utf8.js <file1> <file2> ...');
  process.exit(1);
}

const replace = new Map([
  [0x9b, 0x3e], // CSI -> '>'
  [0x97, 0x2d], // em dash -> '-'
  [0x96, 0x2d], // en dash -> '-'
  [0x95, 0x2d], // bullet -> '-'
  [0x94, 0x22], // right double quote -> '"'
  [0x93, 0x22], // left double quote -> '"'
  [0x92, 0x27], // right single quote -> '\''
  [0x91, 0x27], // left single quote -> '\''
]);

for (const file of files) {
  const buf = fs.readFileSync(file);
  const out = Buffer.from(buf);
  let changed = 0;

  for (let i = 0; i < out.length; i++) {
    const repl = replace.get(out[i]);
    if (repl !== undefined) {
      out[i] = repl;
      changed++;
    }
  }

  if (changed > 0) {
    fs.writeFileSync(file, out);
  }

  console.log(`${file}: replaced ${changed} byte(s)`);
}
