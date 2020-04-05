import fs from 'fs';
import clear from 'clear';
import qrcode from 'qrcode';

import twoFA from './2FA';

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
  fs.writeFileSync('./.env', `secret=${secret}`);
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

      createQRCode(name, email, secret);
      break;
    }

    case 'Existing': {
      await verifyQuestion(process.env.secret || '');
      break;
    }

    case 'Show': {
      console.log(`Secret: ${process.env.secret}`);
      console.log(`QR Code: ${process.cwd()}/qrcode.html`);
      break;
    }

    default:
      break;
  }
};

export default cli;
