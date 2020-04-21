import {Input, Component } from '@angular/core';
import {EvFormControl} from './forms';
import {AbstractControl} from '@angular/forms';

@Component({
    selector: 'app-control-error',
    templateUrl: 'control.error.component.html'
})
export class ControlErrorComponent {
    @Input()
    control: AbstractControl;
}
