import {Component, Input} from "@angular/core";
import {Course, Department} from "examination/entities";
import {DepartmentHttpClient, ScoreHttpClient} from "@examination/http";
import {AlertEmitter} from "src/controls";
import {MsDialogRef} from "@ms-fluent/components";

@Component({
  templateUrl: 'delete-score-list.html',
  selector: "CourseScoreListDelete"
})
export class CourseScoreListDelete {
  @Input()
  course: Course;

  constructor(private _httpClient: ScoreHttpClient,
              private alertEmitter: AlertEmitter,
              private _modalRef: MsDialogRef<CourseScoreListDelete>) {
  }

  async delete() {
    await this._httpClient.deleteAll(this.course);

    this.course.multipleScore = false;
    this.alertEmitter.info(`Le barème de notation du cours ${this.course.name} a été supprimé!`);
    if (this._modalRef) {
      this._modalRef.close(true);
    }
  }
}
