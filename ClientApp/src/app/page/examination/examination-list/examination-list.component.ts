import { Component, OnInit } from '@angular/core';
import {CurrentItems} from "examination/app/current-items";
import {Organisation} from "examination/models";

@Component({
  selector: 'app-examination-list',
  templateUrl: './examination-list.component.html',
  styleUrls: ['./examination-list.component.scss']
})
export class ExaminationListComponent implements OnInit {

  organisation: Organisation;

  constructor(private currentItems: CurrentItems) { }

  ngOnInit(): void {
    this.organisation = this.currentItems.get("organisation");
    console.log(this.organisation);
  }

}
