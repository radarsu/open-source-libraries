export type When = `always` | `never` | `on_failure` | `on_success`;
export type RetryAmount = 0 | 1 | 2;

export type FailureType =
    | `always`
    | `api_failure`
    | `archived_failure`
    | `data_integrity_failure`
    | `job_execution_timeout`
    | `runner_system_failure`
    | `runner_unsupported`
    | `scheduler_failure`
    | `script_failure`
    | `stale_schedule`
    | `stuck_or_timeout_failure`
    | `unknown_failure`
    | `unmet_prerequisites`;

export interface Service {
    name?: string;
    alias?: string;
    entrypoint?: string[];
    command?: string[];
}

export interface LocalInclude {
    local?: string;
}

export interface FileInclude {
    project?: string;
    ref?: string;
    file?: string;
}

export type Include = FileInclude | LocalInclude | string;

export interface Variable {
    value?: string;
    description?: string;
}

export interface Rule {
    if?: string;
    when?: Exclude<When, `on_failure` | `on_success`>;
    variables?: Record<string, Variable | string>;
}

export interface GitlabCI {
    default?: {
        after_script?: string[];
        artifacts?: {
            paths?: string[];
            exclude?: string[];
            expire_in?: string;
            expose_as?: string;
            name?: string;
            public?: boolean;
            untracked?: boolean;
            when?: Exclude<When, 'never'>;
            // TODO:
            reports?: any;
        };
        before_script?: string[];
        cache?: {
            key?:
                | string
                | {
                      files: string[];
                      prefix: string;
                  };
            paths?: string[];
            untracked?: boolean;
            when?: Exclude<When, 'never'>;
            policy?: `pull-push` | `pull` | `push`;
        };
        image?:
            | string
            | {
                  name?: string;
                  entrypoint?: string[];
              };
        interruptible?: boolean;
        retry?:
            | RetryAmount
            | {
                  max?: RetryAmount;
                  when?: FailureType[];
              };
        services?: (Service | string)[];
        tags?: string[];
        timeout?: string;
    };
    include?: Include[];
    stages?: string[];
    variables?: Record<string, Variable | string>;
    workflow?: {
        rules?: Rule[];
    };
}
