
/* MAIN */

type Encoding = 'ascii' | 'base64' | 'binary' | 'hex' | 'latin1' | 'utf8' | 'utf-8' | 'utf16le' | 'utf-16le' | 'ucs2' | 'ucs-2';

type Filler = number | string | Uint8Array;

type Input = number | string | ArrayLike<number> | ArrayBuffer | SharedArrayBuffer | DataView | TypedArray | Serialized;

type Serialized = { type: string, data: number[] };

type TypedArray = Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;

/* EXPORT */

export {Encoding, Filler, Input, Serialized, TypedArray};
