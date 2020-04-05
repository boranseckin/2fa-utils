import enquirer from 'enquirer';

import { Choice, Answer, ActionDescription } from '../models/choices';

async function actionQuestion(): Promise<Answer> {
  const listOfActions: Choice[] = [
    { name: 'Existing', message: ActionDescription.EXISTING },
    { name: 'Show', message: ActionDescription.SHOW },
    { name: 'New', message: ActionDescription.NEW },
  ];

  return enquirer.prompt({
    name: 'action',
    type: 'select',
    message: 'What would you want to do?',
    choices: listOfActions,
  });
}

export default actionQuestion;
