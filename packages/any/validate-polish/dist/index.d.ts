export declare const validatePolish: {
    checksum: (number: string, weights: number[]) => boolean;
    pesel(pesel: string): boolean;
    nip(nip: string): boolean;
    regon(regon: string): boolean;
    identityCard(num: string): boolean;
    identityCardWithSeparator(num: string): boolean;
};
