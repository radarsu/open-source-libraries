// eslint-disable-next-line @typescript-eslint/no-empty-function
export const makeAny: <T>(provider: T) => asserts provider is Record<string, any> & T = () => {};
