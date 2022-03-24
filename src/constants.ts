
/* MAIN */

const FAST_FOR_THRESHOLD = 64; // For loops are much faster when dealing with a small number of elements

const HAS_SHARED_ARRAY_BUFFER = ( typeof SharedArrayBuffer === 'function' );

/* EXPORT */

export {FAST_FOR_THRESHOLD, HAS_SHARED_ARRAY_BUFFER};
