import { Injectable } from '@angular/core';

@Injectable()
export class AlertEmitter {
    info(message: string) {
      console.log(new Date().toDateString(), message)
    }
}
