import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'back-button',
    template: `<button class="btn btn-success btn-sm ms-2"  (click)="goBack()">Geri</button>`,
})
export class BackButtonComponent {


  constructor(private location: Location) { }

  goBack() {
    this.location.back();
  }
}
