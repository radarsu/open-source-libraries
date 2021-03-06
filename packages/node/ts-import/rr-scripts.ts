import type { Scripts } from '@radrat/cli';

const scripts: Scripts = async (cli) => {
    // Run tests.
    await cli.run({
        name: `test`,
        command: `npx jest`,
        hiddenFromHelp: true,
    });

    await cli.run({
        name: `test.watch`,
        command: `npx jest --watch`,
        hiddenFromHelp: true,
    });

    await cli.run({
        name: `publish`,
        command: [
            `npx rr build`,
            // `npm publish --access=public`,
            `git init --initial-branch=main`,
            `git remote add origin https://github.com/radarsu/${cli.context.packageJson.name}`,
            `git add .`,
            `git commit -m 'feat: ${cli.context.packageJson.version}'`,
            `git push origin main --force`,
            `rm -rf ./.git`,
        ].join(` && `),
        hiddenFromHelp: true,
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
