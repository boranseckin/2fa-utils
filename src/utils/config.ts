import fs from 'fs';

import { ConfigModel } from '../models/choices';

class Config {
  static configPath = './config.json';

  static async checkExistence(path: string): Promise<boolean> {
    return new Promise((resolve) => {
      if (fs.existsSync(path)) {
        resolve(true);
      }
      resolve(false);
    });
  }

  static async createConfig(data: object): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.configPath, JSON.stringify(data, null, 2), (error) => {
        if (error) reject(error);
        resolve();
      });
    });
  }

  static async saveSecret(secret: string): Promise<void> {
    return this.createConfig({ secret });
  }

  static async readSecret(): Promise<ConfigModel> {
    if (!await this.checkExistence(this.configPath)) throw Error('File not found!');

    return new Promise((resolve, reject) => {
      fs.readFile(this.configPath, 'utf8', (error, data) => {
        if (error) reject(error);
        resolve(JSON.parse(data));
      });
    });
  }
}

export default Config;
