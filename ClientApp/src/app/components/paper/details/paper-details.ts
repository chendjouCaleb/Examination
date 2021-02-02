import {IPaperService, PAPER_SERVICE_TOKEN} from "../paper.service.interface";
import {Component, Inject, Input, OnInit} from "@angular/core";
import {Paper} from "examination/entities";
import {ScorePaperLoader} from "examination/loaders";

@Component({
  selector: 'app-paperDetails',
  templateUrl: 'paper-details.html'
})
export class PaperDetails implements OnInit {
  @Input()
  paper: Paper;

  constructor(private _loader: ScorePaperLoader,
              @Inject(PAPER_SERVICE_TOKEN) public service: IPaperService) {
  }

  async ngOnInit() {

  }
}
