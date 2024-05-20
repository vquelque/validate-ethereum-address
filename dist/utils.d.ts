export type ValidInputTypes = Uint8Array | bigint | string | number | boolean;
export declare const isHexStrict: (hex: ValidInputTypes) => boolean;
export declare function isUint8Array(data: unknown | Uint8Array): data is Uint8Array;
