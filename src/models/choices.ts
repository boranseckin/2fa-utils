export interface Answer {
  action: string;
  name: string;
  email: string;
  token: string;
}

export interface Choice {
  name: string;
  message: ActionDescription;
}

export enum ActionDescription {
  NEW = 'Create a new secret',
  EXISTING = 'Use the existing secret',
  SHOW = 'Show the existing secret',
}
