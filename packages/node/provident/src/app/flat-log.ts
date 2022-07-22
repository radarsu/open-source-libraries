declare global {
    interface Console {
        flatLog: (...objects: any[]) => void;
    }
}

const flatLog = (...objects: any[]) => {
    objects.forEach((object) => {
        if (!object || typeof object !== `object`) {
            console.log(object);
            return;
        }

        Object.entries(object).forEach(([key, value]) => {
            console.log(key, value);
        });
    });
};

console.flatLog = flatLog;

export { flatLog };
