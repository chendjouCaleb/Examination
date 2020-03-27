import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.scss']
})
export class TestDetailsComponent implements OnInit {

  @HostBinding('class')
  className: string = 'app-test-details';

  constructor() { }

  ngOnInit(): void {
  }

}
