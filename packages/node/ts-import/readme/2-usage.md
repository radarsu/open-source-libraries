```ts
import * as tsImport from 'ts-import';

const main = async () => {
    const filePath = `/home/user/file.ts`;
    const asyncResult = await tsImport.load(filePath);
    const syncResult = tsImport.loadSync(filePath);
};

void main();
```
