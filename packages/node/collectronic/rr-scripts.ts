import type { Scripts } from '@radrat/cli';

const scripts: Scripts = async (cli) => {
    await cli.loadPlugins([
        {
            name: `@radrat-scripts/package`,
        },
        {
            name: `@radrat-scripts/readme`,
        },
    ]);
};

export default scripts;
