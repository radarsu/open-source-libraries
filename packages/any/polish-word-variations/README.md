<p align="center">
    <h1>polish-word-variations</h1>
    <div>Utility library to define and obtain word variations for polish words - singular and plural forms (dependant on count) for various polish cases.</div>
</p>

## Table of contents

1. [Getting Started](#getting-started)

2. [Usage](#usage)

3. [Features](#features)



## Getting Started
`npm i polish-word-variations`


## Usage
### General

```ts
import { wordVariations } from 'polish-word-variations';

wordVariations.addWords({
    pasek: {
        nominative: {
            singular: `pasek`,
            // Only nominative and accusative forms have "dual" form. Vocative form uses same form as nominative, therefore for simplicity nominative form is always required.
            dual: `paski`,
            plural: `pasków`,
        },
        genitive: {
            singular: `paska`,
            plural: `pasków`,
        },
    },
});

console.log(
    wordVariations.getWord(`pasek`, -1),
    wordVariations.getWord(`pasek`, 0),
    wordVariations.getWord(`pasek`, 1),
    wordVariations.getWord(`pasek`, 1.5, `genitive`),
    wordVariations.getWord(`pasek`, 2),
    wordVariations.getWord(`pasek`, 5),
);
```

### Import common word definitions

```ts
import { wordVariations } from 'polish-word-variations';
import * as timeMeasures from 'polish-word-variations/word-definitions/time-measures';

wordVariations.addWords(timeMeasures);

console.log(
    wordVariations.getWord(`millisecond`, -1),
    wordVariations.getWord(`sedcond`, 0),
    wordVariations.getWord(`minute`, 1),
    wordVariations.getWord(`hour`, 1.5, `genitive`),
    wordVariations.getWord(`day`, 2),
    wordVariations.getWord(`week`, 2),
    wordVariations.getWord(`month`, 2),
    wordVariations.getWord(`quarter`, 2),
    wordVariations.getWord(`year`, 5),
);
```

### Browser

In browser wordVariations package is wrapped twice `wordVariations.wordVariations`.

```html
<script src="https://cdn.jsdelivr.net/npm/polish-word-variations@latest/dist/index.browser.js"></script>
<script>
    console.log(wordVariations.wordVariations);
</script>
```


## Features
Based on:

-   http://free.of.pl/g/grzegorj/gram/pl/gram04.html
-   https://rjp.pan.pl/index.php?option=com_content&view=article&id=1011:skadnia-liczebnikow-70&catid=44&Itemid=145

