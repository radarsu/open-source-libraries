import type { Scripts } from '@radrat/cli';

const scripts: Scripts = async (cli) => {
    // Conventional commands.
    await cli.run({
        name: `build`,
        command: [`rm -rf .cache dist`, `pnpm exec tsc`].join(` && `),
    });
};

export default scripts;
