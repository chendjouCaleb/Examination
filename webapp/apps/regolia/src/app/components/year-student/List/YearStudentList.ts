import {AfterViewInit, Component, Input, ViewChild} from "@angular/core";
import {YearStudent} from "@examination/models/entities";
import {MsPaginator, MsPaginatorItemsFn} from "@ms-fluent/components";
import {AlertEmitter} from "src/controls";

@Component({
  templateUrl: 'YearStudentList.html',
  selector: 'YearStudentList'
})
export class YearStudentList implements AfterViewInit {
  @Input()
  items: YearStudent[];

  itemsFn: MsPaginatorItemsFn<YearStudent> =
    (page: number, size: number) => Promise.resolve(this.items.slice(page * size, page * size + size));

  @ViewChild('msPaginator')
  paginator: MsPaginator<YearStudent>;

  constructor(private alertEmitter: AlertEmitter) {}

  ngAfterViewInit(): void {

  }

  addItems(...items) {
    const newItems = items.filter(item => !this.items.find(e => item.id === e.id));
    this.items.unshift(...newItems);
    newItems.forEach(item => item.isNew = true);
    this.paginator.reset(0);
    this.alertEmitter.info(`${newItems.length} étudiants ont été ajoutés.`);

    setTimeout(() => {
      newItems.forEach(item => item.isNew = false);
    }, 10000)
  }

  refresh(items: YearStudent[]) {
    this.items = items;
    this.paginator.reset(0);
    this.alertEmitter.info('Liste actualisé.')
  }
}
