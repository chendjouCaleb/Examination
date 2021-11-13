import {Component, Inject, Input, OnInit} from '@angular/core';
import {Room} from 'examination/entities';
import {
  MS_DIALOG_DATA,
  MsCollectionSideArrayDescriptor,
  MsCollectionSlideDescription,
  MsDialogRef
} from '@ms-fluent/components';
import {Observable, Subject} from 'rxjs';

@Component({
  templateUrl: 'room-slide.html',
  selector: 'course-slide'
})
export class RoomSlide implements OnInit {
  @Input()
  rooms: Room[];

  @Input()
  index: number = 0;

  description: MsCollectionSlideDescription<Room>;

  constructor(private dialog: MsDialogRef<RoomSlide>,
              @Inject(MS_DIALOG_DATA) data) {
    const rooms = data.rooms;
    this.index = data.index;
    this.description = new MsCollectionSideArrayDescriptor<Room>(rooms);
  }

  ngOnInit(): void {

  }
}
