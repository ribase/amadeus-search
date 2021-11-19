import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAuth(): string {
    return "test"
  }
}
