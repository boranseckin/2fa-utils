# Two-Factor Authentication
Using the algorithm provided in [RFC 4226](https://tools.ietf.org/rfc/rfc4226), can generate and verify HMAC-based one-time password (HOTP) and time-based one-time password (TOTP). The secret is turned into a QR code and stored locally.

The QR code could be used by any standard authentication applications like Google Authenticator or Authy to create TOTPs.

## Features
- Generate time-based one-time passwords.
- Automatically create [`otpauth`](https://github.com/google/google-authenticator/wiki/Key-Uri-Format) urls.
- Specify the name of the issuer and the email of the user.
- Export generated secrets as QR codes.
- Add your secrets to any authentication application.
- Verify tokens created by the applications.
- Locally store generated secret and QR code.
- View your local secret and QR code.

## Dependencies
- [clear](https://www.npmjs.com/package/clear)
- [enquirer](https://www.npmjs.com/package/enquirer)
- [hi-base32](https://www.npmjs.com/package/hi-base32)
- [qrcode](https://www.npmjs.com/package/qrcode)

## Author
- Boran Seckin

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
