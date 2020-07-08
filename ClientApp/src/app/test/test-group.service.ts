import {ITestGroupService} from "examination/app/test/test-group.service.interface";
import {Injectable} from "@angular/core";
import {TestGroup, TestGroupHttpClient} from "examination/models";
import {Confirmation} from "examination/controls";

@Injectable({providedIn: 'root'})
export class TestGroupService implements ITestGroupService {

  constructor(private _httpClient: TestGroupHttpClient,
              private _confirmation: Confirmation) {

  }

  end(testGroup: TestGroup): Promise<void> {
    const message = `Terminer l'épreuve de ${testGroup.test.name} (${testGroup.test.code}) pour 
    le groupe ${testGroup.group.name}?`;
    return new Promise<void>(resolve => {
      const confirm = this._confirmation.open(message);
      confirm.accept.subscribe(async () => {
        await this._httpClient.end(testGroup);
        testGroup.endDate = new Date();
        resolve();
      });
    });
  }

  restart(testGroup: TestGroup): Promise<void> {
    const message = `Poursuivre l'épreuve de ${testGroup.test.name} (${testGroup.test.code}) pour 
    le groupe ${testGroup.group.name}?`;
    return new Promise<void>(resolve => {
      const confirm = this._confirmation.open(message);
      confirm.accept.subscribe(async () => {
        await this._httpClient.restart(testGroup);
        testGroup.endDate = null;
        resolve();
      });
    });
  }

  start(testGroup: TestGroup): Promise<void> {
    const message = `Débuter l'épreuve de ${testGroup.test.name} (${testGroup.test.code}) pour 
    le groupe ${testGroup.group.name}?`;
    return new Promise<void>(resolve => {
      const confirm = this._confirmation.open(message);
      confirm.accept.subscribe(async () => {
        await this._httpClient.start(testGroup);
        testGroup.startDate = new Date();
        resolve();
      });
    });
  }

}
