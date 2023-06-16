import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Anket } from 'src/app/models/Anket';
import { UyeDialogComponent } from '../uye-dialog/uye-dialog.component';

@Component({
  selector: 'app-anket-dialog',
  templateUrl: './anket-dialog.component.html',
  styleUrls: ['./anket-dialog.component.css']
})
export class AnketDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Anket;
  islem: string;
  frm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UyeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuilder: FormBuilder
  ) {
    this.islem = data.islem;
    this.yeniKayit = data.anket;
    if (this.islem == 'ekle') {
      this.dialogBaslik = "Yeni Anket Ekle";
    }
    else {
      this.dialogBaslik = "Anket Düzenle";
    }
    this.frm = this.FormOlustur();
  }
  ngOnInit() {
  }

  FormOlustur(): FormGroup {
    return this.frmBuilder.group({
      "anketId": [this.yeniKayit.anketId],
      "anketAdi": [this.yeniKayit.anketAdi],
      "anketUyeId": [this.yeniKayit.anketUyeId],
      "anketAciklama": [this.yeniKayit.anketAciklama],

    });

  }
}
