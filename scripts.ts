import type { Scripts } from '@radrat/cli';

const scripts: Scripts = async (cli) => {
    await cli.loadPlugins([
        {
            name: `@radrat-scripts/git`,
        },
        {
            name: `@radrat-scripts/workspace`,
        },
    ]);
};

export default scripts;
