# Two-Factor Authentication
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
