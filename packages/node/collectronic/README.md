<p align="center">
    <h1>collectronic</h1>
    <div></div>
</p>

## Table of contents

1. [Getting Started](#getting-started)

2. [Usage](#usage)



## Getting Started
1. `npm i collectronic -D`
2. In root of your project add `.config/collectronic.ts` file.

```ts
import type { CollectronicConfig } from 'collectronic';

const config: CollectronicConfig = {
    inputs: [`projects/**/*.ts`, `projects/**/*.html`],
};

export default config;
```


## Usage
1. Place comments with metadata as follows:

```ts

```

2. Run collectronic: `npx collectronic`.

