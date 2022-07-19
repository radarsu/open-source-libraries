import type { Scripts } from '@radrat/cli';

const scripts: Scripts = async (cli) => {
    await cli.run({
        name: `build`,
        command: `npx rr all.run --command=build`,
        ignorePackageJsonName: true,
    });

    await cli.loadPlugins([
        {
            name: `@radrat-internal/node-cli-plugin-workspace`,
        },
    ]);
};

export default scripts;
