import dotenv, { DotenvParseOutput } from "dotenv";

export interface IConfigService {
  get(key: string): string;
}

// singleton pattern
export class ConfigService implements IConfigService {
  private static instance: ConfigService;
  private config: DotenvParseOutput;

  private constructor() {
    const { error, parsed } = dotenv.config();

    if (error) throw new Error("No .env file found");
    if (!parsed) throw new Error(".env is empty");

    this.config = parsed;
  }

  get(key: string): string {
    const res = this.config[key];
    if (!res) throw new Error(`Key "${key}" not found in .env`);
    return res;
  }

  static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }
    return ConfigService.instance;
  }
}
