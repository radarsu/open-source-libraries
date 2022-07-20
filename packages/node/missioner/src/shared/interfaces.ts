import * as nodeSSH from 'node-ssh';

export interface SSHConnectionConfig extends nodeSSH.Config {
    privateKeyPath?: string;
}

export interface SSHConnection {
    type: 'ssh';
    ssh: SSHConnectionConfig;
}

export interface Host {
    name: string;
    connection: SSHConnection;
    // Boolean or path to node executable.
    useBuiltInNode?: boolean | string;
    tags?: string[];
}
