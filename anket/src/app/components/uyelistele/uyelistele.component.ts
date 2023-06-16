import { UyesecDialogComponent } from './../dialogs/uyesec-dialog/uyesec-dialog.component';
import { Uye } from '../../models/Uye';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Anket } from '../../models/Anket';
import { AlertService } from '../../services/alert.service';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { Sonuc } from 'src/app/models/Sonuc';
import { UyeDialogComponent } from '../dialogs/uye-dialog/uye-dialog.component';

@Component({
  selector: 'app-uyelistele',
  templateUrl: './uyelistele.component.html',
  styleUrls: ['./uyelistele.component.css']
})
export class UyelisteleComponent implements OnInit {
  secAnket: Anket;
  anketId: string;
  uyeId: string = "";
  uyeler: Uye[];
  dataSource: any;
  displayedColumns = ['uyeAdsoyad', 'uyeDogTarih', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  uyeDialogRef: MatDialogRef<UyeDialogComponent>;
  constructor(
    public route: ActivatedRoute,
    public apiServis: ApiService,
    public alert: AlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {

    this.route.params.subscribe((p: any) => {
      if (p) {
        this.anketId = p.anketId;
        this.UyeListele();
      }
    });
  }

  UyeListele() {
    this.apiServis.UyeListe().subscribe(d => {
      this.uyeler = d;
      this.dataSource = new MatTableDataSource(this.uyeler);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  UyeSil(uye: Uye) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: "400px"
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = uye.uyeAdsoyad + "Adlı Kişinin Kaydı Silinecektir Onaylıyor musunuz?";
    { } this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.UyeSil(uye.uyeId).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyeListele();
          }
        });
      }
    });
  }

  Ekle() {
    this.uyeDialogRef = this.matDialog.open(UyeDialogComponent, {
      width: "500px;"
    });

    this.uyeDialogRef.afterClosed().subscribe(d => {
      if (d) {
        var uye = new Uye();
        uye.uyeAdsoyad=d.uyeAdsoyad;
        uye.uyeDogTarih=d.uyeDogTarih;
        uye.uyeMail=d.uyeMail;
        uye.uyeRol=d.uyeRol;
        uye.uyeSifre=d.uyeSifre;
        this.apiServis.UyeEkle(uye).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyeListele();
          }
        });

      }
    });
  }

  UyeDuzenle(uye: Uye) {
    this.uyeDialogRef = this.matDialog.open(UyeDialogComponent, {
      width: "400px",
      height: "250px",
      data: {
        islem: 'duzenle',
        uye: uye,
      }
    });
    this.uyeDialogRef.afterClosed().subscribe(d => {
      if (d) {

        uye.uyeId = d.uyeId;
        uye.uyeAdsoyad = d.uyeAdsoyad;
        uye.uyeDogTarih = d.uyeDogTarih;

        this.apiServis.UyeDuzenle(uye).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyeListele();
          }
        });
      }
    });

  }
}

