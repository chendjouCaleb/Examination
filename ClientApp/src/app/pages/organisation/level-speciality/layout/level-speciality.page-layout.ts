﻿import {Component, Inject, OnInit} from '@angular/core';
import {LevelSpeciality} from 'examination/entities';
import {ISpecialityService, SPECIALITY_SERVICE_TOKEN} from 'examination/app/components';
import {ActivatedRoute, Router} from '@angular/router';
import {LevelSpecialityLoader} from 'examination/loaders';

@Component({
  templateUrl: 'level-speciality.page-layout.html',
  selector: 'app-speciality-page-layout'
})
export class LevelSpecialityPageLayout implements OnInit {
  levelSpeciality: LevelSpeciality;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _levelSpecialityLoader: LevelSpecialityLoader,
              @Inject(SPECIALITY_SERVICE_TOKEN) public service: ISpecialityService) {

  }

  async ngOnInit() {
    const id = +this._route.snapshot.paramMap.get('levelSpecialityId');
    this.levelSpeciality = await this._levelSpecialityLoader.loadById(id);
  }

  delete() {
    this.service.removeLevelSpeciality(this.levelSpeciality).then(result => {
      if (result) {
        this._router.navigateByUrl(this.levelSpeciality.level.url);
      }
    })
  }
}
