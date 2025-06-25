import { parseCliArgs } from './utils/index.js';
import habitRouter from './routes/index.js';

async function start() {
  const args = process.argv.slice(2);
  const { commandName, flags } = parseCliArgs(args);

    const command = habitRouter[commandName];

    if (!command) {
      console.log(`Error: Command ${commandName} not found`);
      process.exit(1);
    }

    await command(flags);

}

start();
