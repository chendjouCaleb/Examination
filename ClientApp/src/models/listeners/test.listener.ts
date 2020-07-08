import {Inject, Injectable} from "@angular/core";
import {TestHub} from "examination/hubs";
import {  AuthorizationManager} from "examination/app/authorization";
import {IListenerAlert, LISTENER_ALERT_SERVICE_TOKEN} from "./listener-alert.interface";

@Injectable()
export class TestHubListener {
  constructor(private _hub: TestHub,
              private _identity: AuthorizationManager,
              @Inject(LISTENER_ALERT_SERVICE_TOKEN) private _alert: IListenerAlert) {
  }

  listen() {
    this._hub.testStarted.subscribe(test => {
      if(this._identity.user.isAffectedByTest(test)) {
        this._alert.info(`l'épreuve ${test.name} (${test.code}) vient de débutée.`)
      }
    })
  }
}
