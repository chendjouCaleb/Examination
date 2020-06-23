import {Component, OnInit} from '@angular/core';
import {CurrentItems} from 'src/app/current-items';
import {Group} from "examination/models";

@Component({
  templateUrl: 'group-students.page.html',
  selector: 'group-student-list'
})
export class GroupStudentsPage {

  group: Group;

  constructor(private currentItems: CurrentItems ) {
    this.group = currentItems.get('group');
  }

}
