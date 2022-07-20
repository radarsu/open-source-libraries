import * as fs from 'fs';
import * as nodeSSH from 'node-ssh';

import { SSHConnectionConfig } from '../../shared/interfaces';

export const createSSHConnection = async (options: SSHConnectionConfig) => {
    const ssh = new nodeSSH.NodeSSH();

    let privateKey!: string;

    if (options.privateKeyPath && !options.privateKey) {
        privateKey = await fs.promises.readFile(options.privateKeyPath, `utf8`);
    }

    return ssh.connect({
        keepaliveInterval: 60000,
        ...(privateKey && { privateKey }),
        ...options,
    });
};
