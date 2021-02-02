import {Component, Inject, Input, OnInit} from '@angular/core';
import {Test, TestLevelSpeciality} from 'examination/entities';
import {ITestService, TEST_SERVICE_TOKEN} from '../test.service.interface';

@Component({
  templateUrl: 'test-level-speciality-item.html',
  styleUrls: ['test-level-speciality-item.scss'],
  selector: 'app-test-level-speciality-item'
})
export class TestLevelSpecialityItem implements OnInit {
  @Input()
  testLevelSpeciality: TestLevelSpeciality;

  constructor(@Inject(TEST_SERVICE_TOKEN) public service: ITestService) {
  }


  ngOnInit(): void {

  }

  get test(): Test {
    return this.testLevelSpeciality.test;
  }
}
