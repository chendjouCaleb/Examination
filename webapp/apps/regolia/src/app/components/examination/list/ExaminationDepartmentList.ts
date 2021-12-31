import {AfterViewInit, Component, Input} from "@angular/core";
import {ExaminationDepartmentHttpClient} from "@examination/http";
import {ExaminationDepartmentLoader} from "@examination/loaders";
import {ExaminationDepartment} from "@examination/entities";

@Component({
  templateUrl: 'ExaminationDepartmentList.html',
  selector: 'ExaminationDepartmentList'
})
export class ExaminationDepartmentList implements AfterViewInit {
  @Input()
  params: any;

  examinationDepartments: ExaminationDepartment[];

  constructor(private httpClient: ExaminationDepartmentHttpClient,
              private loader: ExaminationDepartmentLoader) {}

  async ngAfterViewInit(): Promise<void> {
    const items = await this.httpClient.list(this.params);
    this.loader.loadAll(items);

    this.examinationDepartments = items.toArray();

  }
}
