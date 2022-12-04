import { Injectable } from "@nestjs/common";
import * as dotenv from "dotenv"
import * as fs from "fs"

@Injectable()
export class ConfigService {
  private readonly envConfig: any;

  constructor() {
    this.envConfig = dotenv.parse(fs.readFileSync(`.${process.env.NODE_ENV}.env`));
  }

  get privateKey(): string {
    return this.envConfig.PRIVATE_KEY;
  }
}