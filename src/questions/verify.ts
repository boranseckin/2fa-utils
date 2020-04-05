import enquirer from 'enquirer';

import twoFA from '../2FA';

import { Answer } from '../models/choices';

async function verifyQuestion(secret: string): Promise<Answer> {
  return enquirer.prompt({
    type: 'input',
    name: 'token',
    message: 'What is your 2FA token?',
    validate: (input) => twoFA.verifyTOTP(input, secret),
    result: () => 'Correct',
  });
}

export default verifyQuestion;
