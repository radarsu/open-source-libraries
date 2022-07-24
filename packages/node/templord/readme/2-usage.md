### Generate files using template from local repository
```sh
templord
```

### Generate files using template from remote repository
```sh
templord --from=https://github.com/radarsu/templord
```

Templord will pull the repository, search for directories with _template.ts file and allow you to choose one of them as template.

### Creating your own template
1. Create `_template.ts` file in a directory you wish to use as a template.
2. In the file you can define which files from the directory need to be rendered and what input is required from user.
3. That's it!

### Example \_template.ts

```ts
import type { Inquirer } from 'templord';

export const patternsToRender = [`package.json`];

const askQuestions = async (inquirer: Inquirer) => {
    const responses = await inquirer.prompt([
        {
            message: `Custom variable:`,
            name: `customVariable`,
            type: `input`,
        },
    ]);

    return responses;
};

export default askQuestions;
```

Then, you can use customVariable in files matching patternsToRender like:
```json
{
    "name": "<%- customVariable %>"
}
```