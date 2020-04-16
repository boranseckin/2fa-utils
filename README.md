# Two-Factor Authentication
[![npm](https://img.shields.io/npm/v/2fa-utils?style=for-the-badge)](https://www.npmjs.com/package/2fa-utils)
[![Travis (.com)](https://img.shields.io/travis/com/boranseckin/2fa-utils?style=for-the-badge)](https://https://travis-ci.com/github/boranseckin/2fa-utils)
[![Codecov](https://img.shields.io/codecov/c/gh/boranseckin/2fa-utils?style=for-the-badge)](https://codecov.io/gh/boranseckin/2fa-utils)

[![David](https://img.shields.io/david/boranseckin/2fa-utils?style=for-the-badge)](https://david-dm.org/boranseckin/2fa-utils)
![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/2fa-utils?style=for-the-badge)

Using the algorithm provided in [RFC 4226](https://tools.ietf.org/rfc/rfc4226), can generate and verify HMAC-based one-time password (HOTP) and time-based one-time password (TOTP).

## Features
- Generate base-32 encoded secrets.
- Generate HMAC-based one-time passwords (HOTP) at a specific length.
- Generate time-based HOTPs at a specific amount of windows.
- Verify generated tokens.

## Dependencies
- [hi-base32](https://www.npmjs.com/package/hi-base32)

## Author
- Boran Seckin

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
