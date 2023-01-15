import type { Scripts } from '@radrat/cli';

const scripts: Scripts = async (cli) => {
    // Conventional commands.
    await cli.run({
        name: `start`,
        command: `pnpm exec ts-node --esm ./src/bin.ts`,
    });

    await cli.run({
        name: `build`,
        command: `pnpm exec tsc`,
    });
};

export default scripts;
