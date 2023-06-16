import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'back-button',
  template: `<button (click)="goBack()" mat-fab matTooltip="Geri" color="primary" aria-label="Geri"><mat-icon aria-label="label">
  arrow_back_ios</mat-icon></button>`,
})
export class BackButtonComponent {


  constructor(private location: Location) { }

  goBack() {
    this.location.back();
  }
}
