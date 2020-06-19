import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class AlertEmitter {

  constructor(private snackBar: MatSnackBar) { }

  log(message: string) {
    this.snackBar.open(message, "Fermer");
  }

  error(message: string, duration: number = 50000) {
    this.snackBar.open(message, "Fermer", {duration, panelClass: ["ms-bgColor-sharedRed10", 'ms-fontColor-white']});
  }

  success(message: string, duration: number = 50000) {
    this.snackBar.open(message, "Fermer", {duration, panelClass: ["ms-bgColor-sharedGreen10", 'ms-fontColor-white']});
  }

  info(message: string, duration: number = 50000) {
    this.snackBar.open(message, "Fermer", {duration, panelClass: ["ms-bgColor-sharedBlue10", "ms-color-white"]});
  }
}
