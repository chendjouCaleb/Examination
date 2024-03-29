import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MsfSelect} from './select';
import {MsfSelectOption} from './select-option';
import {OverlayModule} from '@angular/cdk/overlay';
import {MsfSelectOptionGroup} from './select-option-group';
import {MsfSelectTemplate} from './select-template';
import {MSF_SELECT_SCROLL_STRATEGY_PROVIDER} from './select-scroll-strategy';
import {MsfSelectOptionCheckbox} from './select-option-checkbox';
import {MsCheckboxModule} from '@ms-fluent/components';

@NgModule({
  imports: [CommonModule, MsCheckboxModule, OverlayModule],
  declarations: [MsfSelect, MsfSelectOption, MsfSelectOptionGroup, MsfSelectTemplate, MsfSelectOptionCheckbox],
  exports: [MsfSelect, MsfSelectOption, MsfSelectOptionGroup, MsfSelectTemplate, MsfSelectOptionCheckbox],
  providers: [MSF_SELECT_SCROLL_STRATEGY_PROVIDER]
})
export class MsfSelectModule {
}
