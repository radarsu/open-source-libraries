export const getModuleName = (loadedModule: any) => {
    return loadedModule?.name ? `"${loadedModule.name}"` : `without name`;
};
