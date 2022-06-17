import type { Scripts } from '@radrat/cli';

const scripts: Scripts = async (cli) => {
    await cli.run({
        name: `build`,
        command: `npx rollup -c ./config/rollup.config.js`,
    });

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
