import enquirer from 'enquirer';

import { Answer } from '../models/choices';

async function createQuestion(): Promise<Answer> {
  return enquirer.prompt([
    {
      name: 'name',
      type: 'input',
      message: 'What is the name of the application?',
    },
    {
      name: 'email',
      type: 'input',
      message: 'What is the user\'s email?',
      format: (input: string) => input.toLowerCase(),
      result: (input: string) => input.toLowerCase(),
    },
  ]);
}

export default createQuestion;
