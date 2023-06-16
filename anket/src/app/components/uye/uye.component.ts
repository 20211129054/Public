import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Uye } from 'src/app/models/Uye';
import { Sonuc } from 'src/app/models/Sonuc';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { UyeDialogComponent } from '../dialogs/uye-dialog/uye-dialog.component';

@Component({
  selector: 'app-uye',
  templateUrl: './uye.component.html',
  styleUrls: ['./uye.component.css']
})
export class UyeComponent implements OnInit {
  dataSource: any;
  uyeler: Uye[];
  displayedColumns = ['uyeMail', 'uyeAdsoyad', 'uyeDogTarih', 'uyeRol', 'uyeAnketSayisi', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  dialogRef: MatDialogRef<UyeDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: AlertService
  ) { }

  ngOnInit() {
    this.UyeGetir();
  }

  UyeGetir() {
    this.apiServis.UyeListe().subscribe(d => {
      this.uyeler = d;
      console.log(d);
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  UyeEkle() {
    var yeniUye = new Uye();
    this.dialogRef = this.matDialog.open(UyeDialogComponent, {
      width: "400px",
      height: "550px",
      data: {
        islem: 'ekle',
        uye: yeniUye
      }
    });

    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.UyeEkle(d).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyeGetir();
          }
        });
      }
    });
  }
  UyeDuzenle(uye: Uye) {
    this.dialogRef = this.matDialog.open(UyeDialogComponent, {
      width: "400px",
      height: "550px",
      data: {
        islem: 'duzenle',
        uye: uye
      }
    });

    this.dialogRef.afterClosed().subscribe((d: Uye) => {
      if (d) {
        uye.uyeId = d.uyeId;
        uye.uyeAdsoyad = d.uyeAdsoyad;
        uye.uyeDogTarih = d.uyeDogTarih;
        uye.uyeMail = d.uyeMail;
        uye.uyeSifre = d.uyeSifre;

        this.apiServis.UyeDuzenle(uye).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyeGetir();
          }
        });
      }
    });
  }
  UyeSil(uye: Uye) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: "400px",
      height: "250px",
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = uye.uyeAdsoyad + " isimli Üye Silinecektir Onaylıyor musunuz?";
    { } this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.UyeSil(uye.uyeId).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyeGetir();
          }
        });
      }
    });

  }


  Filterele(e: any) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
