import {Component, Input, OnInit} from "@angular/core";
import {Paper} from "examination/entities";
import {ScorePaperLoader} from "examination/loaders";

@Component({
  selector: 'app-paperItem',
  templateUrl: 'paper-item.component.html'
})
export class PaperItemComponent implements OnInit{
  @Input()
  paper: Paper;

  constructor(private _loader: ScorePaperLoader) {}

  async ngOnInit() {
    this.paper.scorePapers = await this._loader.loadByPaper(this.paper);
    console.log(this.paper.scorePapers)
  }
}
