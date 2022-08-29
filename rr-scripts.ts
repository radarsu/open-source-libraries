import type { Scripts } from '@radrat/cli';

const scripts: Scripts = async (cli) => {
    await cli.run({
        name: `install`,
        command: `pnpm install --recursive --filter="\\!rpc-websocket-client"`,
        ignorePackageJsonName: true,
    });

    await cli.run({
        name: `build`,
        command: `pnpm exec rr all.run --command=build`,
        ignorePackageJsonName: true,
    });

    await cli.run({
        name: `clean`,
        command: `find . -name "node_modules" -exec rm -rf '{}' +; find . -name "package-lock.json" -exec rm -rf '{}' +;`,
        ignorePackageJsonName: true,
    });

    await cli.loadPlugins([
        {
            name: `@radrat-internal/node-cli-plugin-workspace`,
        },
    ]);
};

export default scripts;
