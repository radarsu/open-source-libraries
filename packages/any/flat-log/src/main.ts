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

const styles = `background:hsl(160deg 65% 50%);color:black;font-weight:700;line-height:1.5;margin-bottom:0.25rem;`;

const flatLog = (...objects: any[]) => {
    objects.forEach((object) => {
        if (!object || typeof object !== `object`) {
            console.log(object);
            return;
        }

        Object.entries(object).forEach(([key, value]) => {
            console.log(`%c ${key} `, styles, value);
        });
    });
};

console.flog = flatLog;
console.flatLog = flatLog;

export { flatLog };
