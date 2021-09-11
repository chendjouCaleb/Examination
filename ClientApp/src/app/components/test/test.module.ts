import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppFormModule, ControlModule, UserPickerModule} from 'examination/controls';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TestAdd} from './add/test-add';
import {TestEditDate} from './date/test-edit-date';
import {LayoutModule} from 'examination/infrastructure';
import {TestEdit} from './edit/test-edit';
import {TestResolver} from './test.resolver';
import {TestService} from './test.service';
import {TEST_SERVICE_TOKEN} from './test.service.interface';
import {TestList} from './list/test-list';
import {TestItem} from './item/test-item';
import {RouterModule} from '@angular/router';
import {MomentModule} from 'ngx-moment';
import {TestScoreList} from './score-list/test-score-list';
import {TestScoreAdd} from './score-add/test-score-add';
import {TestDetails} from './test-details/test-details';
import {CourseModule} from 'examination/app/components/course';
import {TestLevelSpecialityDetails} from './test-level-speciality-details/test-level-speciality-details';
import {TestLevelSpecialityItem} from './test-level-speciality-item/test-level-speciality-item';
import {TestLevelSpecialityList} from './test-level-speciality-list/test-level-speciality-list';
import {TestLevelSpecialityResolver} from './test-level-speciality.resolver';
import {TestGroupModule} from 'examination/app/components/test-group';
import {PaperModule} from 'examination/app/components/paper';
import {TestGroups} from './test-groups/test-groups';
import {PublishScore} from './publish/publish-score';
import {
  MsButtonModule,
  MsCheckboxModule,
  MsContextMenuModule,
  MsDialogModule,
  MsDropdownModule,
  MsLabelModule, MsPersonaModule, MsSelectModule, MsSpinnerModule, MsTableModule
} from '@ms-fluent/components';

@NgModule({
  imports: [CommonModule, ControlModule, MsDialogModule, MsButtonModule, MsDropdownModule, MsContextMenuModule, MsTableModule,
    FormsModule, RouterModule, CourseModule, MomentModule, ReactiveFormsModule, MsPersonaModule, MsSpinnerModule,
    AppFormModule, UserPickerModule, MsSelectModule, MsCheckboxModule, MsLabelModule, LayoutModule, TestGroupModule, PaperModule
  ],

  declarations: [TestAdd, TestEditDate, TestEdit, TestList, TestItem, TestScoreList, TestScoreAdd, TestDetails,
    TestLevelSpecialityDetails, TestLevelSpecialityItem, TestLevelSpecialityList, TestGroups, PublishScore
  ],

  exports: [TestAdd, TestEditDate, TestEdit, TestList, TestItem, TestScoreList, TestScoreAdd, TestDetails,
    TestLevelSpecialityDetails, TestLevelSpecialityItem, TestLevelSpecialityList, TestGroups, PublishScore
  ],

  providers: [TestResolver, TestLevelSpecialityResolver, TestService,
    {provide: TEST_SERVICE_TOKEN, useExisting: TestService}
  ]
})
export class TestModule {
}
