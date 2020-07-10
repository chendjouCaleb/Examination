import {NgModule} from '@angular/core';
import {MsfButtonModule, MsfMenuModule, MsfModalModule, MsfPersonaModule, MsfTableModule} from 'fabric-docs';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ControlModule} from 'examination/controls';
import {PrincipalListPage} from './list/principal-list.page';
import {ExaminationModule} from 'examination/app/examination';


const routes: Routes = [
  {path: '', component: PrincipalListPage}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), MsfModalModule,
    MsfTableModule, ControlModule, MsfMenuModule, ExaminationModule, MsfPersonaModule, MsfButtonModule],
  declarations: [PrincipalListPage]
})
export class PrincipalPageModule {
}
