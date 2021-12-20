import {AfterViewInit, Component, Input, ViewChild} from "@angular/core";
import {YearStudent} from "@examination/models/entities";
import {MsPaginator, MsPaginatorItemsFn} from "@ms-fluent/components";
import {AlertEmitter} from "src/controls";
import {YearStudentHttpClient} from "@examination/http";
import {YearStudentLoader} from "examination/loaders";

@Component({
  templateUrl: 'YearStudentList.html',
  selector: 'YearStudentList'
})
export class YearStudentList implements AfterViewInit {
  @Input()
  params: any;

  @Input()
  hiddenColumns: string[] = [];

  itemsFn: MsPaginatorItemsFn<YearStudent> =
    (page: number, size: number) => Promise.resolve(this.items.slice(page * size, page * size + size));

  @ViewChild('msPaginator')
  paginator: MsPaginator<YearStudent>;

  items: YearStudent[];

  constructor(private alertEmitter: AlertEmitter,
              private httpClient: YearStudentHttpClient,
              private loader: YearStudentLoader) {}

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
