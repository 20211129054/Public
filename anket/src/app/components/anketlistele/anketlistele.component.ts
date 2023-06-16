import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';
import { Sonuc } from 'src/app/models/Sonuc';
import { Anket } from 'src/app/models/Anket';
import { MatTableDataSource } from '@angular/material/table';
import { Uye } from 'src/app/models/Uye';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { AnketDialogComponent } from '../dialogs/anket-dialog/anket-dialog.component';

@Component({
  selector: 'app-anketlistele',
  templateUrl: './anketlistele.component.html',
  styleUrls: ['./anketlistele.component.css']
})
export class AnketlisteleComponent implements OnInit {
  secUye: Uye;
  uyeId: string;
  anketId: string = "";
  anketler: Anket[];
  dataSource: any;
  displayedColumns = ['anketAdi', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  dialogRef: MatDialogRef<AnketDialogComponent>;

  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public alert: AlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.params.subscribe((p: any) => {
      if (p) {
        this.uyeId = p.uyeId;
        this.UyeGetir();
        this.AnketGetir(this.uyeId);
      }
    });
  }
  AnketGetir(uyeId:string) {
    this.apiServis.AnketListeleByUyeId(uyeId).subscribe(d => {
      this.anketler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  UyeGetir() {
    this.apiServis.UyeById(this.uyeId).subscribe(d => {
      this.secUye = d;
    });
  }

  AnketSec(d: string) {
    this.anketId = d;
  }
  Kaydet() {
    if (this.anketId == "") {
      var s: Sonuc = new Sonuc();
      s.islem = false;
      s.mesaj = "Anket Seçiniz!";
      this.alert.AlertUygula(s);
    } else {

    }

  }
  AnketDuzenle(anket: Anket) {
    this.dialogRef = this.matDialog.open(AnketDialogComponent, {
      width: "400px",
      data: {
        islem: 'duzenle',
        anket: anket
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {

        anket.anketAdi = d.anketAdi;
        this.apiServis.AnketDuzenle(anket).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.AnketGetir(this.uyeId);
          }
        });
      }
    });

  }

  AnketSil(anket: Anket) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: "400px",
      height: "250px",
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = anket.anketAdi + " Anket Kaydı Silinecektir Onaylıyor musunuz?";
    { } this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.AnketSil(anket.anketId).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.AnketGetir(this.uyeId);
          }
        });
      }
    });
  }
  
}
