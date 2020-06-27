import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {Test} from "examination/models";
import {TestService} from "../test.service";

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
  constructor(public service: TestService) { }

  ngOnInit(): void {
  }

}
