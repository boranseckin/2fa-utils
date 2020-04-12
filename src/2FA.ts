import crypto, { Hmac } from 'crypto';
import base32 from 'hi-base32';

export default class twoFA {
  /**
   * Resources:
   * - https://hackernoon.com/how-to-implement-google-authenticator-two-factor-auth-in-javascript-091wy3vh3
   * - https://tools.ietf.org/rfc/rfc4226
   * - https://tools.ietf.org/rfc/rfc6238
   */

  /**
   * Generate a base32 encoded secret at given length (default is 16 characters).
   *
   * @param length Length of the secret
   *
   * @returns String of random secret
   */
  static generateSecret(length: number = 16): string {
    // Create a buffer of random bytes.
    const randomBuffer = crypto.randomBytes(length);

    // Create the secret as base32 of random buffer.
    // Remove excess '=' at the end of base32.
    const secret = base32.encode(randomBuffer).replace(/=/g, '');
    return secret;
  }

  /**
   * Generate a HMAC-based one-time password using a secret and a counter at a specific length.
   *
   * @param secret Base32 encoded secret
   * @param counter Current Unix time value with a time-step
   * @param otpLength Length of the one-time password
   *
   * @returns One time password
   */
  static generateHOTP(secret: string, counter: number, otpLength: number = 6): number {
    // Decode base32 encoded secret into array of numbers.
    const decodedSecret: number[] = base32.decode.asBytes(secret);
    // Allocate an empty buffer of 8 bytes.
    const bufferLength = 8;
    const buffer: Buffer = Buffer.alloc(bufferLength);
    // Create a local counter using the parameter.
    let localCounter = counter;

    // Write the counter into the buffer.
    for (let i = 0; i < bufferLength; i += 1) {
      // Starting from low-order, for each byte, write 8 bits of the counter.
      buffer[(bufferLength - 1) - i] = localCounter & 0xff;
      // Shift counter 8 bits to the right.
      localCounter >>= 8;
    }

    // Step 1: Generate an HMAC-SHA-1 value
    // Create HMAC using sha1 algorithm and the buffer of the decoded secret.
    const hmac: Hmac = crypto.createHmac('sha1', Buffer.from(decodedSecret));
    // Update HMAC using the buffer of the counter.
    hmac.update(buffer);
    // Calculate the digest of all the data passed into HMAC.
    const hmacResult: Buffer = hmac.digest();

    // Step 2: Generate a 4-byte string (Dynamic Truncation)
    const code: number = this.dynamicTruncation(hmacResult);

    // Step 3: Compute an HTOP value
    // Get the last 6 digits of the code.
    return code % (10 ** otpLength);
  }

  /**
   * Extract 4-byte dynamic binary code from a 20-byte HMAC-SHA-1 result.
   * Copied from [RFC 4226](https://tools.ietf.org/html/rfc4226).
   *
   * @param hamcValue HMAC-SHA-1 result
   *
   * @returns 4-byte binary code
   */
  static dynamicTruncation(hamcValue: Buffer): number {
    // Offset is the low-order 4 bits of the supplied string.
    // 0 <= Offset <= 15
    const offset = hamcValue[hamcValue.length - 1] & 0xf;

    return (
      ((hamcValue[offset] & 0x7f) << 24)
      | ((hamcValue[offset + 1] & 0xff) << 16)
      | ((hamcValue[offset + 2] & 0xff) << 8)
      | (hamcValue[offset + 3] & 0xff)
    );
  }

  /**
   * Generate a time-based HMAC-based one-time password using a secret and interval of time.
   *
   * @param secret Base32 encoded secret
   * @param window Time offset (n = n(30) seconds to the future / -n = n(30) second to the past)
   *
   * @returns Time-based one time password
   */
  static generateTOTP(secret: string, window: number = 0): string {
    // Counter will increment every 30 seconds.
    const counter: number = Math.floor(Date.now() / 30000);
    // Calculate the one-time password using the counter and the window.
    const hotp = this.generateHOTP(secret, counter + window).toString();
    // If the first char is 0, don't let it be omitted as number.
    return (hotp.length === 5) ? `0${hotp}` : hotp;
  }

  /**
   * Checks the validity of a token using a secret.
   *
   * @param token Token from the user
   * @param secret Base32 encoded secret
   * @param window Accepted time offset (both past and future) [0, 10]
   *
   * @returns Whether the token is correct or not
   */
  static verifyTOTP(token: string, secret: string, window: number = 1): boolean {
    if (Math.abs(+window) > 10) {
      console.error('Window size is too large');
      return false;
    }

    for (let errorWindow = -window; errorWindow <= window; errorWindow += 1) {
      // For each window check the validity of the token.
      const totp: string = this.generateTOTP(secret, errorWindow);
      if (token === totp) return true;
    }

    return false;
  }
}
