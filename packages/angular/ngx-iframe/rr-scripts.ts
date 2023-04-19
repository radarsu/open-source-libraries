import type { Scripts } from '@radrat/cli';

const scripts: Scripts = async (cli) => {
    await cli.run({
        name: `watch`,
        command: `pnpm exec ng build --watch`,
    });

    await cli.run({
        name: `build`,
        command: `pnpm exec ng build`,
    });
};

export default scripts;
