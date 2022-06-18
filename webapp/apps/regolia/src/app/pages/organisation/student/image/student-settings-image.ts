import {Component, ElementRef, Inject, Input, ViewChild} from "@angular/core";
import {Student} from "examination/entities";
import {IStudentService, STUDENT_SERVICE_TOKEN} from "@examination/components";
import {AlertEmitter, ImageForm, ImageFormDialog} from "src/controls";
import {StudentHttpClient} from "@examination/http";

@Component({
  templateUrl: 'student-settings-image.html',
  selector: 'student-settings-image'
})
export class StudentSettingsImage {
  @Input()
  student: Student;

  @ViewChild('imageElement')
  _imageElement: ElementRef<HTMLImageElement>;

  constructor(@Inject(STUDENT_SERVICE_TOKEN) private _service: IStudentService,
              private _httpClient: StudentHttpClient,
              private _alert: AlertEmitter,
              private imageForm: ImageFormDialog) {
  }

  async changeImage() {
    this.imageForm.open().subscribe(async value => {
      if (value.blob) {
        await this._httpClient.changeImage(this.student, value.blob);
        this.student.imageUrl = value.url;

        this._alert.info('Photo mise à jour.');
      }
    })
  }
}
