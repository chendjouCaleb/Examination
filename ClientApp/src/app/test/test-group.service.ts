import {ITestGroupService} from "examination/app/test/test-group.service.interface";
import {Injectable} from "@angular/core";
import {TestGroup} from "examination/models";

@Injectable({providedIn: 'root'  })
export class TestGroupService implements ITestGroupService{
  end(testGroup: TestGroup): Promise<void> {
    return undefined;
  }

  restart(testGroup: TestGroup): Promise<void> {
    return undefined;
  }

  start(testGroup: TestGroup): Promise<void> {
    return undefined;
  }

}
