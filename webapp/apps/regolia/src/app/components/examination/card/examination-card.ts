import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import {Examination} from "examination/entities";

@Component({
  templateUrl: 'examination-card.html',
  selector: 'examination-card, [examination-card]',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'year-item'
  }
})
export class ExaminationCard implements AfterViewInit {
  @Input()
  examination: Examination;

  @ViewChild('layout')
  layout: ElementRef<HTMLElement>;

  constructor(public changeDetector: ChangeDetectorRef) {}

  ngAfterViewInit(): void {

  }

}
