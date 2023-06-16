import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Secenek } from 'src/app/models/Secenek';
import { SoruDialogComponent } from '../soru-dialog/soru-dialog.component';

@Component({
  selector: 'app-secenek-dialog',
  templateUrl: './secenek-dialog.component.html',
  styleUrls: ['./secenek-dialog.component.css']
})
export class SecenekDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniSecenek: Secenek;
  islem: string;
  frm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SoruDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuilder: FormBuilder
  ) {
    this.islem = data.islem;
    this.yeniSecenek = data.secenek;
    if (this.islem == 'ekle') {
      this.dialogBaslik = "Yeni Secenek Ekle";
    }
    else {
      this.dialogBaslik = "Secenek Düzenle";
    }
    this.frm = this.FormOlustur();
  }
  ngOnInit() {
  }

  FormOlustur(): FormGroup {
    return this.frmBuilder.group({
      "secenek": [this.yeniSecenek.secenek],
    });
  }
}
