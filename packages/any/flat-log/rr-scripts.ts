import type { Scripts } from '@radrat/cli';

const scripts: Scripts = async (cli) => {
    await cli.run({
        name: `build`,
        command: `rm -rf dist && pnpm exec tsc`,
    });
};

export default scripts;
