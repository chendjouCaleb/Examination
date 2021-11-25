import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import {Semester} from "examination/entities";

@Component({
  templateUrl: 'SemesterItem.html',
  selector: 'SemesterItem, a[SemesterItem]',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'year-item'
  }
})
export class SemesterItem implements AfterViewInit {
  @Input()
  semester: Semester;

  @ViewChild('layout')
  layout: ElementRef<HTMLElement>;

  size: number = 0;

  constructor(public changeDetector: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this.size = this.layout.nativeElement.getBoundingClientRect().height;
      this.changeDetector.markForCheck();
    })
  }

}
