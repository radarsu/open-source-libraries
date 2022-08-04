import * as providers from '../providers/index';

import { Command, Flags } from '@oclif/core';

export default class CommandName extends Command {
    static description = ``;

    static args = [];

    static flags = {};

    async run() {
        const { flags, args } = await this.parse(CommandName);

        this.log(`Starting...`);
    }
}
