# Tiny Buffer

A tiny isomorphic implementation of a large subset of Node's Buffer.

If you need more like a full polyfill for an older version of Node's Buffer rather than something similar, modern, and with good performance, you should use [`feross/buffer`](https://github.com/feross/buffer).

## Differences

This implementation has the following differences and characteristics compared to Node's Buffer:

- It runs in the browser too.
- It still uses Node's Buffer under the hood for encoding and decoding in a Node environment, for greater performance.
- It uses [DataView](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) under the hood for reading and writing, for greater performance.
- It has no actual unsafe stuff, all buffers are zeroed.
- It assumes actually valid arguments are being passed to its methods.
- It assumes actually valid strings are used when encoding and decoding, if your strings are invalid you may get different results between the browser and Node.
- It exposes [DataView](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)'s methods for reading and writing too, in addition to Node's Buffer's.
- The following encodings are not supported: `base64url`.
- The following funtions work just like in a `Uint8Array`, meaning they don't support strings: `includes`, `indexOf`, `lastIndexOf`.
- The following functions are not implemented: `readIntBE`, `readIntLE`, `readUIntBE`, `readUIntLE`.
- The following functions are not implemented: `writeIntBE`, `writeIntLE`, `writeUIntBE`, `writeUIntLE`.
- The following properties are not implemented: `parent`, `poolSize`.

Other than that it should work identically, with good performance, everywhere.

## Install

```sh
npm install --save tiny-buffer
```

## Usage

```ts
import Buffer from 'tiny-buffer';

Buffer.from ( 'whatever' );
```

## License

MIT © Fabio Spampinato
