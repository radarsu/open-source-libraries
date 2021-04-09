export declare const merge: (object: any, ...sources: any[]) => any;
/**
 * Merges objects deeply, overrides arrays and classes, does not mutate objects.
 */
export declare const defaults: <Defaults, Source, Source2, Source3, Source4, Source5, Source6>(defaultOptions: Defaults, source: Source, source2?: Source2, source3?: Source3, source4?: Source4, source5?: Source5, source6?: Source6, ...args: any[]) => Defaults & Source & Source2 & Source3 & Source4 & Source5;
