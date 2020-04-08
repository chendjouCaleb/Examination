import {NgModule} from '@angular/core';
import {MsfButtonModule} from 'fabric-docs';
import {CommonModule} from '@angular/common';
import {MsToast} from './toast';
import {MsToastClose, MsToastExpand} from './toast-directives';
import {MsDefaultToast} from './default-toast';
import {MomentModule} from 'ngx-moment';

@NgModule({
  imports: [MsfButtonModule, CommonModule, MomentModule],
  declarations: [ MsToastExpand, MsToastClose, MsDefaultToast ],
  exports: [ MsToastExpand, MsToastClose, MsDefaultToast ],
  providers: [ MsToast ]
})
export class MsToastModule {

}
