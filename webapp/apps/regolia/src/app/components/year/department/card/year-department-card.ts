import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Department, YearDepartment} from 'examination/entities';

@Component({
  templateUrl: 'year-department-card.html',
  selector: 'app-year-department-card, [YearDepartmentCard]',

})
export class YearDepartmentCard implements AfterViewInit{
  @Input()
  yearDepartment: YearDepartment;

  @ViewChild('name')
  nameRef: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    const nameHost = this.nameRef.nativeElement;
    const width =nameHost.getBoundingClientRect().width;

    nameHost.style.width = width + 'px';
    nameHost.style.whiteSpace = 'nowrap';
    nameHost.style.textOverflow = 'ellipsis';
    nameHost.style.overflow = 'hidden';
  }
}
