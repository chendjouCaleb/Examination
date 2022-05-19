import {Component, ElementRef, Inject, Input, ViewChild} from "@angular/core";
import {Department} from "examination/entities";
import {IDepartmentService, DEPARTMENT_SERVICE_TOKEN} from "@examination/components";

@Component({
  templateUrl: 'department-settings-image.html',
  selector: 'department-settings-image'
})
export class DepartmentSettingsImage {
  @Input()
  department: Department;

  @ViewChild('imageElement')
  _imageElement: ElementRef<HTMLImageElement>;

  constructor(@Inject(DEPARTMENT_SERVICE_TOKEN) private _service: IDepartmentService) {
  }

  async changeImage() {
    const changed = await this._service.changeImage(this.department);

    if(changed) {
      this._imageElement.nativeElement.src = this.department.imageUrl + '?' + Date.now();
    }
  }
}
