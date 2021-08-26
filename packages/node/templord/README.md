<p align="center">
    <h1>templord</h1>
    <div>Tool to generate code from ejs templates from a convention-based structure. Create _template directory with files with `.ejs` extension and run `npx templord`.</div>
</p>

## Table of contents

1. [Getting Started](#getting-started)

2. [Usage](#usage)



## Getting Started
`npm i templord enquirer -D`


## Usage
### How to use

1. Create directory matching pattern `_template_${name}` in project.
2. Create `_decree.ts` file inside that directory.
3. Drop any files you want into directory prefixed with `_template`. Suffix them with `.ejs` if you wish to use data returned by getDecree method.
4. By default templord will always ask you for directoryName to generate from template which can be used in ejs templates via `<%- directoryName %>`.
5. Run `npx templord`.

### Example \_decree.ts

```ts
import type * as Enquirer from 'enquirer';

const getDecree = async (enquirer: Enquirer) => {
    const responses = await enquirer.prompt([
        {
            message: `Name:`,
            name: `name`,
            type: `input`,
        },
    ]);

    return responses;
};

export default getDecree;
```

