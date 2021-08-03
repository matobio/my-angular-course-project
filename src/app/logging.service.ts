import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoggingService {
  lastlog: string;

  pringLog(message: string): void {
    console.log(message);
    console.log(this.lastlog);
    this.lastlog = message;
  }
}
