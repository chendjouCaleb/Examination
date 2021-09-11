import {Component, Input, OnInit, Optional} from '@angular/core';
import {CourseHttpClient} from 'examination/models/http';
import {AlertEmitter} from 'examination/controls';
import {Course} from 'examination/entities';
import {MsDialogRef} from '@ms-fluent/components';

@Component({
  templateUrl: 'course-chapterText.html',
  selector: 'app-course-chapterText'
})
export class CourseChapterText implements OnInit {
  @Input()
  course: Course;

  chapterText: string;

  constructor(private _httpClient: CourseHttpClient,
              private _alertEmitter: AlertEmitter,
              @Optional() private _modal: MsDialogRef<CourseChapterText>) {
  }

  async ngOnInit() {
    this.chapterText = this.course.chapterText;
  }


  async edit() {
    await this._httpClient.chapterText(this.course, this.chapterText);

    this.course.chapterText = this.chapterText;
    this._alertEmitter.info(`Les chapitres été modifiés!`);

    if (this._modal) {
      this._modal.close();
    }
  }

  cancel() {
    if (this._modal) {
      this._modal.close();
    }
  }
}
