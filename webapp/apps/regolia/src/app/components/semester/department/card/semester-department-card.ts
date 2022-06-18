import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Department, SemesterDepartment} from 'examination/entities';

@Component({
  templateUrl: 'semester-department-card.html',
  selector: 'app-semester-department-card, [SemesterDepartmentCard], [semester-department-card]',
  host: {
    class: 'ms-link-inherit ms-cardBackgroundColor ms-cardBackgroundColor--hover'
  }
})
export class SemesterDepartmentCard implements AfterViewInit{
  @Input()
  semesterDepartment: SemesterDepartment;

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
