### Generate files using template from local repository
```sh
templord
```

### Generate files using template from remote repository
```sh
templord --from=https://github.com/radarsu/templord
```

Templord will pull the repository, search for directories matching pattern `_template_${name}` and allow you to choose one of them as template.

### Creating your own template
1. Create directory matching pattern `_template_${name}` in the project.
2. Create `_questions.ts` file inside that directory if user's input is necessary for rendering.
3. Drop any files you want into directory prefixed with `_template`. Suffix files with `templord.ejs` if you wish to render them using data from user's input.
4. Run: `templord`.

### Example \_questions.ts

```ts
import type { Inquirer } from 'templord';

const askQuestions = async (inquirer: Inquirer) => {
    const responses = await inquirer.prompt([
        {
            message: `Name:`,
            name: `name`,
            type: `input`,
        },
    ]);

    return responses;
};

export default askQuestions;
```
