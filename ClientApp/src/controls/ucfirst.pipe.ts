import {Pipe} from "@angular/core";

@Pipe({
  name: 'ucFirst'
})
export class UcFirstPipe {
  transform(value: string): string {
    if(!value || value.length === 0){
      return '';
    }

    return value[0].toUpperCase() + value.substring(1);
  }
}
