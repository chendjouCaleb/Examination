import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from "@angular/core";

@Component({
  templateUrl: 'state-badge.html',
  selector: 'MsStateBadge',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ms-badge',
    '[class.ms-bgColor-sharedGreenCyan10]' : "state === 'waiting'",
    '[class.ms-bgColor-sharedRedOrange10]' : "state === 'progress'",
    '[class.ms-bgColor-sharedBlue10]' : "state === 'ended'",
  }
})
export class MsStateBadge {
  @Input()
  state: 'waiting' | 'progress' | 'ended';
}
