### Simple

```ts
import { timeout } from 'ts-timeout-promise';

const bootstrap = async () => {
    console.log(`Hello`);
    await timeout(1000);
    console.log(`1 second has passed.`);
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
