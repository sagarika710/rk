const { spawn } = require('child_process');

const children = [];

const startProcess = (name, args) => {
  const child = spawn('npm', args, {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'inherit',
  });

  child.on('exit', (code, signal) => {
    if (signal) {
      return;
    }

    if (code !== 0) {
      console.error(`${name} exited with code ${code}`);
      shutdown(code ?? 1);
    }
  });

  children.push(child);
  return child;
};

const shutdown = (code = 0) => {
  for (const child of children) {
    if (!child.killed) {
      child.kill('SIGTERM');
    }
  }
  process.exit(code);
};

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

startProcess('api', ['--prefix', 'rk-cinemax-api', 'run', 'dev']);
startProcess('web', ['--prefix', 'radha-krishna-cinemax', 'run', 'dev']);
