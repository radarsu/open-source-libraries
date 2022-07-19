import type { Scripts } from '@radrat/cli';

const scripts: Scripts = async (cli) => {
    await cli.run({
        name: `start`,
        command: `./bin/dev`,
    });

    await cli.run({
        name: `build`,
        command: `rm -rf ./dist && npx tsc && npm pack`,
    });
};

export default scripts;
