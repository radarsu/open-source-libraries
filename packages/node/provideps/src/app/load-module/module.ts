export interface Module {
    askForProviders(): Promise<string[]>;
}
