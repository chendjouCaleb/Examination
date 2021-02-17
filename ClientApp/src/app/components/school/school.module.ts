import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppFormModule, ControlModule, ImageFormModule} from 'examination/controls';
import {MsfButtonModule, MsfMenuModule, MsfModalModule} from 'fabric-docs';
import {SchoolAdd} from './add/school-add';
import {SchoolEdit} from './edit/school-edit';
import {SchoolIdentifier} from './identifier/school-identifier';
import {SchoolService} from './school.service';
import {SCHOOL_SERVICE_TOKEN} from './school.service.interface';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SchoolResolver} from './school.resolver';
import {SchoolCard} from './card/school-card';
import {SchoolBanner} from './banner/school-banner';
import {SchoolImage} from './image/school-image';
import {SchoolCoverImage} from './cover-image/school-cover-image';
import {SchoolDelete} from './delete/school-delete';
import {ApplicationModule} from '../member/application';
import {MsButtonModule} from '@ms-fluent/button';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [CommonModule, ControlModule, MsfModalModule, MsfButtonModule, MsfMenuModule, FormsModule,
    ReactiveFormsModule, AppFormModule, ImageFormModule, ApplicationModule, MsButtonModule, RouterModule],
  declarations: [SchoolAdd, SchoolEdit, SchoolIdentifier, SchoolCard, SchoolBanner, SchoolImage,
    SchoolCoverImage, SchoolDelete],
  exports: [SchoolAdd, SchoolEdit, SchoolIdentifier, SchoolCard, SchoolBanner, SchoolImage,
    SchoolCoverImage, SchoolDelete],
  providers: [SchoolResolver, SchoolService, {provide: SCHOOL_SERVICE_TOKEN, useExisting: SchoolService}]
})
export class SchoolModule {

}
