import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {CanDisable, CanDisableCtor} from '@angular/material/core';
import {mixinDisabled} from '@angular/material/core';


class MsfSelectOptionGroupBase {
}

const _MsfSelectOptionGroupMixinBase: CanDisableCtor & MsfSelectOptionGroupBase = mixinDisabled(MsfSelectOptionGroupBase);

let _uniqueId = 0;

@Component({
  selector: 'MsfSelectOptionGroup',

  template: `
      <label class="msf-select-optionGroup-label" [id]="_labelId">{{ label }}
          <ng-content></ng-content>
      </label>
      <ng-content select="MsfSelectOption, ng-container"></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  inputs: ['disabled'],
  host: {
    'class': 'msf-select-optionGroup',
    'role': 'group',
    '[class.msf-disabled]': 'disabled',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.aria-labelledby]': '_labelId',
  }

})
export class MsfSelectOptionGroup extends _MsfSelectOptionGroupMixinBase implements CanDisable {
  /** Unique id for the underlying label. */
  _labelId: string = `msf-select-optionGroup-label-${_uniqueId++}`;

  /** Label for the option group. */
  @Input() label: string;

}
