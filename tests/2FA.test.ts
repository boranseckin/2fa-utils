import twoFA from '../src/2FA';

describe('2FA Tests', () => {

  describe('generateSecret()', () => {

    test('should return string', () => {
      const secret = twoFA.generateSecret();
      expect(typeof secret).toBe('string');
    });

    test('should generate 26 char long secret without arg', () => {
      const secret = twoFA.generateSecret();
      expect(secret.length).toBe(26);
    });

    test('should generate 32 char long secret with arg 20', () => {
      const secret = twoFA.generateSecret(20);
      expect(secret.length).toBe(32);
    });

  });

  describe('generateHOTP()', () => {

    test('should return string', () => {
      const secret = twoFA.generateSecret();
      const counter: number = Math.floor(Date.now() / 30000);
      const hotp = twoFA.generateHOTP(secret, counter);
      expect(typeof hotp).toBe('string');
    });

    test('should generate 6 char long number without arg', () => {
      const secret = twoFA.generateSecret();
      const counter: number = Math.floor(Date.now() / 30000);
      const hotp = twoFA.generateHOTP(secret, counter);
      expect(hotp.toString().length).toBe(6);
    });

    test('should generate 4 char long number with arg 4', () => {
      const secret = twoFA.generateSecret();
      const counter: number = Math.floor(Date.now() / 30000);
      const hotp = twoFA.generateHOTP(secret, counter, 4);
      expect(hotp.toString().length).toBe(4);
    });

  });

  describe('generateTOTP()', () => {

    test('should return string', () => {
      const secret = twoFA.generateSecret();
      const totp = twoFA.generateTOTP(secret);
      expect(typeof totp).toBe('string');
    });

    test('should generate present token without arg', () => {
      const secret = twoFA.generateSecret();
      const counter: number = Math.floor(Date.now() / 30000);

      const hotp = twoFA.generateHOTP(secret, counter);
      const totp = twoFA.generateTOTP(secret);
      expect(totp).toBe(hotp.toString());
    });

    test('should generate past token with arg -1', () => {
      const secret = twoFA.generateSecret();
      const counter: number = Math.floor(Date.now() / 30000);

      const hotp = twoFA.generateHOTP(secret, (counter - 1));
      const totp = twoFA.generateTOTP(secret, -1);
      expect(totp).toBe(hotp.toString());
    });

    test('should generate future token with arg 1', () => {
      const secret = twoFA.generateSecret();
      const counter: number = Math.floor(Date.now() / 30000);

      const hotp = twoFA.generateHOTP(secret, (counter + 1));
      const totp = twoFA.generateTOTP(secret, 1);
      expect(totp).toBe(hotp.toString());
    });

  });

  describe('verifyTOTP()', () => {

    test('should return boolean', () => {
      const secret = twoFA.generateSecret();
      const verify = twoFA.verifyTOTP('111111', secret);
      expect(typeof verify).toBe('boolean');
    });

    test('should return false with incorrect token', () => {
      const secret = twoFA.generateSecret();
      const verify = twoFA.verifyTOTP('111111', secret);
      expect(verify).toBeFalsy();
    });

    test('should return false with incorrect secret', () => {
      const secret = twoFA.generateSecret();
      const secret2 = twoFA.generateSecret();
      const totp = twoFA.generateTOTP(secret);
      const verify = twoFA.verifyTOTP(totp, secret2);
      expect(verify).toBeFalsy();
    });

    test('should return false with too large window size', () => {
      const secret = twoFA.generateSecret();
      const totp = twoFA.generateTOTP(secret);
      const verify = twoFA.verifyTOTP(totp, secret, 15);
      expect(verify).toBeFalsy();
    });

    test('should return true with correct present token', () => {
      const secret = twoFA.generateSecret();
      const totp = twoFA.generateTOTP(secret);
      const verify = twoFA.verifyTOTP(totp, secret);
      expect(verify).toBeTruthy();
    });

    test('should return true with correct past token', () => {
      const secret = twoFA.generateSecret();
      const totp = twoFA.generateTOTP(secret, -1);
      const verify = twoFA.verifyTOTP(totp, secret);
      expect(verify).toBeTruthy();
    });

    test('should return true with correct future token', () => {
      const secret = twoFA.generateSecret();
      const totp = twoFA.generateTOTP(secret, 1);
      const verify = twoFA.verifyTOTP(totp, secret);
      expect(verify).toBeTruthy();
    });

  });

});
