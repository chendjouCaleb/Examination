import {Directive, ElementRef, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';

@Directive({
  selector: '[appStateBadge]'
})
export class StateBadgeDirective implements OnInit, OnChanges {
  @Input()
  appStateBadge;
  stateClassName = '';
  labels: { [index: string]: any } = {};

  constructor(private element: ElementRef) {

    this.labels['0'] = new State('badge-warning', 'En attente');
    this.labels['-1'] = new State('badge-danger', 'Rejeté(e)');
    this.labels['1'] = new State('badge-success', 'Accepté(e)');
    this.labels['ACCEPTED'] = new State('badge-success', 'Accepté(e)');
    this.labels['REJECTED'] = new State('badge-danger', 'Rejeté(e)');
    this.labels['WAITING'] = new State('badge-warning', 'En attente');
    this.labels['PROGRESS'] = new State('badge-primary', 'En cours');
    this.labels['PENDING'] = new State('badge-warning', 'En attente');
    this.labels['FINISHED'] = new State('badge-danger', 'Terminé');
  }

  ngOnInit() {
    this.update();
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    const change = changes['appStateBadge'];
    this.appStateBadge = change.currentValue;
    this.update();
  }

  update() {
    if (!this.labels.hasOwnProperty(this.appStateBadge)) {
      throw new Error('Nothing label with name ' + this.appStateBadge);
    }
    if (this.stateClassName.length > 0) {
      this.element.nativeElement.classList.remove(this.stateClassName);
    }
    const label: State = this.labels[this.appStateBadge];
    this.element.nativeElement.classList.add('badge');
    this.element.nativeElement.classList.add('text-uppercase');
    this.element.nativeElement.classList.add(label.className);
    this.element.nativeElement.innerText = label.text;
    this.stateClassName = label.className;

  }
}

class State {
  constructor(public className: string, public text: string) {
  }
}


