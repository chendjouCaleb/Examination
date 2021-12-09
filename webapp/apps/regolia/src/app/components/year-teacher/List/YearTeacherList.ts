import {AfterViewInit, Component, Input, ViewChild} from "@angular/core";
import {YearTeacher} from "@examination/models/entities";
import {MsPaginator, MsPaginatorItemsFn} from "@ms-fluent/components";
import {AlertEmitter} from "src/controls";
import {YearTeacherLoader} from "examination/loaders";

@Component({
  templateUrl: 'YearTeacherList.html',
  selector: 'YearTeacherList'
})
export class YearTeacherList implements AfterViewInit {
  @Input()
  items: YearTeacher[];

  @Input()
  hiddenColumns: string[] = [];

  itemsFn: MsPaginatorItemsFn<YearTeacher> =
    (page: number, size: number) => Promise.resolve(this.items.slice(page * size, page * size + size));

  @ViewChild('msPaginator')
  paginator: MsPaginator<YearTeacher>;

  constructor(private alertEmitter: AlertEmitter, private loader: YearTeacherLoader) {}

  ngAfterViewInit(): void {
    if(this.items) {
      this.loadItems(...this.items);
    }
  }

  addItems(...items) {
    const newItems = items.filter(item => !this.items.find(e => item.id === e.id));
    this.items.unshift(...newItems);
    this.loadItems(...items);
    newItems.forEach(item => item.isNew = true);
    this.paginator.reset(0);
    this.alertEmitter.info(`${newItems.length} enseignants ont été ajoutés.`);

    setTimeout(() => {
      newItems.forEach(item => item.isNew = false);
    }, 20000)
  }

  refresh(items: YearTeacher[]) {
    this.items = items;
    this.paginator.reset(0);
    this.alertEmitter.info('Liste actualisée.')
  }

  async loadItems(...items: YearTeacher[]) {
    for (let item of items) {
      await this.loader.load(item);
    }
  }
}
