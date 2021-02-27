import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExaminationLoaderModule} from './examination';
import {IdentityLoaderModule} from './identity';
import {MemberLoaderModule} from './member';
import {OrganisationLoaderModule} from './organisation';
import {TestLoaderModule} from './test';
import {CourseLoaderModule} from './course';

@NgModule({
  imports: [CommonModule, ExaminationLoaderModule, IdentityLoaderModule, MemberLoaderModule, OrganisationLoaderModule,
    TestLoaderModule, CourseLoaderModule]
})
export class LoaderModule {
}
