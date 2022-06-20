import type { Scripts } from '@radrat/cli';

const scripts: Scripts = async (cli) => {
    await cli.run({
        name: `build`,
        command: `npx rr all.run --command=build`,
        ignorePackageJsonName: true,
    });

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