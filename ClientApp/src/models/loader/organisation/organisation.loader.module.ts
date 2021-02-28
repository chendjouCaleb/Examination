import {NgModule} from '@angular/core';
import {OrganisationHttpClientModule} from 'examination/models/http';
import {DepartmentLoader} from './department.loader';
import {LevelSpecialityLoader} from './level-speciality.loader';
import {LevelLoader} from './level.loader';
import {RoomLoader} from './room.loader';
import {SchoolLoader} from './school.loader';
import {ScoreLoader} from './score.loader';
import {SpecialityLoader} from './speciality.loader';

@NgModule({
  imports: [OrganisationHttpClientModule],
  providers: [DepartmentLoader, LevelSpecialityLoader, LevelLoader,
    RoomLoader, SchoolLoader, ScoreLoader, SpecialityLoader]
})
export class OrganisationLoaderModule {

}
