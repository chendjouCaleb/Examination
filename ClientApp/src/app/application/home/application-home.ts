﻿
import {Component, Input} from '@angular/core';
import {Application} from "examination/models";

@Component({
  templateUrl: 'application-home.html',
  selector: 'app-application'
})
export class ApplicationHome {
  @Input()
  application: Application;
}
