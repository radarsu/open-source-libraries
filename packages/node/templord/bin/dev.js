#!/usr/bin/env ts-node

/* eslint-disable */

import oclif from '@oclif/core';
import path from 'node:path';
import { register } from 'ts-node';
import url from 'node:url';

// In dev mode -> use ts-node and dev plugins
process.env.NODE_ENV = `development`;

register({
    project: path.join(path.dirname(url.fileURLToPath(import.meta.url)), `..`, `tsconfig.json`),
});

// In dev mode, always show stack traces
oclif.settings.debug = true;

// Start the CLI
oclif
    .run(process.argv.slice(2), import.meta.url)
    .then(oclif.flush)
    .catch(oclif.Errors.handle);
