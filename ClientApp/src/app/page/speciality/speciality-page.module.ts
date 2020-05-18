import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpecialityListPage} from './list/speciality-list.page';
import {RouterModule, Routes} from '@angular/router';
import {MsfButtonModule, MsfIconModule, MsfMenuModule, MsfModalModule, MsfPersonaModule, MsfTableModule} from 'fabric-docs';
import {SpecialityHomePage} from './home/speciality-home.page';
import {MomentModule} from 'ngx-moment';
import {SpecialityModule, SpecialityResolver} from 'src/app/speciality';
import {ControlModule} from 'examination/controls';
import {ExaminationModule} from 'examination/app/examination';
import {MatRippleModule} from '@angular/material/core';

const routes: Routes = [
  {path: '', component: SpecialityListPage},
  {path: ':specialityId/home', component: SpecialityHomePage, resolve: [SpecialityResolver]}
];

@NgModule({
  imports: [CommonModule, ControlModule, SpecialityModule, ExaminationModule, MsfPersonaModule,
    MsfButtonModule, MomentModule, MatRippleModule, MsfTableModule,
    MsfIconModule, MsfMenuModule, MsfModalModule,
    RouterModule.forChild(routes)],
  declarations: [SpecialityListPage, SpecialityHomePage],
  providers: [SpecialityResolver]
})
export class SpecialityPageModule {

}
