import {Component, Input} from "@angular/core";
import {Paper} from "examination/entities";

@Component({
  selector: 'app-paperItem',
  templateUrl: 'paper-item.component.html'
})
export class PaperItemComponent {
  @Input()
  paper: Paper;
}
