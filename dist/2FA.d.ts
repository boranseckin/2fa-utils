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
    static generateSecret(length?: number): string;
    /**
     * Generate a HMAC-based one-time password using a secret and a counter at a specific length.
     *
     * @param secret Base32 encoded secret
     * @param counter Current Unix time value with a time-step
     * @param otpLength Length of the one-time password
     *
     * @returns One time password
     */
    static generateHOTP(secret: string, counter: number, otpLength?: number): string;
    /**
     * Extract 4-byte dynamic binary code from a 20-byte HMAC-SHA-1 result.
     * Copied from [RFC 4226](https://tools.ietf.org/html/rfc4226).
     *
     * @param hmacValue HMAC-SHA-1 result
     *
     * @returns 4-byte binary code
     */
    private static dynamicTruncation;
    /**
     * Generate a time-based HMAC-based one-time password using a secret and interval of time.
     *
     * @param secret Base32 encoded secret
     * @param window Time offset (n = n(30) seconds to the future / -n = n(30) second to the past)
     *
     * @returns Time-based one time password
     */
    static generateTOTP(secret: string, window?: number): string;
    /**
     * Checks the validity of a token using a secret.
     *
     * @param token Token from the user
     * @param secret Base32 encoded secret
     * @param window Accepted time offset (both past and future) [0, 10]
     *
     * @returns Whether the token is correct or not
     */
    static verifyTOTP(token: string, secret: string, window?: number): boolean;
}
