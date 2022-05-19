import {Component, ElementRef, Inject, Input, ViewChild} from "@angular/core";
import {School} from "examination/entities";
import {ISchoolService, SCHOOL_SERVICE_TOKEN} from "@examination/components";

@Component({
  templateUrl: 'school-settings-image.html',
  selector: 'school-settings-image'
})
export class SchoolSettingsImage {
  @Input()
  school: School;

  @ViewChild('imageElement')
  _imageElement: ElementRef<HTMLImageElement>;

  constructor(@Inject(SCHOOL_SERVICE_TOKEN) private _service: ISchoolService) {
  }

  async changeImage() {
    const changed = await this._service.changeImage(this.school);

    if(changed) {
      this._imageElement.nativeElement.src = this.school.imageUrl + '?' + Date.now();
    }
  }
}
