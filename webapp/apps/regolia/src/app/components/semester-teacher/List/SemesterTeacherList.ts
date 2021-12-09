import {AfterViewInit, Component, Input, ViewChild} from "@angular/core";
import {SemesterTeacher} from "@examination/models/entities";
import {MsPaginator, MsPaginatorItemsFn} from "@ms-fluent/components";
import {AlertEmitter} from "src/controls";
import {SemesterTeacherLoader} from "examination/loaders";

@Component({
  templateUrl: 'SemesterTeacherList.html',
  selector: 'SemesterTeacherList'
})
export class SemesterTeacherList implements AfterViewInit {
  @Input()
  items: SemesterTeacher[];

  @Input()
  hiddenColumns: string[] = [];

  itemsFn: MsPaginatorItemsFn<SemesterTeacher> =
    (page: number, size: number) => Promise.resolve(this.items.slice(page * size, page * size + size));

  @ViewChild('msPaginator')
  paginator: MsPaginator<SemesterTeacher>;

  constructor(private alertEmitter: AlertEmitter, private loader: SemesterTeacherLoader) {}

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

  refresh(items: SemesterTeacher[]) {
    this.items = items;
    this.paginator.reset(0);
    this.loadItems(...items);
    this.alertEmitter.info('Liste actualisée.')
  }

  async loadItems(...items: SemesterTeacher[]) {
    for (let item of items) {
      await this.loader.load(item);
    }
  }
}
