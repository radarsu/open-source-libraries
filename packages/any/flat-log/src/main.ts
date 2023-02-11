declare global {
    interface Console {
        /**
         * Alias for `flatLog`.
         */
        flog: (...objects: any[]) => void;
        /**
         * Prints series of object keys and values logs, i.e.
         * ```ts
         * console.flog({ something: true });
         * // Prints: something, true
         * ```
         */
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

console.flog = flatLog;
console.flatLog = flatLog;

export { flatLog };
