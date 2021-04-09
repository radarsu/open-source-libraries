<p align="center">
    <h1>ts-timeout-promise</h1>
    <div>Awaitable timeout promise wrapper.</div>
</p>

## Table of contents

1. [Getting Started](#getting-started)

2. [Usage](#usage)

3. [Features](#features)

## Getting Started

`npm i ts-timeout-promise`

## Usage

### Simple

```ts
import { timeout } from 'ts-timeout-promise';

const bootstrap = async () => {
    console.log(`Hello`);
    await timeout(1000);
    console.log(`1 second passed.`);
};
```

### Advanced

```ts
import { timeout } from 'ts-timeout-promise';

const bootstrap = async () => {
    const promise = timeout(1000)
        .then(() => {
            console.log(`1 second has passed.`);
        })
        .catch(() => {
            console.log(`Promise rejected.`);
        });

    // Clears timeout.
    promise.clear();

    // Clears timeout and rejects promise.
    promise.reject();

    // Clears timeout and resolves promise.
    promise.resolve();
};
```

## Features

-   **0 dependencies** - no dependencies
-   **Simple** - just 40 lines of clean TypeScript code
-   **Strongly typed** - returns TimeoutPromise with reject(), remains strongly typed
