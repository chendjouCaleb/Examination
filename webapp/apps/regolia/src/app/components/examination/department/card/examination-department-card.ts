import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Department, ExaminationDepartment} from 'examination/entities';

@Component({
  templateUrl: 'examination-department-card.html',
  selector: 'examination-department-card, [ExaminationDepartmentCard]',

})
export class ExaminationDepartmentCard implements AfterViewInit{
  @Input()
  examinationDepartment: ExaminationDepartment;

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
