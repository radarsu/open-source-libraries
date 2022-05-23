# Confederation

You can define application's configuration in multiple ways: `.env` or `env.json` files, cli arguments, load from database and many more. They all usually have different case styling. This library aims to unify the process of loading and normalizing configurations so that they become a single object aka "source of truth".

## Usage

Let's look an example, when we run `export MODULE__VARIABLE2=from-env` and then app with `--module--variable3=from-cli` cli argument.

```ts
const configurationSources = [
    {
        value: require(`dotenv`).config().parsed,
    },
    {
        value: utils.pick(process.env, [`MODULE__VARIABLE2`, `MODULE__VARIABLE3`]),
    },
    {
        value: require(`minimist`)(process.argv.slice(2)),
        parser: parsers.dashParser,
    },
];

console.log(configurationSources);
// Returns:
// [
//   {
//     value: {
//       MODULE__VARIABLE1: 'from-dotenv',
//       MODULE__VARIABLE2: 'from-dotenv'
//     }
//   },
//   {
//     value: { MODULE__VARIABLE2: 'from-env', MODULE__VARIABLE3: 'from-env' }
//   },
//   {
//     value: { _: [], 'module--variable3': 'from-cli' },
//     parser: { nestifyPattern: '--', keyTransformer: [Function: camelCase] }
//   }
// ]

const unifiedConfig = unifyConfigurations(configurationSources);

console.log(unifiedConfig);
// Returns:
// {
//   module: {
//     variable1: 'from-dotenv',
//     variable2: 'from-env'
//     variable3: 'from-cli',
//   },
//   _: []
// }
```
