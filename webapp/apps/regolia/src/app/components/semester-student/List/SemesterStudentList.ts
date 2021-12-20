import {AfterViewInit, Component, Input, ViewChild} from "@angular/core";
import {SemesterStudent} from "@examination/models/entities";
import {MsPaginator, MsPaginatorItemsFn} from "@ms-fluent/components";
import {AlertEmitter} from "src/controls";
import {SemesterStudentHttpClient} from "@examination/http";
import {SemesterStudentLoader} from "../../../../models/loader/semester/semester-student.loader";

@Component({
  templateUrl: 'SemesterStudentList.html',
  selector: 'SemesterStudentList'
})
export class SemesterStudentList implements AfterViewInit {
  @Input()
  params: any;

  @Input()
  hiddenColumns: string[] = [];

  itemsFn: MsPaginatorItemsFn<SemesterStudent> =
    (page: number, size: number) => Promise.resolve(this.items.slice(page * size, page * size + size));

  @ViewChild('msPaginator')
  paginator: MsPaginator<SemesterStudent>;

  items: SemesterStudent[];

  constructor(private alertEmitter: AlertEmitter,
              private httpClient: SemesterStudentHttpClient,
              private loader: SemesterStudentLoader) {}

  async ngAfterViewInit() {
    const items = (await this.httpClient.list(this.params)).toArray();
    this.items = items;

    this.loadItems(...items);
  }

  addItems(...items) {
    const newItems = items.filter(item => !this.items.find(e => item.id === e.id));
    this.loadItems(...items).then();
    this.items.unshift(...newItems);
    newItems.forEach(item => item.isNew = true);
    this.paginator.reset(0);
    this.alertEmitter.info(`${newItems.length} étudiants ont été ajoutés.`);

    setTimeout(() => {
      newItems.forEach(item => item.isNew = false);
    }, 10000)
  }

  async refresh() {
    const items = (await this.httpClient.list(this.params)).toArray();
    this.items = items;
    this.paginator.reset(0);
    this.alertEmitter.info('Liste actualisé.')
  }

  private async loadItems(...items) {
    for (let item of items) {
      await this.loader.load(item);
    }
  }
}
