import { Uye } from 'src/app/models/Uye';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-uye-dialog',
  templateUrl: './uye-dialog.component.html',
  styleUrls: ['./uye-dialog.component.css']
})
export class UyeDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniUye: Uye;
  islem: string;
  frm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UyeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuilder: FormBuilder
  ) {
    this.islem = data.islem;
    this.yeniUye = data.uye;
    if (this.islem == 'ekle') {
      this.dialogBaslik = "Yeni Üye Ekle";
    }
    else {
      this.dialogBaslik = "Üye Düzenle";
    }
    this.frm = this.FormOlustur();
  }
  ngOnInit() {
  }

  FormOlustur(): FormGroup {
    return this.frmBuilder.group({
      "uyeAdsoyad": [this.yeniUye.uyeAdsoyad],
      "uyeDogTarih": [this.yeniUye.uyeDogTarih],
      "uyeMail": [this.yeniUye.uyeMail],
      "uyeSifre": [this.yeniUye.uyeSifre],
      "uyeId": [this.yeniUye.uyeId],
      "uyeRol": [this.yeniUye.uyeRol],
    });
  }
}
