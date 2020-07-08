import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {Test} from "examination/models";
import {TestService} from "../test.service";
import {TestHub} from "examination/hubs";

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.scss'],
  host: {
    'class': 'app-test-details'
  }
})
export class TestDetailsComponent implements OnInit {
  @Input()
  test: Test;
  constructor(public service: TestService,
              private _testHub: TestHub) { }

  ngOnInit(): void {
    this._testHub.testEnded.subscribe(test => {
      if(test.id === this.test.id && !this.test.endDate) {
        this.test.endDate = test.endDate;
      }
    });

    this._testHub.testRestarted.subscribe(test => {
      if(test.id === this.test.id && this.test.endDate) {
        this.test.endDate = null;
      }
    });

    this._testHub.testStarted.subscribe(test => {
      if(test.id === this.test.id && !this.test.startDate) {
        this.test.startDate = test.startDate;
      }
    });
  }

}
