import {Component, OnInit} from '@angular/core';
import {List} from '@positon/collections';
import {School, SchoolLoader, SchoolHttpClient} from 'examination/models';
import {SchoolService} from 'examination/app/components/school';
import {Router} from '@angular/router';
import {AuthorizationManager} from 'examination/app/authorization';
import {Title} from "@angular/platform-browser";

@Component({
  templateUrl: 'school-list.page.html'
})
export class SchoolListPage implements OnInit {
  schools: Array<School>;

  constructor(private _httpClient: SchoolHttpClient,
              private _schoolService: SchoolService,
              private _schoolLoader: SchoolLoader,
              public _auth: AuthorizationManager,
              public title: Title,
              public router: Router) {
    this.title.setTitle('Établissements')
  }

  async ngOnInit(): Promise<void> {
    const schools = await this._httpClient.list();
    await this._schoolLoader.loadAll(schools);

    this.schools = schools.toArray();
  }

  add() {
    this._schoolService.add().then(school => {
      if (school) {
        this.router.navigateByUrl(`/schools/${school.id}`)
      }
    })
  }
}
