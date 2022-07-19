import * as fs from 'fs';

import { NodeSSH } from 'node-ssh';

export interface CreateSSHConnectionOptions {
    host: string;
    privateKey: string;
    username: string;
}

export const createSSHConnection = async (options: CreateSSHConnectionOptions) => {
    const ssh = new NodeSSH();
    const privateKey = await fs.promises.readFile(options.privateKey, `utf8`);
    return ssh.connect({
        keepaliveInterval: 60000,
        ...options,
        privateKey,
    });
};
