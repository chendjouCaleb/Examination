import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {Test} from "../../../../models/entities/test.entity";

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.scss']
})
export class TestDetailsComponent implements OnInit {

  @HostBinding('class')
  className: string = 'app-test-details';

  @Input()
  test: Test;

  constructor() { }

  ngOnInit(): void {
  }

}
