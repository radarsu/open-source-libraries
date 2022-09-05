import type { Scripts } from '@radrat/cli';

const scripts: Scripts = async (cli) => {
    await cli.loadPlugins([
        {
            name: `@radrat-internal/node-cli-plugin-package`,
        },
    ]);
};

export default scripts;
