
/* MAIN */

//TODO: Publish these as standalone modules

const getLastUtf8CodepointLength = ( buffer: Uint8Array ): 0 | 1 | 2 | 3 | 4 => { // This function gets the length of the last utf8 codepoint in bytes

  const length = buffer.length;

  if ( length === 0 ) return 0; // 0 Bytes

  const byte4 = buffer[length - 1];

  if ( length === 1 || !( byte4 & 0b10000000 ) ) return 1; // 1 Byte: 0xxxxxxx

  const byte3 = buffer[length - 2];

  if ( length === 2 || (( byte3 & 0b11000000 ) !== 0b10000000) ) return 2; // 2 Bytes: 110xxxxx, 10xxxxxx

  const byte2 = buffer[length - 3];

  if ( length === 3 || (( byte2 & 0b11000000 ) !== 0b10000000) ) return 3; // 3 Bytes: 1110xxxx, 10xxxxxx, 10xxxxxx

  return 4; // 4 Bytes: 11110xxx, 10xxxxxx, 10xxxxxx, 10xxxxxx

};

const swap = ( buffer: Uint8Array, a: number, b: number ): void => {

  const itemA = buffer[a];
  const itemB = buffer[b];

  buffer[a] = itemB;
  buffer[b] = itemA;

};

const utf8chop = ( buffer: Uint8Array, maxLength: number ): Uint8Array => { // This function chops a utf8 buffer to have at max "maxLength" length, without chopping in the middle of code points

  if ( buffer.length > ( maxLength + 8 ) ) { // Potential huge quick trimming

    buffer = buffer.subarray ( 0, maxLength + 8 );

  }

  while ( buffer.length > maxLength ) {

    buffer = buffer.subarray ( 0, -getLastUtf8CodepointLength ( buffer ) );

  }

  return buffer;

};

const utf16chop = ( buffer: Uint8Array, maxLength: number ): Uint8Array => { // This function chops a utf16 buffer to have at max "maxLength" length, without chopping in the middle of code points

  if ( buffer.length > maxLength ) {

    return buffer.subarray ( 0, maxLength - ( maxLength % 2 ) );

  }

  return buffer;

};

/* EXPORT */

export {swap, utf8chop, utf16chop};
