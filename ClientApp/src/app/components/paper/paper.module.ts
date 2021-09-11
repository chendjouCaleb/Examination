import {PaperSupervisorComment} from './supervisor-comment/paper-supervisor-comment';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppFormModule, ControlModule} from 'examination/controls';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaperReport} from './report/paper-report';
import {PaperEditDate} from './date/paper-edit-date';

import {PaperScores} from './scores/paper-scores';
import {PaperService} from './paper.service';
import {PAPER_SERVICE_TOKEN} from './paper.service.interface';
import {PaperDetails} from './details/paper-details';
import {PaperList} from './list/paper-list';
import {MomentModule} from 'ngx-moment';
import {PaperScore} from './score/paper-score';
import {PaperScoreList} from './score-list/score-list';
import {
  MsButtonModule,
  MsContextMenuModule,
  MsDialogModule, MsDropdownModule,
  MsPersonaModule,
  MsSpinnerModule,
  MsTableModule
} from '@ms-fluent/components';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [PaperDetails, PaperEditDate, PaperSupervisorComment, PaperReport, PaperScores, PaperScore,
    PaperList, PaperScoreList],
  exports: [PaperDetails, PaperEditDate, PaperSupervisorComment, PaperReport, PaperScores, PaperScore,
    PaperList, PaperScoreList],
  imports: [CommonModule, AppFormModule, FormsModule, ReactiveFormsModule, MsSpinnerModule, MsDropdownModule,
    ControlModule, MsButtonModule, MsPersonaModule, MsDialogModule, MsTableModule, MomentModule, MsContextMenuModule, RouterModule],
  providers: [PaperService, {provide: PAPER_SERVICE_TOKEN, useExisting: PaperService}]
})
export class PaperModule {

}
