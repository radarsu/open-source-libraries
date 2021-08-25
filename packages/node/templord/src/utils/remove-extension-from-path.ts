const removeExtensionFromPath = (pathWithExtension: string) => {
    const pathParts = pathWithExtension.split(`.`);
    pathParts.pop();
    return pathParts.join(`.`);
};

export { removeExtensionFromPath };
