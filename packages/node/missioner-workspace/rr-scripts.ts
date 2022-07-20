import type { Scripts } from '@radrat/cli';

const scripts: Scripts = async (cli) => {
    await cli.run({
        name: `test`,
        command: `../missioner/bin/dev launch`,
    });
};

export default scripts;
