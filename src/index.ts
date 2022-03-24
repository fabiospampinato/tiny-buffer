
/* IMPORT */

import {isArrayLike, isDataView, isNumber, isPlainObject, isTypedArray} from '@fabiospampinato/is';
import Latin1 from 'base256-encoding';
import Hex from 'hex-encoding';
import Base64 from 'radix64-encoding';
import Utf8 from 'uint8-encoding';
import {FAST_FOR_THRESHOLD, HAS_SHARED_ARRAY_BUFFER} from './constants';
import {swap, utf8chop} from './utils';
import {Encoding, Filler, Input, TypedArray, Serialized} from './types';

/* MAIN */

class Buffer extends Uint8Array {

  /* CONSTRUCTOR */

  constructor ( length: number );
  constructor ( input: string, encoding?: Encoding );
  constructor ( input: TypedArray );
  constructor ( input: DataView );
  constructor ( input: ArrayBuffer, byteOffset?: number, byteLength?: number );
  constructor ( input: SharedArrayBuffer, byteOffset?: number, byteLength?: number );
  constructor ( input: ArrayLike<number> );
  constructor ( input: Serialized );
  constructor ( input: Input, option1?: unknown, option2?: unknown ) {

    if ( typeof input === 'number' ) {

      super ( input );

    } else if ( typeof input === 'string' ) {

      const encoding = option1 || 'utf8';

      if ( encoding === 'utf8' || encoding === 'utf-8' ) {

        const buffer = Utf8.encode ( input );

        super ( buffer.buffer, buffer.byteOffset, buffer.byteLength );

      } else if ( encoding === 'ascii' || encoding === 'latin1' || encoding === 'binary' ) {

        const buffer = Latin1.decode ( input );

        super ( buffer.buffer, buffer.byteOffset, buffer.byteLength );

      } else if ( encoding === 'base64' ) {

        const buffer = Base64.decode ( input );

        super ( buffer.buffer, buffer.byteOffset, buffer.byteLength );

      } else if ( encoding === 'hex' ) {

        const buffer = Hex.decode ( input );

        super ( buffer.buffer, buffer.byteOffset, buffer.byteLength );

      } else {

        throw new Error ( 'Invalid encoding' );

      }

    } else if ( input instanceof ArrayBuffer || ( HAS_SHARED_ARRAY_BUFFER && input instanceof SharedArrayBuffer ) ) {

      if ( isNumber ( option1 ) ) {

        if ( isNumber ( option2 ) ) {

          super ( input, option1, option2 );

        } else {

          super ( input, option1 );

        }

      } else {

        super ( input );

      }

    } else if ( isTypedArray ( input ) ) {

      super ( input );

    } else if ( isDataView ( input ) ) {

      super ( input.buffer, input.byteOffset, input.byteLength );

    } else if ( isArrayLike ( input ) ) {

      const buffer = Uint8Array.from ( input );

      super ( buffer.buffer, buffer.byteOffset, buffer.byteLength );

    } else if ( isPlainObject ( input ) && input.type === 'Buffer' && isArrayLike ( input.data ) ) {

      const buffer = Uint8Array.from ( input.data );

      super ( buffer.buffer, buffer.byteOffset, buffer.byteLength );

    } else {

      throw new Error ( 'Invalid input' );

    }

  }

  /* STATIC API */

  static alloc ( length: number, fill?: Filler, encoding?: Encoding ): Buffer {

    const buffer = new Buffer ( length );

    if ( fill !== undefined && fill !== 0 ) {

      return buffer.fill ( fill, 0, buffer.length, encoding );

    } else {

      return buffer;

    }

  }

  static allocUnsafe ( length: number ): Buffer {

    return new Buffer ( length );

  }

  static allocUnsafeSlow ( length: number ): Buffer {

    return new Buffer ( length );

  }

  static byteLength ( input: string | ArrayBuffer | SharedArrayBuffer | DataView | TypedArray, encoding?: Encoding ): number {

    if ( typeof input === 'string' ) {

      encoding = encoding || 'utf8';

      if ( encoding === 'utf8' || encoding === 'utf-8' ) {

        return Utf8.encode ( input ).byteLength;

      } else if ( encoding === 'ascii' || encoding === 'latin1' || encoding === 'binary' ) {

        return input.length;

      } else if ( encoding === 'base64' ) {

        return Base64.decode ( input ).byteLength;

      } else if ( encoding === 'hex' ) {

        return Math.ceil ( input.length / 2 );

      } else {

        throw new Error ( 'Invalid encoding' );

      }

    } else if ( input instanceof ArrayBuffer || ( HAS_SHARED_ARRAY_BUFFER && input instanceof SharedArrayBuffer ) || isTypedArray ( input ) || isDataView ( input ) ) {

      return input.byteLength;

    } else {

      throw new Error ( 'Invalid input' );

    }

  }

  static compare ( a: Uint8Array, b: Uint8Array ): -1 | 0 | 1 {

    if ( a === b ) return 0;

    for ( let i = 0, l = Math.min ( a.length, b.length ); i < l; i++ ) {

      const ai = a[i];
      const bi = b[i];

      if ( ai === bi ) continue;

      if ( ai < bi ) return -1;

      if ( bi < ai ) return 1;

      return 0;

    }

    if ( a.length < b.length ) return -1;

    if ( b.length < a.length ) return 1;

    return 0;

  }

  static concat ( buffers: Uint8Array[], totalLength?: number ): Buffer {

    totalLength = totalLength ?? buffers.reduce ( ( acc, buffer ) => acc + buffer.length, 0 );

    const result = new Buffer ( totalLength );

    for ( let i = 0, p = 0, l = buffers.length; i < l && p < totalLength; i++ ) {

      const buffer = buffers[i];

      if ( buffer.length > ( totalLength - p ) ) {

        result.set ( buffer.subarray ( 0, ( totalLength - p ) ), p );

        p += ( totalLength - p );

      } else {

        result.set ( buffer, p );

        p += buffer.length;

      }

    }

    return result;

  }

  static from ( input: string, encoding?: Encoding ): Buffer;
  static from ( input: TypedArray ): Buffer;
  static from ( input: DataView ): Buffer;
  static from ( input: ArrayBuffer, byteOffset?: number, byteLength?: number ): Buffer;
  static from ( input: SharedArrayBuffer, byteOffset?: number, byteLength?: number ): Buffer;
  static from ( input: ArrayLike<number> ): Buffer;
  static from ( input: Serialized ): Buffer;
  static from ( input, option1?, option2? ): Buffer {

    return new Buffer ( input, option1, option2 );

  }

  static isBuffer ( value: unknown ): value is Buffer {

    return value instanceof Buffer;

  }

  static isEncoding ( value: unknown ): value is Encoding {

    return value === 'ascii' || value === 'base64' || value === 'binary' || value === 'hex' || value === 'latin1' || value === 'utf8' || value === 'utf-8';

  }

  static of ( ...elements: number[] ): Buffer {

    return new Buffer ( elements );

  }

  /* SYMBOLS API */

  [Symbol.for ( 'nodejs.util.inspect.custom' )] (): string {

    const type = 'Buffer';
    const bytes = [...super.subarray ( 0, 50 )].map ( byte => byte.toString ( 16 ).padStart ( 2, '0' ) ).join ( ' ' );
    const ellipsis = ( this.length > 50 ) ? ' ... ' : '';

    return `<${type} ${bytes}${ellipsis}>`;

  }

  /* GETTERS API */

  get view (): DataView {

    const view = this['_view'];

    if ( view ) return view;

    return this['_view'] = new DataView ( this.buffer, this.byteOffset, this.byteLength );

  }

  /* GET API */ // DataView-style reading

  getInt8 ( offset: number ): number {

    return this.view.getInt8 ( offset );

  }

  getUint8 ( offset: number ): number {

    return this.view.getUint8 ( offset );

  }

  getInt16 ( offset: number, le?: boolean ): number {

    return this.view.getInt16 ( offset, le );

  }

  getUint16 ( offset: number, le?: boolean ): number {

    return this.view.getUint16 ( offset, le );

  }

  getInt32 ( offset: number, le?: boolean ): number {

    return this.view.getInt32 ( offset, le );

  }

  getUint32 ( offset: number, le?: boolean ): number {

    return this.view.getUint32 ( offset, le );

  }

  getFloat32 ( offset: number, le?: boolean ): number {

    return this.view.getFloat32 ( offset, le );

  }

  getFloat64 ( offset: number, le?: boolean ): number {

    return this.view.getFloat64 ( offset, le );

  }

  getBigInt64 ( offset: number, le?: boolean ): bigint {

    return this.view.getBigInt64 ( offset, le );

  }

  getBigUint64 ( offset: number, le?: boolean ): bigint {

    return this.view.getBigUint64 ( offset, le );

  }

  /* SET API */ // DataView-style writing

  setInt8 ( offset: number, value: number ): void {

    return this.view.setInt8 ( offset, value );

  }

  setUint8 ( offset: number, value: number ): void {

    return this.view.setUint8 ( offset, value );

  }

  setInt16 ( offset: number, value: number, le?: boolean ): void {

    return this.view.setInt16 ( offset, value, le );

  }

  setUint16 ( offset: number, value: number, le?: boolean ): void {

    return this.view.setUint16 ( offset, value, le );

  }

  setInt32 ( offset: number, value: number, le?: boolean ): void {

    return this.view.setInt32 ( offset, value, le );

  }

  setUint32 ( offset: number, value: number, le?: boolean ): void {

    return this.view.setUint32 ( offset, value, le );

  }

  setFloat32 ( offset: number, value: number, le?: boolean ): void {

    return this.view.setFloat32 ( offset, value, le );

  }

  setFloat64 ( offset: number, value: number, le?: boolean ): void {

    return this.view.setFloat64 ( offset, value, le );

  }

  setBigInt64 ( offset: number, value: bigint, le?: boolean ): void {

    return this.view.setBigInt64 ( offset, value, le );

  }

  setBigUint64 ( offset: number, value: bigint, le?: boolean ): void {

    return this.view.setBigUint64 ( offset, value, le );

  }

  /* READ API */ // Node-style reading

  readInt8 ( offset: number ): number {

     return this.getInt8 ( offset );

  }

  readUInt8 ( offset: number ): number {

     return this.getUint8 ( offset );

  }

  readInt16LE ( offset: number ): number {

     return this.getInt16 ( offset, true );

  }

  readInt16BE ( offset: number ): number {

     return this.getInt16 ( offset );

  }

  readUInt16LE ( offset: number ): number {

     return this.getUint16 ( offset, true );

  }

  readUInt16BE ( offset: number ): number {

     return this.getUint16 ( offset );

  }

  readInt32LE ( offset: number ): number {

     return this.getInt32 ( offset, true );

  }

  readInt32BE ( offset: number ): number {

     return this.getInt32 ( offset );

  }

  readUInt32LE ( offset: number ): number {

     return this.getUint32 ( offset, true );

  }

  readUInt32BE ( offset: number ): number {

     return this.getUint32 ( offset );

  }

  readFloatLE ( offset: number ): number {

     return this.getFloat32 ( offset, true );

  }

  readFloatBE ( offset: number ): number {

     return this.getFloat32 ( offset );

  }

  readDoubleLE ( offset: number ): number {

     return this.getFloat64 ( offset, true );

  }

  readDoubleBE ( offset: number ): number {

     return this.getFloat64 ( offset );

  }

  readBigInt64LE ( offset: number ): bigint {

     return this.getBigInt64 ( offset, true );

  }

  readBigInt64BE ( offset: number ): bigint {

     return this.getBigInt64 ( offset );

  }

  readBigUInt64LE ( offset: number ): bigint {

     return this.getBigUint64 ( offset, true );

  }

  readBigUInt64BE ( offset: number ): bigint {

     return this.getBigUint64 ( offset );

  }

  /* WRITE API */ // Node-style writing

  writeInt8 ( value: number, offset: number ): number {

    this.setInt8 ( offset, value );

    return offset + 1;

  }

  writeUInt8 ( value: number, offset: number ): number {

    this.setUint8 ( offset, value );

    return offset + 1;

  }

  writeInt16LE ( value: number, offset: number ): number {

    this.setInt16 ( offset, value, true );

    return offset + 2;

  }

  writeInt16BE ( value: number, offset: number ): number {

    this.setInt16 ( offset, value );

    return offset + 2;

  }

  writeUInt16LE ( value: number, offset: number ): number {

    this.setUint16 ( offset, value, true );

    return offset + 2;

  }

  writeUInt16BE ( value: number, offset: number ): number {

    this.setUint16 ( offset, value );

    return offset + 2;

  }

  writeInt32LE ( value: number, offset: number ): number {

    this.setInt32 ( offset, value, true );

    return offset + 4;

  }

  writeInt32BE ( value: number, offset: number ): number {

    this.setInt32 ( offset, value );

    return offset + 4;

  }

  writeUInt32LE ( value: number, offset: number ): number {

    this.setUint32 ( offset, value, true );

    return offset + 4;

  }

  writeUInt32BE ( value: number, offset: number ): number {

    this.setUint32 ( offset, value );

    return offset + 4;

  }

  writeFloatLE ( value: number, offset: number ): number {

    this.setFloat32 ( offset, value, true );

    return offset + 4;

  }

  writeFloatBE ( value: number, offset: number ): number {

    this.setFloat32 ( offset, value );

    return offset + 4;

  }

  writeDoubleLE ( value: number, offset: number ): number {

    this.setFloat64 ( offset, value, true );

    return offset + 8;

  }

  writeDoubleBE ( value: number, offset: number ): number {

    this.setFloat64 ( offset, value );

    return offset + 8;

  }

  writeBigInt64LE ( value: bigint, offset: number ): number {

    this.setBigInt64 ( offset, value, true );

    return offset + 8;

  }

  writeBigInt64BE ( value: bigint, offset: number ): number {

    this.setBigInt64 ( offset, value );

    return offset + 8;

  }

  writeBigUInt64LE ( value: bigint, offset: number ): number {

    this.setBigUint64 ( offset, value, true );

    return offset + 8;

  }

  writeBigUInt64BE ( value: bigint, offset: number ): number {

    this.setBigUint64 ( offset, value );

    return offset + 8;

  }

  /* API */

  compare ( buffer: Uint8Array, bufferStart: number = 0, bufferEnd: number = buffer.length, sourceStart: number = 0, sourceEnd: number = this.length ): -1 | 0 | 1 {

    for ( let ia = sourceStart, ib = bufferStart; ia < sourceEnd && ib < bufferEnd; ia++, ib++ ) {

      const ai = this[ia];
      const bi = buffer[ib];

      if ( ai === bi ) continue;

      if ( ai < bi ) return -1;

      if ( bi < ai ) return 1;

      return 0;

    }

    const aLength = ( sourceEnd - sourceStart );
    const bLength = ( bufferEnd - bufferStart );

    if ( aLength < bLength ) return -1;

    if ( bLength < aLength ) return 1;

    return 0;

  }

  copy ( buffer: Uint8Array, bufferStart: number = 0, sourceStart: number = 0, sourceEnd: number = this.length ): number {

    const length = sourceEnd - sourceStart;

    if ( buffer === this ) {

      buffer.copyWithin ( bufferStart, sourceStart, sourceEnd );

    } else {

      if ( length <= FAST_FOR_THRESHOLD ) {

        for ( let i = sourceStart; i < sourceEnd; i++ ) {

          buffer[bufferStart++] = this[i];

        }

      } else {

        buffer.set ( super.subarray ( sourceStart, sourceEnd ), bufferStart );

      }

    }

    return length;

  }

  equals ( buffer: Uint8Array ): boolean {

    return !Buffer.compare ( this, buffer );

  }

  fill ( value: Filler, start: number = 0, end: number = this.length, encoding?: Encoding ): this {

    if ( typeof value === 'number' ) {

      return super.fill ( value, start, end );

    } else if ( typeof value === 'string' ) { //TODO: Optimize this, it might be unnecessary to decode the whole string

      const buffer = Buffer.from ( value, encoding );

      return this.fill ( buffer, start, end );

    } else {

      for ( let i = start; i < end; i += value.length ) {

        if ( value.length > ( end - i ) ) {

          this.set ( value.subarray ( 0, ( end - i ) ), i );

        } else {

          this.set ( value, i );

        }

      }

      return this;

    }

  }

  slice ( start?: number, end?: number ): Buffer {

    return this.subarray ( start, end );

  }

  subarray ( start?: number, end?: number ): Buffer {

    const buffer = super.subarray ( start, end );

    return new Buffer ( buffer.buffer, buffer.byteOffset, buffer.byteLength );

  }

  swap16 (): this {

    if ( this.length % 2 ) throw new Error ( 'Buffer size must be a multiple of 16-bits' );

    for ( let i = 0, l = this.length; i < l; i += 2 ) {

      swap ( this, i, i + 1 );

    }

    return this;

  }

  swap32 (): this {

    if ( this.length % 4 ) throw new Error ( 'Buffer size must be a multiple of 32-bits' );

    for ( let i = 0, l = this.length; i < l; i += 4 ) {

      swap ( this, i, i + 3 );
      swap ( this, i + 1, i + 2 );

    }

    return this;

  }

  swap64 (): this {

    if ( this.length % 8 ) throw new Error ( 'Buffer size must be a multiple of 64-bits' );

    for ( let i = 0, l = this.length; i < l; i += 8 ) {

      swap ( this, i, i + 7 );
      swap ( this, i + 1, i + 6 );
      swap ( this, i + 2, i + 5 );
      swap ( this, i + 3, i + 4 );

    }

    return this;

  }

  toJSON (): Serialized {

    const type = 'Buffer';
    const data = Array.from ( this );

    return { type, data };

  }

  toLocalString ( encoding: Encoding = 'utf8', start?: number, end?: number ): string {

    return this.toString ( encoding, start, end );

  }

  toString ( encoding: Encoding = 'utf8', start?: number, end?: number ): string {

    if ( typeof start === 'number' && ( start !== 0 || ( typeof end === 'number' && end < this.length ) ) ) {

      const buffer = super.subarray ( start, end );

      return this.toString.call ( buffer, encoding );

    } else {

      if ( encoding === 'utf8' || encoding === 'utf-8' ) {

        return Utf8.decode ( this );

      } else if ( encoding === 'latin1' || encoding === 'binary' ) {

        return Latin1.encode ( this );

      } else if ( encoding === 'base64' ) {

        return Base64.encode ( this );

      } else if ( encoding === 'hex' ) {

        return Hex.encode ( this );

      } else if ( encoding === 'ascii' ) {

        const ascii = this.map ( value => value & 127 ); // The way the "ascii" "encoding" is implemented makes no sense but that's how Node's Buffer works...

        return Latin1.encode ( ascii );

      } else {

        throw new Error ( 'Invalid encoding' );

      }

    }

  }

  write ( string: string, offset: number = 0, length: number = this.length - offset, encoding?: Encoding ): number {

    length = Math.min ( length, this.length - offset );

    const isUTF8 = ( encoding === undefined ) || encoding === 'utf8' || encoding === 'utf-8';
    const stringChopped = isUTF8 ? string.slice ( 0, length ) : string; // Potentially skipping some unnecessary decoding
    const bufferRaw = new Buffer ( stringChopped, encoding );
    const bufferChopped = isUTF8 ? utf8chop ( bufferRaw, length ) : bufferRaw; // Avoiding writing invalid code points
    const buffer = bufferChopped;

    length = Math.min ( length, buffer.length );

    if ( length <= FAST_FOR_THRESHOLD ) {

      for ( let i = 0; i < length; i++ ) {

        this[offset++] = buffer[i];

      }

    } else {

      this.set ( buffer, offset );

    }

    return length;

  }

}

/* EXPORT */

export default Buffer;
export {Buffer};
