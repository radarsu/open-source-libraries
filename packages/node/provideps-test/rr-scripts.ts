import type { Scripts } from '@radrat/cli';

const scripts: Scripts = async (cli) => {
    await cli.run({
        name: `start`,
        command: `cd ../provideps && npx tsc && cd ../provideps-test && npm start`,
    });

    await cli.run({
        name: `test`,
        command: `NODE_OPTIONS=--experimental-vm-modules npx jest`,
    });
};

export default scripts;
