import * as childProcess from 'child_process';

import { defaults } from 'options-defaults';

interface ExecOptions {
    logger?: {
        info: Console[`info`];
        error: Console[`error`];
    };
    execOptions?: childProcess.ExecSyncOptions;
    parallel?: boolean;
}

let defaultExecOptions = {};

const exec = async (commands: string[], options?: ExecOptions) => {
    const promises = commands.map(async (command) => {
        return new Promise<Buffer | string>((resolve, reject) => {
            const config = defaults(defaultExecOptions, options);

            config.logger?.info(`Running`, command);

            const subprocess = childProcess.exec(command, (err, stdout, stderr) => {
                if (err) {
                    reject(stderr.trim());
                    return;
                }

                resolve(stdout.trim());
            });

            subprocess.stdout?.on(`data`, (data) => {
                config.logger?.info(data);
            });

            subprocess.stderr?.on(`data`, (data) => {
                config.logger?.error(data);
            });
        });
    });

    if (options?.parallel) {
        return Promise.all(promises);
    }

    const out: (Buffer | string)[] = [];
    for (const promise of promises) {
        // eslint-disable-next-line no-await-in-loop
        out.push(await promise);
    }

    return out;
};

export type { ExecOptions };

export { defaultExecOptions, exec };
