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
    tags?: string[];
}

export interface Step {
    name: string;
    up: () => Promise<void>;
    rollback?: () => Promise<void>;
}

export interface Mission {
    name?: string;
    steps: Step[];
}
