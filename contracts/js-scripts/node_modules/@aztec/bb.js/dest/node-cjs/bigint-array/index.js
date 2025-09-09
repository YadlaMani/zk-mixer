"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buffer32BytesToBigIntBE = buffer32BytesToBigIntBE;
exports.uint8ArrayToBigIntBE = uint8ArrayToBigIntBE;
exports.bigIntToBufferBE = bigIntToBufferBE;
exports.bigIntToUint8ArrayBE = bigIntToUint8ArrayBE;
/**
 * Convert a 32-byte BE Buffer to a BigInt.
 */
function buffer32BytesToBigIntBE(buf) {
    return ((buf.readBigUInt64BE(0) << 192n) +
        (buf.readBigUInt64BE(8) << 128n) +
        (buf.readBigUInt64BE(16) << 64n) +
        buf.readBigUInt64BE(24));
}
/**
 * Convert a BE Uint8Array to a BigInt.
 */
function uint8ArrayToBigIntBE(bytes) {
    const buffer = Buffer.from(bytes);
    return buffer32BytesToBigIntBE(buffer);
}
/**
 * Convert a BigInt to a 32-byte BE Buffer.
 */
function bigIntToBufferBE(value, byteLength = 32) {
    if (byteLength != 32) {
        throw new Error(`Only 32 bytes supported for conversion from bigint to buffer, attempted byte length: ${byteLength}`);
    }
    const buf = Buffer.alloc(byteLength);
    buf.writeBigUInt64BE(value >> 192n, 0);
    buf.writeBigUInt64BE((value >> 128n) & 0xffffffffffffffffn, 8);
    buf.writeBigUInt64BE((value >> 64n) & 0xffffffffffffffffn, 16);
    buf.writeBigUInt64BE(value & 0xffffffffffffffffn, 24);
    return buf;
}
/**
 * Convert a BigInt to a 32-byte BE Uint8Array.
 */
function bigIntToUint8ArrayBE(value, byteLength = 32) {
    return new Uint8Array(bigIntToBufferBE(value, byteLength));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmlnaW50LWFycmF5L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsMERBT0M7QUFLRCxvREFHQztBQUtELDRDQVlDO0FBS0Qsb0RBRUM7QUExQ0Q7O0dBRUc7QUFDSCxTQUFnQix1QkFBdUIsQ0FBQyxHQUFXO0lBQ2pELE9BQU8sQ0FDTCxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO1FBQ2hDLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUM7UUFDaEMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQztRQUNoQyxHQUFHLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUN4QixDQUFDO0FBQ0osQ0FBQztBQUVEOztHQUVHO0FBQ0gsU0FBZ0Isb0JBQW9CLENBQUMsS0FBaUI7SUFDcEQsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxPQUFPLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3pDLENBQUM7QUFFRDs7R0FFRztBQUNILFNBQWdCLGdCQUFnQixDQUFDLEtBQWEsRUFBRSxVQUFVLEdBQUcsRUFBRTtJQUM3RCxJQUFJLFVBQVUsSUFBSSxFQUFFLEVBQUUsQ0FBQztRQUNyQixNQUFNLElBQUksS0FBSyxDQUNiLHdGQUF3RixVQUFVLEVBQUUsQ0FDckcsQ0FBQztJQUNKLENBQUM7SUFDRCxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3JDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxtQkFBbUIsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvRCxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDLEdBQUcsbUJBQW1CLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDL0QsR0FBRyxDQUFDLGdCQUFnQixDQUFDLEtBQUssR0FBRyxtQkFBbUIsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN0RCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFFRDs7R0FFRztBQUNILFNBQWdCLG9CQUFvQixDQUFDLEtBQWEsRUFBRSxVQUFVLEdBQUcsRUFBRTtJQUNqRSxPQUFPLElBQUksVUFBVSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO0FBQzdELENBQUMifQ==