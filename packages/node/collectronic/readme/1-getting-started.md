1. `npm i collectronic -D`
2. In root of your project add `.config/collectronic.ts` file.

```ts
import type { CollectronicConfig } from 'collectronic';

const config: CollectronicConfig = {
    inputs: [`projects/**/*.ts`, `projects/**/*.html`],
};

export default config;
```
