import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
const python = process.env.PYTHON_TRANSLATION || (existsSync('.translate-env/bin/python') ? '.translate-env/bin/python' : 'python3');
const run = spawnSync(python, ['scripts/translate_docs.py'], { stdio: 'inherit' });
if (run.status !== 0) {
  console.error('German docs generation failed. Install the free Argos offline translation model (see README.md).');
  process.exit(run.status || 1);
}
