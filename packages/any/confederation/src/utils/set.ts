export const set = (object: any, path: string, value: any) => {
    // Regex explained: https://regexr.com/58j0k
    const pathArray = path.match(/([^[.\]])+/g);

    if (!pathArray) {
        return;
    }

    pathArray.reduce((acc, key, i) => {
        if (acc[key] === undefined) {
            acc[key] = {};
        }

        if (i === pathArray.length - 1) {
            acc[key] = value;
        }

        return acc[key];
    }, object);
};
