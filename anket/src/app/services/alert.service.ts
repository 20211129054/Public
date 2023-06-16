import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertDialogComponent } from '../components/dialogs/alert-dialog/alert-dialog.component';
import { Sonuc } from '../models/Sonuc';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertDialuyeef: MatDialogRef<AlertDialogComponent>;
  constructor(
    private matDialog: MatDialog
  ) { }

  AlertUygula(s: Sonuc) {
    var baslik = "";
    if (s.islem) {
      baslik = "Tamam";
    } else {
      baslik = "Hata";
    }
    this.alertDialuyeef = this.matDialog.open(AlertDialogComponent, {
      width: "300px",
      height: "200px",
    });

    this.alertDialuyeef.componentInstance.dialogBaslik = baslik;
    this.alertDialuyeef.componentInstance.dialogMesaj = s.mesaj;
    this.alertDialuyeef.componentInstance.dialogIslem = s.islem;
    this.alertDialuyeef.afterClosed().subscribe(d => {
      this.alertDialuyeef = null;
    });

  }
}
