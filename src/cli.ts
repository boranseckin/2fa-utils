import fs from 'fs';
import clear from 'clear';
import qrcode from 'qrcode';

import twoFA from './2FA';

import Config from './utils/config';

import actionQuestion from './questions/action';
import createQuestion from './questions/create';
import verifyQuestion from './questions/verify';

/**
 * Create a QR Code using the parameters and save it as ./qrcode.html.
 *
 * @param name Name of the application
 * @param email Email of the user
 * @param secret Base32 encoded secret
 */
const createQRCode = async (name: string, email: string, secret: string): Promise<void> => {
  const url = `otpauth://totp/${email}?secret=${secret}&issuer=${name}`;
  const result = await qrcode.toDataURL(url);
  fs.writeFileSync('./qrcode.html', `<img src=${result}>`);
};


const cli = async (): Promise<void> => {
  clear();

  const actionAnswer = await actionQuestion();

  switch (actionAnswer.action) {
    case 'New': {
      const createAnswer = await createQuestion();
      const { name, email } = createAnswer;

      const secret = twoFA.generateSecret(16);

      Config.saveSecret(secret);
      createQRCode(name, email, secret);
      break;
    }

    case 'Existing': {
      await Config.readSecret()
        .then(async (data) => {
          await verifyQuestion(data.secret).catch((err) => console.log(err));
        })
        .catch(() => console.log('Config file not found!'));
      break;
    }

    case 'Show': {
      await Config.readSecret()
        .then((data) => {
          console.log(`Secret: ${data.secret}`);

          Config.checkExistence('./qrcode.html').then((exist) => {
            if (exist) {
              console.log(`QR Code: file://${process.cwd()}/qrcode.html`);
            } else {
              console.log('QR Code not found!');
            }
          });
        })
        .catch(() => console.log('Config file not found!'));

      break;
    }

    default:
      break;
  }
};

export default cli;
