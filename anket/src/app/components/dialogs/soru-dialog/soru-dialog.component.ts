import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Soru } from 'src/app/models/Soru';
import { AnketDialogComponent } from '../anket-dialog/anket-dialog.component';

@Component({
  selector: 'app-soru-dialog',
  templateUrl: './soru-dialog.component.html',
  styleUrls: ['./soru-dialog.component.css']
})
export class SoruDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniSoru: Soru;
  islem: string;
  frm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AnketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuilder: FormBuilder
  ) {
    this.islem = data.islem;
    this.yeniSoru = data.soru;
    if (this.islem == 'ekle') {
      this.dialogBaslik = "Yeni Soru Ekle";
    }
    else {
      this.dialogBaslik = "Soru Düzenle";
    }
    this.frm = this.FormOlustur();
  }
  ngOnInit() {
  }

  FormOlustur(): FormGroup {
    return this.frmBuilder.group({
      "soru": [this.yeniSoru.soru],
    });
  }
}
