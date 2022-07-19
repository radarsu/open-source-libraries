import * as nodeSSH from 'node-ssh';

export interface SSHConnection {
    type: 'ssh';
    ssh: nodeSSH.Config;
}

export interface Host {
    name: string;
    connection: SSHConnection;
    tags?: string[];
}

export interface Step {
    name: string;
    up: (host: Host) => void;
    rollback?: (host: Host) => void;
}

export interface Mission {
    name?: string;
    steps: Step[];
}
