import {Component, Input, OnInit} from '@angular/core';
import {Speciality} from 'examination/models';
import {BreadcrumbItem} from 'examination/infrastructure';
import {CurrentItems} from 'examination/app/current-items';
import {Title} from '@angular/platform-browser';

@Component({
  templateUrl: 'speciality-layout.component.html',
  selector: 'app-speciality-layout'
})
export class SpecialityLayoutComponent implements OnInit {
  @Input()
  speciality: Speciality;

  @Input()
  title: string;

  paths: BreadcrumbItem[] = [];

  constructor(currentItems: CurrentItems, private _title: Title) {
    this.speciality = currentItems.get('speciality');
  }

  ngOnInit(): void {
    this.paths = [
      {name: 'Spécialités', url: `${this.speciality.examination.url}/specialities`},
      {name: this.speciality.name, url: `${this.speciality.url}/home`}
    ];
  }
}
