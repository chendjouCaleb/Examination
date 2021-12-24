import {Component, Input} from "@angular/core";
import {TestGroup} from "@examination/entities";
import {TestGroupHttpClient} from "@examination/http";
import {TestGroupLoader} from "@examination/loaders";

@Component({
  templateUrl: 'TestHomeGroups.html',
  selector: 'TestHomeGroups'
})
export class TestHomeGroups {
  @Input()
  testGroups: TestGroup[];

  constructor() {}

}
